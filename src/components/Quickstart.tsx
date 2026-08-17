export function Quickstart() {
  return (
    <section id="quickstart" className="quickstart">
      <div className="container">
        <h2>빠른 체험</h2>
        <p>API Key 없이 Demo Fixture로 Event Overlay와 Analytics Health UI를 체험할 수 있습니다.</p>
        <pre className="code-block">
          <code>{`pnpm install\npnpm demo`}</code>
        </pre>
      </div>
    </section>
  );
}
