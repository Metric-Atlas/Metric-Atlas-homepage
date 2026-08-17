/**
 * Detection pattern: GTM direct call (dataLayer.push), inline handler on a
 * native <a>. Expected Metric Atlas result: emitter=gtm,
 * provider=unknown (GTM container internals aren't resolved statically).
 */
export function CoffeeButton() {
  return (
    <a
      className="btn btn-ghost"
      href="https://www.buymeacoffee.com/metric-atlas"
      target="_blank"
      rel="noreferrer"
      onClick={() =>
        window.dataLayer.push({
          event: "coffee_click",
          amount_suggested: 5,
          currency: "USD",
        })
      }
    >
      ☕ 개발자에게 커피 사주기
    </a>
  );
}
