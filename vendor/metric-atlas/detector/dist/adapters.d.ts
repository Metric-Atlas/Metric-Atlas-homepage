import * as t from "@babel/types";
import type { NodePath } from "@babel/traverse";
import type { AnalyticsProvider, ProviderDetectionConfidence, TrackingEmitter } from "./model.js";
export interface DetectionCandidate {
    emitter: TrackingEmitter;
    analyticsProvider: AnalyticsProvider;
    providerDetectionConfidence: ProviderDetectionConfidence;
    eventNameNode: t.Node | null;
    parametersNode: t.ObjectExpression | null;
}
export interface DetectorAdapter {
    name: DetectorAdapterName;
    matchesSdkReference(path: NodePath<t.CallExpression>): boolean;
    detect(path: NodePath<t.CallExpression>): DetectionCandidate | null;
}
export type DetectorAdapterName = "ga4" | "gtm" | "mixpanel" | "meta" | "posthog" | "amplitude";
export declare const DEFAULT_DETECTOR_ADAPTERS: readonly ["ga4", "gtm"];
export declare const detectorAdaptersByName: Readonly<Record<DetectorAdapterName, DetectorAdapter>>;
/** DEC-037: official MVP detection defaults to GA4/GTM only. */
export declare const defaultDetectorAdapters: readonly DetectorAdapter[];
export declare function detectorAdaptersFor(names: readonly DetectorAdapterName[]): readonly DetectorAdapter[];
export declare function isDetectorAdapterName(value: string): value is DetectorAdapterName;
//# sourceMappingURL=adapters.d.ts.map