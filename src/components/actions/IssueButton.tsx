/**
 * Detection pattern: GA4 direct call via a same-file handler reference
 * (not an inline arrow). Expected Metric Atlas result: emitter=ga4,
 * binding confidence should land on the "same-file handler reference"
 * path described in docs/05-feature-1-detection-overlay.md §4.
 */
function handleIssueClick() {
  gtag("event", "issue_click", { repo: "metric-atlas/metric-atlas" });
}

export function IssueButton() {
  return (
    <a
      className="btn btn-ghost"
      href="https://github.com/metric-atlas/metric-atlas/issues/new"
      target="_blank"
      rel="noreferrer"
      onClick={handleIssueClick}
    >
      🐞 이슈 등록하기
    </a>
  );
}
