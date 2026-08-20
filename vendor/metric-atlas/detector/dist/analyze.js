import generate from "@babel/generator";
import { parse } from "@babel/parser";
import traverse from "@babel/traverse";
import * as t from "@babel/types";
import { defaultDetectorAdapters, } from "./adapters.js";
import { shortHash } from "./manifest.js";
const ANALYTICS_IMPORT_PATTERN = /(?:analytics|gtag|google-analytics|react-ga4|third-parties\/google|gtm|mixpanel|posthog|amplitude|facebook)/i;
export function analyzeSource(source, options) {
    let ast;
    try {
        ast = parse(source, {
            sourceType: "unambiguous",
            sourceFilename: options.file,
            plugins: parserPlugins(options.file),
        });
    }
    catch (error) {
        return {
            events: [],
            bindings: [],
            warnings: [
                {
                    code: "PARSE_ERROR",
                    file: options.file,
                    message: error instanceof Error ? error.message : String(error),
                },
            ],
            transform: { code: source, map: null, changed: false },
        };
    }
    const adapters = options.adapters ?? defaultDetectorAdapters;
    const warnings = [];
    const warningKeys = new Set();
    const handlerTargets = new Map();
    const targetCache = new Map();
    let sdkEvidence = false;
    const addWarning = (warning) => {
        const key = [
            warning.code,
            warning.file ?? "",
            warning.line ?? "",
            warning.relatedImplementationKey ?? "",
            warning.message ?? "",
        ].join(":");
        if (!warningKeys.has(key)) {
            warningKeys.add(key);
            warnings.push(warning);
        }
    };
    traverse(ast, {
        ImportDeclaration(path) {
            if (ANALYTICS_IMPORT_PATTERN.test(path.node.source.value)) {
                sdkEvidence = true;
            }
        },
        JSXAttribute(path) {
            if (!isJsxHandlerAttribute(path.node))
                return;
            const expression = path.node.value;
            if (!t.isJSXExpressionContainer(expression))
                return;
            const target = targetForAttribute(path, targetCache);
            if (!target)
                return;
            const handlerNode = resolveHandlerFunction(path, expression.expression);
            if (!handlerNode)
                return;
            const targets = handlerTargets.get(handlerNode) ?? [];
            targets.push(target);
            handlerTargets.set(handlerNode, targets);
        },
    });
    const events = [];
    const targetEvents = new Map();
    traverse(ast, {
        CallExpression(path) {
            const matchingAdapter = adapters.find((adapter) => adapter.matchesSdkReference(path));
            if (!matchingAdapter)
                return;
            sdkEvidence = true;
            const candidate = matchingAdapter.detect(path);
            if (!candidate)
                return;
            const eventName = staticString(candidate.eventNameNode);
            const callLocation = sourceLocation(options.file, path.node);
            if (eventName === null) {
                addWarning({
                    code: "DYNAMIC_EVENT_NAME",
                    file: options.file,
                    line: callLocation.line,
                    message: `${matchingAdapter.name} eventName is not a static string and was not added to events.`,
                });
                return;
            }
            const eventKey = createEventKey(candidate, eventName);
            const implementationKey = `impl_${shortHash([
                eventKey,
                options.file,
                enclosingSymbol(path),
                callLocation.line,
                callLocation.column ?? 1,
            ].join(":"))}`;
            const parameterResult = extractParameters(candidate.parametersNode, candidate.emitter === "gtm" ? new Set(["event"]) : new Set());
            if (parameterResult.dynamic) {
                addWarning({
                    code: "DYNAMIC_PARAMETER_KEY",
                    file: options.file,
                    line: callLocation.line,
                    message: "Only statically named parameter keys are included in the manifest.",
                    relatedImplementationKey: implementationKey,
                });
            }
            const eventIndex = events.push({
                eventKey,
                implementationKey,
                eventName,
                emitter: candidate.emitter,
                analyticsProvider: candidate.analyticsProvider,
                providerDetectionConfidence: candidate.providerDetectionConfidence,
                parameters: parameterResult.parameters,
                source: callLocation,
                overlaySupported: false,
            }) - 1;
            const targets = targetsForCall(path, handlerTargets, targetCache);
            let bound = false;
            for (const target of targets) {
                if (!target.native) {
                    addWarning({
                        code: "CUSTOM_COMPONENT_OVERLAY_UNSUPPORTED",
                        file: options.file,
                        line: locationLine(target.openingPath.node),
                        message: `<${target.elementType}> is not a native JSX element.`,
                        relatedImplementationKey: implementationKey,
                    });
                    continue;
                }
                if (target.portal) {
                    addWarning({
                        code: "PORTAL_OVERLAY_UNSUPPORTED",
                        file: options.file,
                        line: locationLine(target.openingPath.node),
                        message: "Portal targets are outside MVP overlay injection coverage.",
                        relatedImplementationKey: implementationKey,
                    });
                    continue;
                }
                if (target.attributeConflict) {
                    addWarning({
                        code: "ATLAS_ATTRIBUTE_CONFLICT",
                        file: options.file,
                        line: locationLine(target.openingPath.node),
                        message: "Existing data-atlas-id was preserved; Metric Atlas did not bind this element.",
                        relatedImplementationKey: implementationKey,
                    });
                    continue;
                }
                const record = targetEvents.get(target.openingPath.node) ?? {
                    target,
                    eventIndexes: new Set(),
                };
                record.eventIndexes.add(eventIndex);
                targetEvents.set(target.openingPath.node, record);
                events[eventIndex].overlaySupported = true;
                bound = true;
            }
            if (!bound && targets.length === 0) {
                addWarning({
                    code: "UNRESOLVED_EVENT_BINDING",
                    file: options.file,
                    line: callLocation.line,
                    message: "Direct event call was not connected to a supported same-file JSX handler.",
                    relatedImplementationKey: implementationKey,
                });
            }
        },
    });
    if (sdkEvidence && events.length === 0) {
        addWarning({
            code: "POSSIBLE_WRAPPER_USAGE",
            file: options.file,
            message: "Analytics SDK/import detected but supported direct event call count is 0. A wrapper may be in use.",
        });
    }
    const bindings = [];
    for (const { target, eventIndexes } of targetEvents.values()) {
        const line = locationLine(target.openingPath.node);
        const column = locationColumn(target.openingPath.node);
        const atlasDomId = `atlas_${shortHash([options.buildId, options.file, target.elementType, line, column].join(":"))}`;
        target.openingPath.node.attributes.unshift(t.jsxAttribute(t.jsxIdentifier("data-atlas-id"), t.stringLiteral(atlasDomId)));
        const boundEvents = [...eventIndexes].map((index) => events[index]);
        bindings.push({
            atlasDomId,
            eventKeys: unique(boundEvents.map((event) => event.eventKey)),
            implementationKeys: unique(boundEvents.map((event) => event.implementationKey)),
            element: {
                type: target.elementType,
                file: options.file,
                line,
                column,
            },
            bindingConfidence: "binding_exact",
        });
    }
    if (bindings.length === 0) {
        return {
            events,
            bindings,
            warnings,
            transform: { code: source, map: null, changed: false },
        };
    }
    const generated = generate(ast, {
        sourceMaps: true,
        sourceFileName: options.file,
        retainLines: true,
        comments: true,
    }, source);
    return {
        events,
        bindings,
        warnings,
        transform: {
            code: generated.code,
            map: generated.map,
            changed: true,
        },
    };
}
function parserPlugins(file) {
    const plugins = ["jsx"];
    if (/\.[cm]?tsx?$/i.test(file))
        plugins.push("typescript");
    return plugins;
}
function isJsxHandlerAttribute(node) {
    return (t.isJSXIdentifier(node.name) &&
        /^on[A-Z]/.test(node.name.name));
}
function targetForAttribute(path, cache) {
    const parent = path.parentPath;
    if (!parent?.isJSXOpeningElement())
        return null;
    const cached = cache.get(parent.node);
    if (cached)
        return cached;
    const elementType = jsxElementName(parent.node.name);
    const target = {
        openingPath: parent,
        elementType,
        native: /^[a-z]/.test(elementType),
        portal: isInsidePortal(parent),
        attributeConflict: parent.node.attributes.some((attribute) => t.isJSXAttribute(attribute) &&
            t.isJSXIdentifier(attribute.name, { name: "data-atlas-id" })),
    };
    cache.set(parent.node, target);
    return target;
}
function resolveHandlerFunction(path, expression) {
    if (t.isFunctionExpression(expression) || t.isArrowFunctionExpression(expression)) {
        return expression;
    }
    if (!t.isIdentifier(expression))
        return null;
    return functionNodeForBinding(path.scope.getBinding(expression.name));
}
function functionNodeForBinding(binding) {
    if (!binding)
        return null;
    if (binding.path.isFunctionDeclaration() ||
        binding.path.isFunctionExpression() ||
        binding.path.isArrowFunctionExpression()) {
        return binding.path.node;
    }
    if (binding.path.isVariableDeclarator()) {
        const init = binding.path.node.init;
        if (t.isFunctionExpression(init) || t.isArrowFunctionExpression(init))
            return init;
    }
    return null;
}
function targetsForCall(path, handlerTargets, targetCache) {
    const jsxAttribute = path.findParent((parent) => parent.isJSXAttribute());
    if (jsxAttribute?.isJSXAttribute()) {
        const target = targetForAttribute(jsxAttribute, targetCache);
        return target ? [target] : [];
    }
    const functionParent = path.getFunctionParent();
    return functionParent ? (handlerTargets.get(functionParent.node) ?? []) : [];
}
function staticString(node) {
    while (t.isTSAsExpression(node) ||
        t.isTSTypeAssertion(node) ||
        t.isTSNonNullExpression(node) ||
        t.isTSSatisfiesExpression(node) ||
        t.isTypeCastExpression(node) ||
        t.isParenthesizedExpression(node)) {
        node = node.expression;
    }
    if (t.isStringLiteral(node))
        return node.value;
    if (t.isTemplateLiteral(node) && node.expressions.length === 0) {
        return node.quasis[0]?.value.cooked ?? node.quasis[0]?.value.raw ?? "";
    }
    return null;
}
function extractParameters(node, excluded) {
    if (!node)
        return { parameters: [], dynamic: false };
    const parameters = [];
    let dynamic = false;
    for (const property of node.properties) {
        if (t.isSpreadElement(property) || t.isObjectMethod(property) || property.computed) {
            dynamic = true;
            continue;
        }
        if (!t.isObjectProperty(property))
            continue;
        const key = property.key;
        const value = t.isIdentifier(key)
            ? key.name
            : t.isStringLiteral(key) || t.isNumericLiteral(key)
                ? String(key.value)
                : null;
        if (value === null) {
            dynamic = true;
        }
        else if (!excluded.has(value)) {
            parameters.push(value);
        }
    }
    return { parameters: unique(parameters).sort(), dynamic };
}
function createEventKey(candidate, eventName) {
    const namespace = candidate.analyticsProvider === "unknown"
        ? candidate.emitter
        : candidate.analyticsProvider;
    return `${namespace}:${eventName}`;
}
function sourceLocation(file, node) {
    return {
        file,
        line: locationLine(node),
        column: locationColumn(node),
    };
}
function locationLine(node) {
    return node.loc?.start.line ?? 1;
}
function locationColumn(node) {
    return (node.loc?.start.column ?? 0) + 1;
}
function enclosingSymbol(path) {
    const functionPath = path.getFunctionParent();
    if (!functionPath)
        return "module";
    const node = functionPath.node;
    if (t.isFunctionDeclaration(node) || t.isFunctionExpression(node)) {
        if (node.id)
            return node.id.name;
    }
    const parent = functionPath.parentPath;
    if (parent?.isVariableDeclarator() && t.isIdentifier(parent.node.id)) {
        return parent.node.id.name;
    }
    if ((t.isObjectMethod(node) || t.isClassMethod(node)) && t.isIdentifier(node.key)) {
        return node.key.name;
    }
    return `anonymous@${locationLine(node)}`;
}
function jsxElementName(name) {
    if (t.isJSXIdentifier(name))
        return name.name;
    if (t.isJSXMemberExpression(name)) {
        return `${jsxMemberObjectName(name.object)}.${name.property.name}`;
    }
    return `${name.namespace.name}:${name.name.name}`;
}
function jsxMemberObjectName(node) {
    return t.isJSXIdentifier(node)
        ? node.name
        : `${jsxMemberObjectName(node.object)}.${node.property.name}`;
}
function isInsidePortal(path) {
    return Boolean(path.findParent((parent) => {
        if (!parent.isCallExpression())
            return false;
        const callee = parent.node.callee;
        return (t.isIdentifier(callee, { name: "createPortal" }) ||
            (t.isMemberExpression(callee) &&
                !callee.computed &&
                t.isIdentifier(callee.property, { name: "createPortal" })));
    }));
}
function unique(items) {
    return [...new Set(items)];
}
//# sourceMappingURL=analyze.js.map