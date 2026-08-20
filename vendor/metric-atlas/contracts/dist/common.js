import { z } from "zod";
export const AnalyticsProvider = z.enum([
    "ga4",
    "mixpanel",
    "meta",
    "posthog",
    "amplitude",
    "unknown",
]);
export const TrackingEmitter = z.enum([
    "ga4",
    "gtm",
    "mixpanel",
    "meta",
    "posthog",
    "amplitude",
    "custom",
    "unknown",
]);
export const ProviderDetectionConfidence = z.enum([
    "provider_exact",
    "provider_configured",
    "provider_unknown",
]);
export const BindingConfidence = z.enum([
    "binding_exact",
    "binding_inferred",
    "binding_unresolved",
]);
export const CodeState = z.enum(["detected", "not_detected", "unknown"]);
export const Ga4ObservationState = z.enum([
    "observed",
    "not_observed",
    "unknown",
]);
export const Ga4ManagedState = z.enum(["managed", "not_managed", "unknown"]);
export const ParameterState = z.enum([
    "builtin",
    "registered_custom_dimension",
    "not_registered",
    "unknown",
]);
export const ResultStatus = z.enum([
    "ok",
    "no_rows",
    "unauthorized",
    "unsupported",
    "error",
]);
export const DataQualityFlag = z.enum([
    "subject_to_thresholding",
    "other_row_data_loss",
    "recent_data_may_change",
]);
export const MetricType = z.enum(["event_count", "comparison", "custom"]);
const PresetDateRange = z.object({
    preset: z.string(),
    startDate: z.never().optional(),
    endDate: z.never().optional(),
});
const AbsoluteDateRange = z.object({
    preset: z.never().optional(),
    startDate: z.string(),
    endDate: z.string(),
});
/**
 * docs/20 §6. The `never`-typed optional siblings let consumers read `.startDate`/`.endDate`
 * across the union without narrowing first (ADR-003 fix — the original z.union() lacked these,
 * which didn't match the documented type and broke direct property access in connector-ga4).
 * ADR-001: QueryResult/AnalyticsHealthReport dateRange is always resolved to absolute dates.
 */
export const DateRange = z.union([PresetDateRange, AbsoluteDateRange]);
export const SourceLocation = z.object({
    file: z.string(),
    line: z.number().int().positive(),
    column: z.number().int().positive().optional(),
});
export const ElementLocation = z.object({
    type: z.string(),
    file: z.string(),
    line: z.number().int().positive(),
    column: z.number().int().positive().optional(),
});
/** Phase 0 warning codes (docs/20 §4, ADR-001/ADR-002). Not exhaustive — new codes may be added via ADR. */
export const KNOWN_SCAN_WARNING_CODES = [
    "DYNAMIC_EVENT_NAME",
    "POSSIBLE_WRAPPER_USAGE",
    "CUSTOM_COMPONENT_OVERLAY_UNSUPPORTED",
    "PARSE_ERROR",
    "DYNAMIC_PARAMETER_KEY",
    "UNRESOLVED_EVENT_BINDING",
    "PORTAL_OVERLAY_UNSUPPORTED",
    "ATLAS_ATTRIBUTE_CONFLICT",
];
export const ScanWarning = z.object({
    code: z.string(),
    file: z.string().optional(),
    line: z.number().int().positive().optional(),
    message: z.string().optional(),
    relatedImplementationKey: z.string().optional(),
});
//# sourceMappingURL=common.js.map