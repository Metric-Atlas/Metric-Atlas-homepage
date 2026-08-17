import { isMixpanelConfigured, mixpanel } from "../../analytics/mixpanel";

/**
 * Detection pattern: Mixpanel direct call. Metric Atlas's MVP detector
 * covers GA4/GTM only (see docs/05-feature-1-detection-overlay.md §2), so
 * this button is a fixture for verifying Mixpanel events are correctly
 * left *undetected* until a Mixpanel connector ships.
 */
export function PrButton() {
  return (
    <a
      className="btn btn-secondary"
      href="https://github.com/metric-atlas/metric-atlas/compare"
      target="_blank"
      rel="noreferrer"
      onClick={() => {
        if (isMixpanelConfigured) {
          mixpanel.track("pr_click", { source: "community_actions" });
        } else {
          console.log("[demo] mixpanel.track: pr_click");
        }
      }}
    >
      🔀 PR 올리기
    </a>
  );
}
