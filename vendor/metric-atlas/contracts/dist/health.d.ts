import { z } from "zod";
export declare const ParameterRegistrationState: z.ZodObject<{
    parameter: z.ZodString;
    state: z.ZodEnum<["builtin", "registered_custom_dimension", "not_registered", "unknown"]>;
}, "strip", z.ZodTypeAny, {
    parameter: string;
    state: "builtin" | "not_registered" | "registered_custom_dimension" | "unknown";
}, {
    parameter: string;
    state: "builtin" | "not_registered" | "registered_custom_dimension" | "unknown";
}>;
export type ParameterRegistrationState = z.infer<typeof ParameterRegistrationState>;
export declare const LatestMeasurement: z.ZodObject<{
    resultStatus: z.ZodEnum<["ok", "no_rows", "unauthorized", "unsupported", "error"]>;
    value: z.ZodOptional<z.ZodNumber>;
    qualityFlags: z.ZodArray<z.ZodEnum<["subject_to_thresholding", "other_row_data_loss", "recent_data_may_change"]>, "many">;
}, "strip", z.ZodTypeAny, {
    resultStatus: "error" | "no_rows" | "ok" | "unauthorized" | "unsupported";
    value?: number | undefined;
    qualityFlags: ("other_row_data_loss" | "recent_data_may_change" | "subject_to_thresholding")[];
}, {
    resultStatus: "error" | "no_rows" | "ok" | "unauthorized" | "unsupported";
    value?: number | undefined;
    qualityFlags: ("other_row_data_loss" | "recent_data_may_change" | "subject_to_thresholding")[];
}>;
export type LatestMeasurement = z.infer<typeof LatestMeasurement>;
/** ADR-001: parameterRegistrationStates must include every Manifest parameter for the same eventKey. */
export declare const HealthItem: z.ZodObject<{
    eventKey: z.ZodString;
    eventName: z.ZodString;
    codeState: z.ZodEnum<["detected", "not_detected", "unknown"]>;
    ga4ObservationState: z.ZodEnum<["observed", "not_observed", "unknown"]>;
    ga4ManagedState: z.ZodEnum<["managed", "not_managed", "unknown"]>;
    parameterRegistrationStates: z.ZodArray<z.ZodObject<{
        parameter: z.ZodString;
        state: z.ZodEnum<["builtin", "registered_custom_dimension", "not_registered", "unknown"]>;
    }, "strip", z.ZodTypeAny, {
        parameter: string;
        state: "builtin" | "not_registered" | "registered_custom_dimension" | "unknown";
    }, {
        parameter: string;
        state: "builtin" | "not_registered" | "registered_custom_dimension" | "unknown";
    }>, "many">;
    latestMeasurement: z.ZodOptional<z.ZodObject<{
        resultStatus: z.ZodEnum<["ok", "no_rows", "unauthorized", "unsupported", "error"]>;
        value: z.ZodOptional<z.ZodNumber>;
        qualityFlags: z.ZodArray<z.ZodEnum<["subject_to_thresholding", "other_row_data_loss", "recent_data_may_change"]>, "many">;
    }, "strip", z.ZodTypeAny, {
        resultStatus: "error" | "no_rows" | "ok" | "unauthorized" | "unsupported";
        value?: number | undefined;
        qualityFlags: ("other_row_data_loss" | "recent_data_may_change" | "subject_to_thresholding")[];
    }, {
        resultStatus: "error" | "no_rows" | "ok" | "unauthorized" | "unsupported";
        value?: number | undefined;
        qualityFlags: ("other_row_data_loss" | "recent_data_may_change" | "subject_to_thresholding")[];
    }>>;
    reviewReason: z.ZodOptional<z.ZodNullable<z.ZodString>>;
}, "strip", z.ZodTypeAny, {
    eventKey: string;
    eventName: string;
    codeState: "detected" | "not_detected" | "unknown";
    ga4ObservationState: "not_observed" | "observed" | "unknown";
    ga4ManagedState: "managed" | "not_managed" | "unknown";
    parameterRegistrationStates: {
        parameter: string;
        state: "builtin" | "not_registered" | "registered_custom_dimension" | "unknown";
    }[];
    latestMeasurement?: {
        resultStatus: "error" | "no_rows" | "ok" | "unauthorized" | "unsupported";
        value?: number | undefined;
        qualityFlags: ("other_row_data_loss" | "recent_data_may_change" | "subject_to_thresholding")[];
    } | undefined;
    reviewReason?: string | null | undefined;
}, {
    eventKey: string;
    eventName: string;
    codeState: "detected" | "not_detected" | "unknown";
    ga4ObservationState: "not_observed" | "observed" | "unknown";
    ga4ManagedState: "managed" | "not_managed" | "unknown";
    parameterRegistrationStates: {
        parameter: string;
        state: "builtin" | "not_registered" | "registered_custom_dimension" | "unknown";
    }[];
    latestMeasurement?: {
        resultStatus: "error" | "no_rows" | "ok" | "unauthorized" | "unsupported";
        value?: number | undefined;
        qualityFlags: ("other_row_data_loss" | "recent_data_may_change" | "subject_to_thresholding")[];
    } | undefined;
    reviewReason?: string | null | undefined;
}>;
export type HealthItem = z.infer<typeof HealthItem>;
export declare const HealthSummary: z.ZodObject<{
    healthy: z.ZodNumber;
    codeOnly: z.ZodNumber;
    ga4Only: z.ZodNumber;
    ga4Managed: z.ZodNumber;
    parameterRegistrationGap: z.ZodNumber;
    unresolved: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    healthy: number;
    codeOnly: number;
    ga4Only: number;
    ga4Managed: number;
    parameterRegistrationGap: number;
    unresolved: number;
}, {
    healthy: number;
    codeOnly: number;
    ga4Only: number;
    ga4Managed: number;
    parameterRegistrationGap: number;
    unresolved: number;
}>;
export type HealthSummary = z.infer<typeof HealthSummary>;
/**
 * ADR-001 bucket priority for classifying a HealthItem into exactly one HealthSummary bucket:
 * unresolved > parameterRegistrationGap > codeOnly > ga4Managed > ga4Only > healthy.
 * `unresolved` in HealthSummary additionally counts Manifest DYNAMIC_EVENT_NAME warnings,
 * which never appear in `items[]` and so are not covered by this classifier alone.
 */
export declare function classifyHealthItemBucket(item: HealthItem): keyof HealthSummary;
export declare const AnalyticsHealthReport: z.ZodObject<{
    generatedAt: z.ZodString;
    provider: z.ZodEnum<["ga4", "mixpanel", "meta", "posthog", "amplitude", "unknown"]>;
    propertyId: z.ZodString;
    reportingTimezone: z.ZodString;
    summary: z.ZodObject<{
        healthy: z.ZodNumber;
        codeOnly: z.ZodNumber;
        ga4Only: z.ZodNumber;
        ga4Managed: z.ZodNumber;
        parameterRegistrationGap: z.ZodNumber;
        unresolved: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        healthy: number;
        codeOnly: number;
        ga4Only: number;
        ga4Managed: number;
        parameterRegistrationGap: number;
        unresolved: number;
    }, {
        healthy: number;
        codeOnly: number;
        ga4Only: number;
        ga4Managed: number;
        parameterRegistrationGap: number;
        unresolved: number;
    }>;
    items: z.ZodArray<z.ZodObject<{
        eventKey: z.ZodString;
        eventName: z.ZodString;
        codeState: z.ZodEnum<["detected", "not_detected", "unknown"]>;
        ga4ObservationState: z.ZodEnum<["observed", "not_observed", "unknown"]>;
        ga4ManagedState: z.ZodEnum<["managed", "not_managed", "unknown"]>;
        parameterRegistrationStates: z.ZodArray<z.ZodObject<{
            parameter: z.ZodString;
            state: z.ZodEnum<["builtin", "registered_custom_dimension", "not_registered", "unknown"]>;
        }, "strip", z.ZodTypeAny, {
            parameter: string;
            state: "builtin" | "not_registered" | "registered_custom_dimension" | "unknown";
        }, {
            parameter: string;
            state: "builtin" | "not_registered" | "registered_custom_dimension" | "unknown";
        }>, "many">;
        latestMeasurement: z.ZodOptional<z.ZodObject<{
            resultStatus: z.ZodEnum<["ok", "no_rows", "unauthorized", "unsupported", "error"]>;
            value: z.ZodOptional<z.ZodNumber>;
            qualityFlags: z.ZodArray<z.ZodEnum<["subject_to_thresholding", "other_row_data_loss", "recent_data_may_change"]>, "many">;
        }, "strip", z.ZodTypeAny, {
            resultStatus: "error" | "no_rows" | "ok" | "unauthorized" | "unsupported";
            value?: number | undefined;
            qualityFlags: ("other_row_data_loss" | "recent_data_may_change" | "subject_to_thresholding")[];
        }, {
            resultStatus: "error" | "no_rows" | "ok" | "unauthorized" | "unsupported";
            value?: number | undefined;
            qualityFlags: ("other_row_data_loss" | "recent_data_may_change" | "subject_to_thresholding")[];
        }>>;
        reviewReason: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    }, "strip", z.ZodTypeAny, {
        eventKey: string;
        eventName: string;
        codeState: "detected" | "not_detected" | "unknown";
        ga4ObservationState: "not_observed" | "observed" | "unknown";
        ga4ManagedState: "managed" | "not_managed" | "unknown";
        parameterRegistrationStates: {
            parameter: string;
            state: "builtin" | "not_registered" | "registered_custom_dimension" | "unknown";
        }[];
        latestMeasurement?: {
            resultStatus: "error" | "no_rows" | "ok" | "unauthorized" | "unsupported";
            value?: number | undefined;
            qualityFlags: ("other_row_data_loss" | "recent_data_may_change" | "subject_to_thresholding")[];
        } | undefined;
        reviewReason?: string | null | undefined;
    }, {
        eventKey: string;
        eventName: string;
        codeState: "detected" | "not_detected" | "unknown";
        ga4ObservationState: "not_observed" | "observed" | "unknown";
        ga4ManagedState: "managed" | "not_managed" | "unknown";
        parameterRegistrationStates: {
            parameter: string;
            state: "builtin" | "not_registered" | "registered_custom_dimension" | "unknown";
        }[];
        latestMeasurement?: {
            resultStatus: "error" | "no_rows" | "ok" | "unauthorized" | "unsupported";
            value?: number | undefined;
            qualityFlags: ("other_row_data_loss" | "recent_data_may_change" | "subject_to_thresholding")[];
        } | undefined;
        reviewReason?: string | null | undefined;
    }>, "many">;
}, "strip", z.ZodTypeAny, {
    generatedAt: string;
    provider: "amplitude" | "ga4" | "meta" | "mixpanel" | "posthog" | "unknown";
    propertyId: string;
    reportingTimezone: string;
    summary: {
        healthy: number;
        codeOnly: number;
        ga4Only: number;
        ga4Managed: number;
        parameterRegistrationGap: number;
        unresolved: number;
    };
    items: {
        eventKey: string;
        eventName: string;
        codeState: "detected" | "not_detected" | "unknown";
        ga4ObservationState: "not_observed" | "observed" | "unknown";
        ga4ManagedState: "managed" | "not_managed" | "unknown";
        parameterRegistrationStates: {
            parameter: string;
            state: "builtin" | "not_registered" | "registered_custom_dimension" | "unknown";
        }[];
        latestMeasurement?: {
            resultStatus: "error" | "no_rows" | "ok" | "unauthorized" | "unsupported";
            value?: number | undefined;
            qualityFlags: ("other_row_data_loss" | "recent_data_may_change" | "subject_to_thresholding")[];
        } | undefined;
        reviewReason?: string | null | undefined;
    }[];
}, {
    generatedAt: string;
    provider: "amplitude" | "ga4" | "meta" | "mixpanel" | "posthog" | "unknown";
    propertyId: string;
    reportingTimezone: string;
    summary: {
        healthy: number;
        codeOnly: number;
        ga4Only: number;
        ga4Managed: number;
        parameterRegistrationGap: number;
        unresolved: number;
    };
    items: {
        eventKey: string;
        eventName: string;
        codeState: "detected" | "not_detected" | "unknown";
        ga4ObservationState: "not_observed" | "observed" | "unknown";
        ga4ManagedState: "managed" | "not_managed" | "unknown";
        parameterRegistrationStates: {
            parameter: string;
            state: "builtin" | "not_registered" | "registered_custom_dimension" | "unknown";
        }[];
        latestMeasurement?: {
            resultStatus: "error" | "no_rows" | "ok" | "unauthorized" | "unsupported";
            value?: number | undefined;
            qualityFlags: ("other_row_data_loss" | "recent_data_may_change" | "subject_to_thresholding")[];
        } | undefined;
        reviewReason?: string | null | undefined;
    }[];
}>;
export type AnalyticsHealthReport = z.infer<typeof AnalyticsHealthReport>;
//# sourceMappingURL=health.d.ts.map