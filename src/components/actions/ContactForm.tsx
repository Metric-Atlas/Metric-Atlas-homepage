import { useState, type FormEvent } from "react";

/**
 * Detection pattern: GTM direct call on a native <form> element's
 * onSubmit. Mirrors fixtures/mock-manifest.json's LeadForm.tsx example
 * (event=lead_submit, param=form_type). Expected Metric Atlas result:
 * emitter=gtm, bindingConfidence=exact, element type=form.
 */
export function ContactForm() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    window.dataLayer.push({
      event: "lead_submit",
      form_type: "newsletter",
    });

    setSubmitted(true);
  }

  return (
    <form className="contact-form" onSubmit={handleSubmit}>
      <label htmlFor="email">뉴스레터 구독</label>
      <div className="contact-form-row">
        <input
          id="email"
          name="email"
          type="email"
          placeholder="you@example.com"
          required
        />
        <button className="btn btn-primary" type="submit">
          구독하기
        </button>
      </div>
      {submitted && <p className="contact-form-success">구독해주셔서 감사합니다!</p>}
    </form>
  );
}
