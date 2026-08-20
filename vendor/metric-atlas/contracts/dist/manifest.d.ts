import { z } from "zod";
/** B produces, A serves, C/D consume. docs/08 §3, docs/20 §4. */
export declare const DetectedEvent: z.ZodObject<{
    eventKey: z.ZodString;
    implementationKey: z.ZodString;
    eventName: z.ZodString;
    emitter: z.ZodEnum<["ga4", "gtm", "mixpanel", "meta", "posthog", "amplitude", "custom", "unknown"]>;
    analyticsProvider: z.ZodEnum<["ga4", "mixpanel", "meta", "posthog", "amplitude", "unknown"]>;
    providerDetectionConfidence: z.ZodEnum<["provider_exact", "provider_configured", "provider_unknown"]>;
    parameters: z.ZodArray<z.ZodString, "many">;
    source: z.ZodObject<{
        file: z.ZodString;
        line: z.ZodNumber;
        column: z.ZodOptional<z.ZodNumber>;
    }, "strip", z.ZodTypeAny, {
        file: string;
        line: number;
        column?: number | undefined;
    }, {
        file: string;
        line: number;
        column?: number | undefined;
    }>;
    overlaySupported: z.ZodBoolean;
}, "strip", z.ZodTypeAny, {
    eventKey: string;
    implementationKey: string;
    eventName: string;
    emitter: "amplitude" | "custom" | "ga4" | "gtm" | "meta" | "mixpanel" | "posthog" | "unknown";
    analyticsProvider: "amplitude" | "ga4" | "meta" | "mixpanel" | "posthog" | "unknown";
    providerDetectionConfidence: "provider_configured" | "provider_exact" | "provider_unknown";
    parameters: string[];
    source: {
        file: string;
        line: number;
        column?: number | undefined;
    };
    overlaySupported: boolean;
}, {
    eventKey: string;
    implementationKey: string;
    eventName: string;
    emitter: "amplitude" | "custom" | "ga4" | "gtm" | "meta" | "mixpanel" | "posthog" | "unknown";
    analyticsProvider: "amplitude" | "ga4" | "meta" | "mixpanel" | "posthog" | "unknown";
    providerDetectionConfidence: "provider_configured" | "provider_exact" | "provider_unknown";
    parameters: string[];
    source: {
        file: string;
        line: number;
        column?: number | undefined;
    };
    overlaySupported: boolean;
}>;
export type DetectedEvent = z.infer<typeof DetectedEvent>;
export declare const ElementBinding: z.ZodObject<{
    atlasDomId: z.ZodString;
    eventKeys: z.ZodArray<z.ZodString, "many">;
    implementationKeys: z.ZodArray<z.ZodString, "many">;
    element: z.ZodObject<{
        type: z.ZodString;
        file: z.ZodString;
        line: z.ZodNumber;
        column: z.ZodOptional<z.ZodNumber>;
    }, "strip", z.ZodTypeAny, {
        type: string;
        file: string;
        line: number;
        column?: number | undefined;
    }, {
        type: string;
        file: string;
        line: number;
        column?: number | undefined;
    }>;
    bindingConfidence: z.ZodEnum<["binding_exact", "binding_inferred", "binding_unresolved"]>;
}, "strip", z.ZodTypeAny, {
    atlasDomId: string;
    eventKeys: string[];
    implementationKeys: string[];
    element: {
        type: string;
        file: string;
        line: number;
        column?: number | undefined;
    };
    bindingConfidence: "binding_exact" | "binding_inferred" | "binding_unresolved";
}, {
    atlasDomId: string;
    eventKeys: string[];
    implementationKeys: string[];
    element: {
        type: string;
        file: string;
        line: number;
        column?: number | undefined;
    };
    bindingConfidence: "binding_exact" | "binding_inferred" | "binding_unresolved";
}>;
export type ElementBinding = z.infer<typeof ElementBinding>;
export declare const ManifestSummaries: z.ZodObject<{
    emitters: z.ZodArray<z.ZodObject<{
        name: z.ZodString;
        eventCount: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        name: string;
        eventCount: number;
    }, {
        name: string;
        eventCount: number;
    }>, "many">;
    analyticsProviders: z.ZodArray<z.ZodObject<{
        name: z.ZodString;
        eventCount: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        name: string;
        eventCount: number;
    }, {
        name: string;
        eventCount: number;
    }>, "many">;
}, "strip", z.ZodTypeAny, {
    emitters: {
        name: string;
        eventCount: number;
    }[];
    analyticsProviders: {
        name: string;
        eventCount: number;
    }[];
}, {
    emitters: {
        name: string;
        eventCount: number;
    }[];
    analyticsProviders: {
        name: string;
        eventCount: number;
    }[];
}>;
export type ManifestSummaries = z.infer<typeof ManifestSummaries>;
export declare const ScanStats: z.ZodObject<{
    filesScanned: z.ZodNumber;
    durationMs: z.ZodNumber;
    eventsDetected: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    filesScanned: number;
    durationMs: number;
    eventsDetected: number;
}, {
    filesScanned: number;
    durationMs: number;
    eventsDetected: number;
}>;
export type ScanStats = z.infer<typeof ScanStats>;
export declare const EventManifest: z.ZodObject<{
    version: z.ZodString;
    buildId: z.ZodString;
    generatedAt: z.ZodString;
    events: z.ZodArray<z.ZodObject<{
        eventKey: z.ZodString;
        implementationKey: z.ZodString;
        eventName: z.ZodString;
        emitter: z.ZodEnum<["ga4", "gtm", "mixpanel", "meta", "posthog", "amplitude", "custom", "unknown"]>;
        analyticsProvider: z.ZodEnum<["ga4", "mixpanel", "meta", "posthog", "amplitude", "unknown"]>;
        providerDetectionConfidence: z.ZodEnum<["provider_exact", "provider_configured", "provider_unknown"]>;
        parameters: z.ZodArray<z.ZodString, "many">;
        source: z.ZodObject<{
            file: z.ZodString;
            line: z.ZodNumber;
            column: z.ZodOptional<z.ZodNumber>;
        }, "strip", z.ZodTypeAny, {
            file: string;
            line: number;
            column?: number | undefined;
        }, {
            file: string;
            line: number;
            column?: number | undefined;
        }>;
        overlaySupported: z.ZodBoolean;
    }, "strip", z.ZodTypeAny, {
        eventKey: string;
        implementationKey: string;
        eventName: string;
        emitter: "amplitude" | "custom" | "ga4" | "gtm" | "meta" | "mixpanel" | "posthog" | "unknown";
        analyticsProvider: "amplitude" | "ga4" | "meta" | "mixpanel" | "posthog" | "unknown";
        providerDetectionConfidence: "provider_configured" | "provider_exact" | "provider_unknown";
        parameters: string[];
        source: {
            file: string;
            line: number;
            column?: number | undefined;
        };
        overlaySupported: boolean;
    }, {
        eventKey: string;
        implementationKey: string;
        eventName: string;
        emitter: "amplitude" | "custom" | "ga4" | "gtm" | "meta" | "mixpanel" | "posthog" | "unknown";
        analyticsProvider: "amplitude" | "ga4" | "meta" | "mixpanel" | "posthog" | "unknown";
        providerDetectionConfidence: "provider_configured" | "provider_exact" | "provider_unknown";
        parameters: string[];
        source: {
            file: string;
            line: number;
            column?: number | undefined;
        };
        overlaySupported: boolean;
    }>, "many">;
    bindings: z.ZodArray<z.ZodObject<{
        atlasDomId: z.ZodString;
        eventKeys: z.ZodArray<z.ZodString, "many">;
        implementationKeys: z.ZodArray<z.ZodString, "many">;
        element: z.ZodObject<{
            type: z.ZodString;
            file: z.ZodString;
            line: z.ZodNumber;
            column: z.ZodOptional<z.ZodNumber>;
        }, "strip", z.ZodTypeAny, {
            type: string;
            file: string;
            line: number;
            column?: number | undefined;
        }, {
            type: string;
            file: string;
            line: number;
            column?: number | undefined;
        }>;
        bindingConfidence: z.ZodEnum<["binding_exact", "binding_inferred", "binding_unresolved"]>;
    }, "strip", z.ZodTypeAny, {
        atlasDomId: string;
        eventKeys: string[];
        implementationKeys: string[];
        element: {
            type: string;
            file: string;
            line: number;
            column?: number | undefined;
        };
        bindingConfidence: "binding_exact" | "binding_inferred" | "binding_unresolved";
    }, {
        atlasDomId: string;
        eventKeys: string[];
        implementationKeys: string[];
        element: {
            type: string;
            file: string;
            line: number;
            column?: number | undefined;
        };
        bindingConfidence: "binding_exact" | "binding_inferred" | "binding_unresolved";
    }>, "many">;
    warnings: z.ZodArray<z.ZodObject<{
        code: z.ZodString;
        file: z.ZodOptional<z.ZodString>;
        line: z.ZodOptional<z.ZodNumber>;
        message: z.ZodOptional<z.ZodString>;
        relatedImplementationKey: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        code: string;
        file?: string | undefined;
        line?: number | undefined;
        message?: string | undefined;
        relatedImplementationKey?: string | undefined;
    }, {
        code: string;
        file?: string | undefined;
        line?: number | undefined;
        message?: string | undefined;
        relatedImplementationKey?: string | undefined;
    }>, "many">;
    summaries: z.ZodOptional<z.ZodObject<{
        emitters: z.ZodArray<z.ZodObject<{
            name: z.ZodString;
            eventCount: z.ZodNumber;
        }, "strip", z.ZodTypeAny, {
            name: string;
            eventCount: number;
        }, {
            name: string;
            eventCount: number;
        }>, "many">;
        analyticsProviders: z.ZodArray<z.ZodObject<{
            name: z.ZodString;
            eventCount: z.ZodNumber;
        }, "strip", z.ZodTypeAny, {
            name: string;
            eventCount: number;
        }, {
            name: string;
            eventCount: number;
        }>, "many">;
    }, "strip", z.ZodTypeAny, {
        emitters: {
            name: string;
            eventCount: number;
        }[];
        analyticsProviders: {
            name: string;
            eventCount: number;
        }[];
    }, {
        emitters: {
            name: string;
            eventCount: number;
        }[];
        analyticsProviders: {
            name: string;
            eventCount: number;
        }[];
    }>>;
    scanStats: z.ZodOptional<z.ZodObject<{
        filesScanned: z.ZodNumber;
        durationMs: z.ZodNumber;
        eventsDetected: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        filesScanned: number;
        durationMs: number;
        eventsDetected: number;
    }, {
        filesScanned: number;
        durationMs: number;
        eventsDetected: number;
    }>>;
}, "strip", z.ZodTypeAny, {
    version: string;
    buildId: string;
    generatedAt: string;
    events: {
        eventKey: string;
        implementationKey: string;
        eventName: string;
        emitter: "amplitude" | "custom" | "ga4" | "gtm" | "meta" | "mixpanel" | "posthog" | "unknown";
        analyticsProvider: "amplitude" | "ga4" | "meta" | "mixpanel" | "posthog" | "unknown";
        providerDetectionConfidence: "provider_configured" | "provider_exact" | "provider_unknown";
        parameters: string[];
        source: {
            file: string;
            line: number;
            column?: number | undefined;
        };
        overlaySupported: boolean;
    }[];
    bindings: {
        atlasDomId: string;
        eventKeys: string[];
        implementationKeys: string[];
        element: {
            type: string;
            file: string;
            line: number;
            column?: number | undefined;
        };
        bindingConfidence: "binding_exact" | "binding_inferred" | "binding_unresolved";
    }[];
    warnings: {
        code: string;
        file?: string | undefined;
        line?: number | undefined;
        message?: string | undefined;
        relatedImplementationKey?: string | undefined;
    }[];
    summaries?: {
        emitters: {
            name: string;
            eventCount: number;
        }[];
        analyticsProviders: {
            name: string;
            eventCount: number;
        }[];
    } | undefined;
    scanStats?: {
        filesScanned: number;
        durationMs: number;
        eventsDetected: number;
    } | undefined;
}, {
    version: string;
    buildId: string;
    generatedAt: string;
    events: {
        eventKey: string;
        implementationKey: string;
        eventName: string;
        emitter: "amplitude" | "custom" | "ga4" | "gtm" | "meta" | "mixpanel" | "posthog" | "unknown";
        analyticsProvider: "amplitude" | "ga4" | "meta" | "mixpanel" | "posthog" | "unknown";
        providerDetectionConfidence: "provider_configured" | "provider_exact" | "provider_unknown";
        parameters: string[];
        source: {
            file: string;
            line: number;
            column?: number | undefined;
        };
        overlaySupported: boolean;
    }[];
    bindings: {
        atlasDomId: string;
        eventKeys: string[];
        implementationKeys: string[];
        element: {
            type: string;
            file: string;
            line: number;
            column?: number | undefined;
        };
        bindingConfidence: "binding_exact" | "binding_inferred" | "binding_unresolved";
    }[];
    warnings: {
        code: string;
        file?: string | undefined;
        line?: number | undefined;
        message?: string | undefined;
        relatedImplementationKey?: string | undefined;
    }[];
    summaries?: {
        emitters: {
            name: string;
            eventCount: number;
        }[];
        analyticsProviders: {
            name: string;
            eventCount: number;
        }[];
    } | undefined;
    scanStats?: {
        filesScanned: number;
        durationMs: number;
        eventsDetected: number;
    } | undefined;
}>;
export type EventManifest = z.infer<typeof EventManifest>;
//# sourceMappingURL=manifest.d.ts.map