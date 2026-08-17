import { isGaConfigured } from "../analytics/ga";
import { isMixpanelConfigured } from "../analytics/mixpanel";

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-inner">
        <p>Metric Atlas Test Project — GA4 / Mixpanel 연동 데모 페이지</p>
        <p className="footer-status">
          GA4: {isGaConfigured ? "연결됨" : "데모 모드 (콘솔 로그만)"} · Mixpanel:{" "}
          {isMixpanelConfigured ? "연결됨" : "데모 모드 (콘솔 로그만)"}
        </p>
      </div>
    </footer>
  );
}
