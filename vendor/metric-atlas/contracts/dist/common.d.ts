import { z } from "zod";
export declare const AnalyticsProvider: z.ZodEnum<["ga4", "mixpanel", "meta", "posthog", "amplitude", "unknown"]>;
export type AnalyticsProvider = z.infer<typeof AnalyticsProvider>;
export declare const TrackingEmitter: z.ZodEnum<["ga4", "gtm", "mixpanel", "meta", "posthog", "amplitude", "custom", "unknown"]>;
export type TrackingEmitter = z.infer<typeof TrackingEmitter>;
export declare const ProviderDetectionConfidence: z.ZodEnum<["provider_exact", "provider_configured", "provider_unknown"]>;
export type ProviderDetectionConfidence = z.infer<typeof ProviderDetectionConfidence>;
export declare const BindingConfidence: z.ZodEnum<["binding_exact", "binding_inferred", "binding_unresolved"]>;
export type BindingConfidence = z.infer<typeof BindingConfidence>;
export declare const CodeState: z.ZodEnum<["detected", "not_detected", "unknown"]>;
export type CodeState = z.infer<typeof CodeState>;
export declare const Ga4ObservationState: z.ZodEnum<["observed", "not_observed", "unknown"]>;
export type Ga4ObservationState = z.infer<typeof Ga4ObservationState>;
export declare const Ga4ManagedState: z.ZodEnum<["managed", "not_managed", "unknown"]>;
export type Ga4ManagedState = z.infer<typeof Ga4ManagedState>;
export declare const ParameterState: z.ZodEnum<["builtin", "registered_custom_dimension", "not_registered", "unknown"]>;
export type ParameterState = z.infer<typeof ParameterState>;
export declare const ResultStatus: z.ZodEnum<["ok", "no_rows", "unauthorized", "unsupported", "error"]>;
export type ResultStatus = z.infer<typeof ResultStatus>;
export declare const DataQualityFlag: z.ZodEnum<["subject_to_thresholding", "other_row_data_loss", "recent_data_may_change"]>;
export type DataQualityFlag = z.infer<typeof DataQualityFlag>;
export declare const MetricType: z.ZodEnum<["event_count", "comparison", "custom"]>;
export type MetricType = z.infer<typeof MetricType>;
/**
 * docs/20 §6. The `never`-typed optional siblings let consumers read `.startDate`/`.endDate`
 * across the union without narrowing first (ADR-003 fix — the original z.union() lacked these,
 * which didn't match the documented type and broke direct property access in connector-ga4).
 * ADR-001: QueryResult/AnalyticsHealthReport dateRange is always resolved to absolute dates.
 */
export declare const DateRange: z.ZodUnion<[z.ZodObject<{
    preset: z.ZodString;
    startDate: z.ZodOptional<z.ZodNever>;
    endDate: z.ZodOptional<z.ZodNever>;
}, "strip", z.ZodTypeAny, {
    preset: string;
    startDate?: undefined;
    endDate?: undefined;
}, {
    preset: string;
    startDate?: undefined;
    endDate?: undefined;
}>, z.ZodObject<{
    preset: z.ZodOptional<z.ZodNever>;
    startDate: z.ZodString;
    endDate: z.ZodString;
}, "strip", z.ZodTypeAny, {
    preset?: undefined;
    startDate: string;
    endDate: string;
}, {
    preset?: undefined;
    startDate: string;
    endDate: string;
}>]>;
export type DateRange = z.infer<typeof DateRange>;
export declare const SourceLocation: z.ZodObject<{
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
export type SourceLocation = z.infer<typeof SourceLocation>;
export declare const ElementLocation: z.ZodObject<{
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
export type ElementLocation = z.infer<typeof ElementLocation>;
/** Phase 0 warning codes (docs/20 §4, ADR-001/ADR-002). Not exhaustive — new codes may be added via ADR. */
export declare const KNOWN_SCAN_WARNING_CODES: readonly ["DYNAMIC_EVENT_NAME", "POSSIBLE_WRAPPER_USAGE", "CUSTOM_COMPONENT_OVERLAY_UNSUPPORTED", "PARSE_ERROR", "DYNAMIC_PARAMETER_KEY", "UNRESOLVED_EVENT_BINDING", "PORTAL_OVERLAY_UNSUPPORTED", "ATLAS_ATTRIBUTE_CONFLICT"];
export declare const ScanWarning: z.ZodObject<{
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
}>;
export type ScanWarning = z.infer<typeof ScanWarning>;
//# sourceMappingURL=common.d.ts.map