import { mountMetricAtlasOverlay } from "./index.js";
function mount() {
    mountMetricAtlasOverlay({
        manifestUrl: "/__metric-atlas/api/manifest",
    });
}
if (document.readyState !== "complete") {
    window.addEventListener("load", mount, { once: true });
}
else {
    mount();
}
//# sourceMappingURL=auto.js.map