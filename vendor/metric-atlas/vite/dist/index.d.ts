import type { EventManifest } from "@metric-atlas/contracts";
import { type DetectorAdapterName } from "@metric-atlas/detector";
import { type Plugin } from "vite";
declare const VIRTUAL_OVERLAY_ID = "virtual:metric-atlas-overlay-entry";
export interface MetricAtlasViteOptions {
    enabled?: boolean;
    include?: string[];
    exclude?: string[];
    manifestFile?: string;
    manifestEndpoint?: string;
    buildId?: string;
    /** DEC-037: defaults to ["ga4", "gtm"]. */
    detectors?: DetectorAdapterName[];
    overlay?: {
        enabled?: boolean;
    };
}
export interface MetricAtlasPluginApi {
    getManifest(): EventManifest;
}
export interface MetricAtlasPlugin extends Plugin {
    api: MetricAtlasPluginApi;
}
export default function metricAtlas(options?: MetricAtlasViteOptions): MetricAtlasPlugin;
export { VIRTUAL_OVERLAY_ID };
//# sourceMappingURL=index.d.ts.map