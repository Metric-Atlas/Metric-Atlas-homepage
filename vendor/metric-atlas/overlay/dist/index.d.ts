import { type EventManifest } from "@metric-atlas/contracts";
export declare const METRIC_ATLAS_OVERLAY_TAG = "metric-atlas-overlay";
export interface DomCoverage {
    injectCandidateCount: number;
    domMatchedCount: number;
    domMissingCount: number;
    bindingCoverage: number;
}
export interface MountOverlayOptions {
    manifest?: EventManifest;
    manifestUrl?: string;
    parent?: HTMLElement;
}
export declare class MetricAtlasOverlayElement extends HTMLElement {
    #private;
    static observedAttributes: string[];
    constructor();
    connectedCallback(): void;
    disconnectedCallback(): void;
    attributeChangedCallback(name: string, oldValue: string | null, newValue: string | null): void;
    get manifest(): EventManifest | null;
    set manifest(value: EventManifest | null);
    loadManifest(url: string): Promise<void>;
    setManifest(manifest: EventManifest): DomCoverage;
    measureCoverage(): DomCoverage;
}
export declare function defineMetricAtlasOverlay(): void;
export declare function mountMetricAtlasOverlay(options?: MountOverlayOptions): MetricAtlasOverlayElement;
declare global {
    interface HTMLElementTagNameMap {
        "metric-atlas-overlay": MetricAtlasOverlayElement;
    }
}
//# sourceMappingURL=index.d.ts.map