/**
 * Detection pattern: event fired from inside a Custom Component (uppercase
 * JSX tag), not a native lowercase element. Per
 * docs/05-feature-1-detection-overlay.md §4, Metric Atlas keeps this event
 * in the manifest but marks it overlaySupported=false / overlayUnsupported
 * because the DOM-side <button> lives one level below the usage site.
 */
export function SponsorButton() {
  return (
    <button
      className="btn btn-secondary"
      onClick={() =>
        gtag("event", "sponsor_click", { tier: "monthly" })
      }
    >
      💛 스폰서 하기
    </button>
  );
}
