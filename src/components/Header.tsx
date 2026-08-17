export function Header() {
  return (
    <header className="site-header">
      <div className="container site-header-inner">
        <span className="logo">🗺️ Metric Atlas</span>
        <nav className="site-nav">
          <a href="#features">기능</a>
          <a href="#quickstart">빠른 체험</a>
          <a href="#community">커뮤니티</a>
          <a
            className="btn btn-outline"
            href="https://github.com/metric-atlas/metric-atlas"
            target="_blank"
            rel="noreferrer"
          >
            GitHub
          </a>
        </nav>
      </div>
    </header>
  );
}
