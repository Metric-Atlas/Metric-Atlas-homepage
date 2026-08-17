export function Header() {
  return (
    <header className="site-header">
      <div className="container site-header-inner">
        <span className="logo">🗺️ Metric Atlas</span>
        <nav className="site-nav">
          <a
            href="#features"
            onClick={() => gtag("event", "nav_click", { section: "features" })}
          >
            기능
          </a>
          <a
            href="#quickstart"
            onClick={() => gtag("event", "nav_click", { section: "quickstart" })}
          >
            빠른 체험
          </a>
          <a
            href="#community"
            onClick={() => gtag("event", "nav_click", { section: "community" })}
          >
            커뮤니티
          </a>
          <a
            className="btn btn-outline"
            href="https://github.com/metric-atlas/metric-atlas"
            target="_blank"
            rel="noreferrer"
            onClick={() => gtag("event", "nav_click", { section: "github" })}
          >
            GitHub
          </a>
        </nav>
      </div>
    </header>
  );
}
