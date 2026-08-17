/**
 * Detection pattern: unsupported wrapper (docs/05-feature-1-detection-overlay.md §3).
 * `trackEvent` wraps `gtag`, and the JSX site calls `trackEvent(...)`, not
 * `gtag(...)` directly. Metric Atlas's MVP should NOT resolve this into a
 * bound event, and should instead surface the
 * "GA4 SDK/import detected but direct event call count = 0" build warning
 * when no other direct gtag() call exists in this file.
 */
function trackEvent(name: string, params?: Record<string, unknown>) {
  gtag("event", name, params);
}

export function StarButton() {
  return (
    <a
      className="btn btn-primary"
      href="https://github.com/metric-atlas/metric-atlas"
      target="_blank"
      rel="noreferrer"
      onClick={() => trackEvent("star_click", { location: "community_actions" })}
    >
      ⭐ GitHub에 Star 주기
    </a>
  );
}
