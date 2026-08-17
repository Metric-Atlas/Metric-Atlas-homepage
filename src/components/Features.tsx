const FEATURES = [
  {
    icon: "🔍",
    title: "Event Overlay",
    body: "빌드 시 AST를 분석해 gtag, sendGAEvent, dataLayer.push 패턴을 찾고, 빌드 결과에서만 화면 요소에 data-atlas-id를 주입합니다.",
  },
  {
    icon: "🩺",
    title: "Analytics Health Dashboard",
    body: "코드에는 있지만 GA4에서 관측되지 않는 이벤트, GA4에는 있지만 코드에서 발견되지 않는 이벤트를 한 화면에서 대조합니다.",
  },
  {
    icon: "💬",
    title: "Natural Language Query",
    body: "사내 LLM 또는 OpenAI 호환 LLM을 연결하면 이벤트와 GA4 결과를 자연어로 조회할 수 있습니다. Core MVP의 Release Blocker는 아닙니다.",
  },
  {
    icon: "📝",
    title: "PR Analytics Change Report",
    body: "GitHub Actions에서 Base/Head 커밋을 스캔해 추가·삭제된 이벤트와 Provider 변경 내역을 PR 코멘트로 전달합니다.",
  },
];

export function Features() {
  return (
    <section id="features" className="features">
      <div className="container">
        <h2>핵심 기능</h2>
        <div className="feature-grid">
          {FEATURES.map((feature) => (
            <article className="feature-card" key={feature.title}>
              <span className="feature-icon">{feature.icon}</span>
              <h3>{feature.title}</h3>
              <p>{feature.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
