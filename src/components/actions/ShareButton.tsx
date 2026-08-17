import { useState } from "react";

const PLATFORMS = ["x", "linkedin", "reddit"] as const;

/**
 * Detection pattern: dynamic event name built from a runtime value.
 * Expected Metric Atlas result: bindingConfidence = "unresolved"
 * (docs/05-feature-1-detection-overlay.md §5).
 */
export function ShareButton() {
  const [platform, setPlatform] = useState<(typeof PLATFORMS)[number]>("x");

  return (
    <div className="share-widget">
      <select
        aria-label="공유할 플랫폼"
        value={platform}
        onChange={(event) =>
          setPlatform(event.target.value as (typeof PLATFORMS)[number])
        }
      >
        {PLATFORMS.map((p) => (
          <option key={p} value={p}>
            {p}
          </option>
        ))}
      </select>
      <button
        className="btn btn-ghost"
        onClick={() => gtag("event", `share_${platform}`, { platform })}
      >
        🔗 공유하기
      </button>
    </div>
  );
}
