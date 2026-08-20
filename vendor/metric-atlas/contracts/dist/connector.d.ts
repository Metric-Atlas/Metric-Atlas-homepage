import { z } from "zod";
import { DateRange } from "./common.js";
/** docs/08 §5. Credential is resolved in the Node Runtime; only a reference name crosses the contract. */
export declare const ConnectorContext: z.ZodObject<{
    provider: z.ZodEnum<["ga4", "mixpanel", "meta", "posthog", "amplitude", "unknown"]>;
    propertyId: z.ZodString;
    credentialRef: z.ZodString;
}, "strip", z.ZodTypeAny, {
    provider: "amplitude" | "ga4" | "meta" | "mixpanel" | "posthog" | "unknown";
    propertyId: string;
    credentialRef: string;
}, {
    provider: "amplitude" | "ga4" | "meta" | "mixpanel" | "posthog" | "unknown";
    propertyId: string;
    credentialRef: string;
}>;
export type ConnectorContext = z.infer<typeof ConnectorContext>;
export declare const ConnectionResult: z.ZodObject<{
    success: z.ZodBoolean;
    provider: z.ZodEnum<["ga4", "mixpanel", "meta", "posthog", "amplitude", "unknown"]>;
    propertyId: z.ZodString;
    reportingTimezone: z.ZodOptional<z.ZodString>;
    errorCode: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    success: boolean;
    provider: "amplitude" | "ga4" | "meta" | "mixpanel" | "posthog" | "unknown";
    propertyId: string;
    reportingTimezone?: string | undefined;
    errorCode?: string | undefined;
}, {
    success: boolean;
    provider: "amplitude" | "ga4" | "meta" | "mixpanel" | "posthog" | "unknown";
    propertyId: string;
    reportingTimezone?: string | undefined;
    errorCode?: string | undefined;
}>;
export type ConnectionResult = z.infer<typeof ConnectionResult>;
/** ADR-003: comparisonRange is required when metric="comparison" (mirrors QueryPlan.comparisonRange). */
export declare const ProviderAgnosticQuery: z.ZodEffects<z.ZodObject<{
    eventKey: z.ZodOptional<z.ZodString>;
    eventName: z.ZodString;
    metric: z.ZodEnum<["event_count", "comparison", "custom"]>;
    dateRange: z.ZodUnion<[z.ZodObject<{
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
    comparisonRange: z.ZodOptional<z.ZodUnion<[z.ZodObject<{
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
    }>]>>;
    breakdowns: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    filters: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodString>>;
}, "strip", z.ZodTypeAny, {
    eventKey?: string | undefined;
    eventName: string;
    metric: "comparison" | "custom" | "event_count";
    dateRange: {
        preset: string;
        startDate?: undefined;
        endDate?: undefined;
    } | {
        preset?: undefined;
        startDate: string;
        endDate: string;
    };
    comparisonRange?: {
        preset: string;
        startDate?: undefined;
        endDate?: undefined;
    } | {
        preset?: undefined;
        startDate: string;
        endDate: string;
    } | undefined;
    breakdowns?: string[] | undefined;
    filters?: Record<string, string> | undefined;
}, {
    eventKey?: string | undefined;
    eventName: string;
    metric: "comparison" | "custom" | "event_count";
    dateRange: {
        preset: string;
        startDate?: undefined;
        endDate?: undefined;
    } | {
        preset?: undefined;
        startDate: string;
        endDate: string;
    };
    comparisonRange?: {
        preset: string;
        startDate?: undefined;
        endDate?: undefined;
    } | {
        preset?: undefined;
        startDate: string;
        endDate: string;
    } | undefined;
    breakdowns?: string[] | undefined;
    filters?: Record<string, string> | undefined;
}>, {
    eventKey?: string | undefined;
    eventName: string;
    metric: "comparison" | "custom" | "event_count";
    dateRange: {
        preset: string;
        startDate?: undefined;
        endDate?: undefined;
    } | {
        preset?: undefined;
        startDate: string;
        endDate: string;
    };
    comparisonRange?: {
        preset: string;
        startDate?: undefined;
        endDate?: undefined;
    } | {
        preset?: undefined;
        startDate: string;
        endDate: string;
    } | undefined;
    breakdowns?: string[] | undefined;
    filters?: Record<string, string> | undefined;
}, {
    eventKey?: string | undefined;
    eventName: string;
    metric: "comparison" | "custom" | "event_count";
    dateRange: {
        preset: string;
        startDate?: undefined;
        endDate?: undefined;
    } | {
        preset?: undefined;
        startDate: string;
        endDate: string;
    };
    comparisonRange?: {
        preset: string;
        startDate?: undefined;
        endDate?: undefined;
    } | {
        preset?: undefined;
        startDate: string;
        endDate: string;
    } | undefined;
    breakdowns?: string[] | undefined;
    filters?: Record<string, string> | undefined;
}>;
export type ProviderAgnosticQuery = z.infer<typeof ProviderAgnosticQuery>;
export declare const ConnectorCapabilities: z.ZodObject<{
    supportedMetrics: z.ZodArray<z.ZodEnum<["event_count", "comparison", "custom"]>, "many">;
    supportedDimensions: z.ZodArray<z.ZodString, "many">;
    comparisonSupport: z.ZodBoolean;
    adminMetadataSupport: z.ZodBoolean;
    /** ADR-007: supports listObservedEventNames() for "GA4 only" Health detection. */
    eventListingSupport: z.ZodBoolean;
}, "strip", z.ZodTypeAny, {
    supportedMetrics: ("comparison" | "custom" | "event_count")[];
    supportedDimensions: string[];
    comparisonSupport: boolean;
    adminMetadataSupport: boolean;
    eventListingSupport: boolean;
}, {
    supportedMetrics: ("comparison" | "custom" | "event_count")[];
    supportedDimensions: string[];
    comparisonSupport: boolean;
    adminMetadataSupport: boolean;
    eventListingSupport: boolean;
}>;
export type ConnectorCapabilities = z.infer<typeof ConnectorCapabilities>;
/** ADR-007: dedicated result for listing every event name with data in a date range (GA4-only detection). */
export declare const Ga4ObservedEventsResult: z.ZodObject<{
    resultStatus: z.ZodEnum<["ok", "no_rows", "unauthorized", "unsupported", "error"]>;
    eventNames: z.ZodArray<z.ZodString, "many">;
    qualityFlags: z.ZodArray<z.ZodEnum<["subject_to_thresholding", "other_row_data_loss", "recent_data_may_change"]>, "many">;
}, "strip", z.ZodTypeAny, {
    resultStatus: "error" | "no_rows" | "ok" | "unauthorized" | "unsupported";
    eventNames: string[];
    qualityFlags: ("other_row_data_loss" | "recent_data_may_change" | "subject_to_thresholding")[];
}, {
    resultStatus: "error" | "no_rows" | "ok" | "unauthorized" | "unsupported";
    eventNames: string[];
    qualityFlags: ("other_row_data_loss" | "recent_data_may_change" | "subject_to_thresholding")[];
}>;
export type Ga4ObservedEventsResult = z.infer<typeof Ga4ObservedEventsResult>;
/**
 * Connector execution-level result (docs/08 §6). Distinct from `QueryResult` (docs/20 §6):
 * this is the Connector's raw output. C converts it into `QueryResult` for D's Query UI,
 * stripping `providerMetadata` and guaranteeing `eventKey` (ADR-003).
 * comparisonDateRange is required when metricType="comparison", mirroring QueryResult.
 */
export declare const NormalizedAnalyticsResult: z.ZodEffects<z.ZodObject<{
    provider: z.ZodLiteral<"ga4">;
    eventKey: z.ZodOptional<z.ZodString>;
    metricType: z.ZodEnum<["event_count", "comparison", "custom"]>;
    resultStatus: z.ZodEnum<["ok", "no_rows", "unauthorized", "unsupported", "error"]>;
    value: z.ZodOptional<z.ZodNumber>;
    previousValue: z.ZodOptional<z.ZodNumber>;
    dateRange: z.ZodUnion<[z.ZodObject<{
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
    comparisonDateRange: z.ZodOptional<z.ZodUnion<[z.ZodObject<{
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
    }>]>>;
    reportingTimezone: z.ZodString;
    fetchedAt: z.ZodString;
    qualityFlags: z.ZodArray<z.ZodEnum<["subject_to_thresholding", "other_row_data_loss", "recent_data_may_change"]>, "many">;
    providerMetadata: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
}, "strip", z.ZodTypeAny, {
    provider: "ga4";
    eventKey?: string | undefined;
    metricType: "comparison" | "custom" | "event_count";
    resultStatus: "error" | "no_rows" | "ok" | "unauthorized" | "unsupported";
    value?: number | undefined;
    previousValue?: number | undefined;
    dateRange: {
        preset: string;
        startDate?: undefined;
        endDate?: undefined;
    } | {
        preset?: undefined;
        startDate: string;
        endDate: string;
    };
    comparisonDateRange?: {
        preset: string;
        startDate?: undefined;
        endDate?: undefined;
    } | {
        preset?: undefined;
        startDate: string;
        endDate: string;
    } | undefined;
    reportingTimezone: string;
    fetchedAt: string;
    qualityFlags: ("other_row_data_loss" | "recent_data_may_change" | "subject_to_thresholding")[];
    providerMetadata?: Record<string, unknown> | undefined;
}, {
    provider: "ga4";
    eventKey?: string | undefined;
    metricType: "comparison" | "custom" | "event_count";
    resultStatus: "error" | "no_rows" | "ok" | "unauthorized" | "unsupported";
    value?: number | undefined;
    previousValue?: number | undefined;
    dateRange: {
        preset: string;
        startDate?: undefined;
        endDate?: undefined;
    } | {
        preset?: undefined;
        startDate: string;
        endDate: string;
    };
    comparisonDateRange?: {
        preset: string;
        startDate?: undefined;
        endDate?: undefined;
    } | {
        preset?: undefined;
        startDate: string;
        endDate: string;
    } | undefined;
    reportingTimezone: string;
    fetchedAt: string;
    qualityFlags: ("other_row_data_loss" | "recent_data_may_change" | "subject_to_thresholding")[];
    providerMetadata?: Record<string, unknown> | undefined;
}>, {
    provider: "ga4";
    eventKey?: string | undefined;
    metricType: "comparison" | "custom" | "event_count";
    resultStatus: "error" | "no_rows" | "ok" | "unauthorized" | "unsupported";
    value?: number | undefined;
    previousValue?: number | undefined;
    dateRange: {
        preset: string;
        startDate?: undefined;
        endDate?: undefined;
    } | {
        preset?: undefined;
        startDate: string;
        endDate: string;
    };
    comparisonDateRange?: {
        preset: string;
        startDate?: undefined;
        endDate?: undefined;
    } | {
        preset?: undefined;
        startDate: string;
        endDate: string;
    } | undefined;
    reportingTimezone: string;
    fetchedAt: string;
    qualityFlags: ("other_row_data_loss" | "recent_data_may_change" | "subject_to_thresholding")[];
    providerMetadata?: Record<string, unknown> | undefined;
}, {
    provider: "ga4";
    eventKey?: string | undefined;
    metricType: "comparison" | "custom" | "event_count";
    resultStatus: "error" | "no_rows" | "ok" | "unauthorized" | "unsupported";
    value?: number | undefined;
    previousValue?: number | undefined;
    dateRange: {
        preset: string;
        startDate?: undefined;
        endDate?: undefined;
    } | {
        preset?: undefined;
        startDate: string;
        endDate: string;
    };
    comparisonDateRange?: {
        preset: string;
        startDate?: undefined;
        endDate?: undefined;
    } | {
        preset?: undefined;
        startDate: string;
        endDate: string;
    } | undefined;
    reportingTimezone: string;
    fetchedAt: string;
    qualityFlags: ("other_row_data_loss" | "recent_data_may_change" | "subject_to_thresholding")[];
    providerMetadata?: Record<string, unknown> | undefined;
}>;
export type NormalizedAnalyticsResult = z.infer<typeof NormalizedAnalyticsResult>;
export interface AnalyticsConnector {
    testConnection(context: ConnectorContext): Promise<ConnectionResult>;
    query(context: ConnectorContext, query: ProviderAgnosticQuery): Promise<NormalizedAnalyticsResult>;
    capabilities(): ConnectorCapabilities;
    /** ADR-007: every event name with data in dateRange, for "GA4 only" Health detection. */
    listObservedEventNames(context: ConnectorContext, dateRange: DateRange): Promise<Ga4ObservedEventsResult>;
}
//# sourceMappingURL=connector.d.ts.map