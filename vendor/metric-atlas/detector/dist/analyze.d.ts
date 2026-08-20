import { type DetectorAdapter } from "./adapters.js";
import type { SourceAnalysis } from "./model.js";
export interface AnalyzeSourceOptions {
    file: string;
    buildId: string;
    adapters?: readonly DetectorAdapter[];
}
export declare function analyzeSource(source: string, options: AnalyzeSourceOptions): SourceAnalysis;
//# sourceMappingURL=analyze.d.ts.map