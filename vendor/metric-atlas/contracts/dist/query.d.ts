import { z } from "zod";
/**
 * ADR-001: Producer = C (GA4 Connector). D produces QueryPlan only, never QueryResult.
 * dateRange is always resolved to absolute dates; comparisonDateRange is required
 * when metricType is "comparison" and resultStatus is "ok" (ADR-003 refinement —
 * a failed/empty comparison query has no meaningful comparison range to report).
 */
export declare const QueryResult: z.ZodEffects<z.ZodObject<{
    provider: z.ZodEnum<["ga4", "mixpanel", "meta", "posthog", "amplitude", "unknown"]>;
    eventKey: z.ZodString;
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
}, "strip", z.ZodTypeAny, {
    provider: "amplitude" | "ga4" | "meta" | "mixpanel" | "posthog" | "unknown";
    eventKey: string;
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
}, {
    provider: "amplitude" | "ga4" | "meta" | "mixpanel" | "posthog" | "unknown";
    eventKey: string;
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
}>, {
    provider: "amplitude" | "ga4" | "meta" | "mixpanel" | "posthog" | "unknown";
    eventKey: string;
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
}, {
    provider: "amplitude" | "ga4" | "meta" | "mixpanel" | "posthog" | "unknown";
    eventKey: string;
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
}>;
export type QueryResult = z.infer<typeof QueryResult>;
/** Minimal QueryPlan for the Phase 0 fixture envelope. Full contract: docs/08 §8. */
export declare const QueryPlan: z.ZodObject<{
    version: z.ZodString;
    analysisType: z.ZodEnum<["definition", "event_count", "comparison"]>;
    eventKeys: z.ZodArray<z.ZodString, "many">;
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
    filters: z.ZodArray<z.ZodUnknown, "many">;
    breakdowns: z.ZodArray<z.ZodUnknown, "many">;
    sourceRefs: z.ZodArray<z.ZodString, "many">;
    assumptions: z.ZodArray<z.ZodUnknown, "many">;
}, "strip", z.ZodTypeAny, {
    version: string;
    analysisType: "comparison" | "definition" | "event_count";
    eventKeys: string[];
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
    filters: unknown[];
    breakdowns: unknown[];
    sourceRefs: string[];
    assumptions: unknown[];
}, {
    version: string;
    analysisType: "comparison" | "definition" | "event_count";
    eventKeys: string[];
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
    filters: unknown[];
    breakdowns: unknown[];
    sourceRefs: string[];
    assumptions: unknown[];
}>;
export type QueryPlan = z.infer<typeof QueryPlan>;
export declare const MockQueryFixture: z.ZodObject<{
    queryPlan: z.ZodObject<{
        version: z.ZodString;
        analysisType: z.ZodEnum<["definition", "event_count", "comparison"]>;
        eventKeys: z.ZodArray<z.ZodString, "many">;
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
        filters: z.ZodArray<z.ZodUnknown, "many">;
        breakdowns: z.ZodArray<z.ZodUnknown, "many">;
        sourceRefs: z.ZodArray<z.ZodString, "many">;
        assumptions: z.ZodArray<z.ZodUnknown, "many">;
    }, "strip", z.ZodTypeAny, {
        version: string;
        analysisType: "comparison" | "definition" | "event_count";
        eventKeys: string[];
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
        filters: unknown[];
        breakdowns: unknown[];
        sourceRefs: string[];
        assumptions: unknown[];
    }, {
        version: string;
        analysisType: "comparison" | "definition" | "event_count";
        eventKeys: string[];
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
        filters: unknown[];
        breakdowns: unknown[];
        sourceRefs: string[];
        assumptions: unknown[];
    }>;
    result: z.ZodEffects<z.ZodObject<{
        provider: z.ZodEnum<["ga4", "mixpanel", "meta", "posthog", "amplitude", "unknown"]>;
        eventKey: z.ZodString;
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
    }, "strip", z.ZodTypeAny, {
        provider: "amplitude" | "ga4" | "meta" | "mixpanel" | "posthog" | "unknown";
        eventKey: string;
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
    }, {
        provider: "amplitude" | "ga4" | "meta" | "mixpanel" | "posthog" | "unknown";
        eventKey: string;
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
    }>, {
        provider: "amplitude" | "ga4" | "meta" | "mixpanel" | "posthog" | "unknown";
        eventKey: string;
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
    }, {
        provider: "amplitude" | "ga4" | "meta" | "mixpanel" | "posthog" | "unknown";
        eventKey: string;
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
    }>;
}, "strip", z.ZodTypeAny, {
    queryPlan: {
        version: string;
        analysisType: "comparison" | "definition" | "event_count";
        eventKeys: string[];
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
        filters: unknown[];
        breakdowns: unknown[];
        sourceRefs: string[];
        assumptions: unknown[];
    };
    result: {
        provider: "amplitude" | "ga4" | "meta" | "mixpanel" | "posthog" | "unknown";
        eventKey: string;
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
    };
}, {
    queryPlan: {
        version: string;
        analysisType: "comparison" | "definition" | "event_count";
        eventKeys: string[];
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
        filters: unknown[];
        breakdowns: unknown[];
        sourceRefs: string[];
        assumptions: unknown[];
    };
    result: {
        provider: "amplitude" | "ga4" | "meta" | "mixpanel" | "posthog" | "unknown";
        eventKey: string;
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
    };
}>;
export type MockQueryFixture = z.infer<typeof MockQueryFixture>;
//# sourceMappingURL=query.d.ts.map