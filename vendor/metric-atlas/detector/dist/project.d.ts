import { type DetectorAdapterName } from "./adapters.js";
import type { EventManifest, SourceAnalysis } from "./model.js";
export declare const DEFAULT_INCLUDE: string[];
export declare const DEFAULT_EXCLUDE: string[];
export interface ScanProjectOptions {
    root?: string;
    include?: string[];
    exclude?: string[];
    buildId?: string;
    generatedAt?: string;
    /** DEC-037: defaults to GA4/GTM; other adapters require explicit opt-in. */
    detectors?: DetectorAdapterName[];
}
export interface ScannedFile {
    file: string;
    analysis: SourceAnalysis;
}
export interface ScanProjectResult {
    manifest: EventManifest;
    files: ScannedFile[];
}
export interface ScanGitRefOptions extends ScanProjectOptions {
    ref: string;
}
export declare function scanProject(options?: ScanProjectOptions): Promise<ScanProjectResult>;
/**
 * Scans files directly from a Git tree without checking out or mutating either
 * the caller's worktree or the referenced commit.
 */
export declare function scanGitRef(options: ScanGitRefOptions): Promise<ScanProjectResult>;
export declare function toPosix(file: string): string;
//# sourceMappingURL=project.d.ts.map