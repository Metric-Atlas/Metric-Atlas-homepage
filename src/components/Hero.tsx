import { CoffeeButton } from "./actions/CoffeeButton";
import { ContactLink } from "./actions/ContactLink";

export function Hero() {
  return (
    <section className="hero">
      <div className="container hero-inner">
        <p className="eyebrow">오픈소스 · React · Vite</p>
        <h1>
          코드에 있는 이벤트와
          <br />
          실제 GA4 데이터를 <span className="highlight">자동으로 대조</span>
          하세요
        </h1>
        <p className="hero-subtitle">
          Metric Atlas는 GA4 대시보드를 다시 만드는 도구가 아닙니다. 코드에는
          무엇이 구현되어 있고, 실제 분석 데이터에는 무엇이 관측되는지를
          자동으로 대조해 Analytics Health를 보여주는 개발 도구입니다.
        </p>
        <div className="hero-actions">
          <ContactLink />
          <CoffeeButton />
        </div>
      </div>
    </section>
  );
}
