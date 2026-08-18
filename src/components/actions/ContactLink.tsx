/**
 * Detection pattern: GA4 direct call, inline handler on a native <a>.
 * Expected Metric Atlas result: emitter=ga4, provider=ga4, binding=exact.
 */
export function ContactLink() {
  return (
    <a
      className="btn btn-primary"
      href="mailto:limgh2002@gmail.com"
      onClick={() =>
        gtag("event", "contact_click", { method: "email", location: "hero" })
      }
    >
      문의하기
    </a>
  );
}
