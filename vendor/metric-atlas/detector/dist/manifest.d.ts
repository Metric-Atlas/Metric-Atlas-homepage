import type { EventManifest, ManifestParts, ScanStats } from "./model.js";
export declare const MANIFEST_VERSION = "0.1";
export declare function shortHash(input: string): string;
export declare function createBuildId(seed: string): string;
export declare function createManifest(parts: ManifestParts, options: {
    buildId: string;
    generatedAt?: string;
    scanStats?: ScanStats;
    version?: string;
}): EventManifest;
//# sourceMappingURL=manifest.d.ts.map