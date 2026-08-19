declare global {
  interface Window {
    dataLayer: unknown[];
  }
  // Matches the official gtag.js snippet: a bare global `gtag` identifier,
  // not `window.gtag`. This mirrors the call shape Metric Atlas's detector
  // looks for (`gtag("event", ...)`), not a namespaced access.
  function gtag(...args: unknown[]): void;
}

const GA_MEASUREMENT_ID = import.meta.env.VITE_GA_MEASUREMENT_ID as
  | string
  | undefined;

/**
 * Standard GA4 gtag.js bootstrap.
 *
 * IMPORTANT: the shim below must stay a `function` declaration that pushes
 * `arguments`. gtag.js only interprets a dataLayer entry as a command
 * (`js` / `config` / `event`) when that entry is an Arguments object —
 * `Object.prototype.toString.call(entry) === "[object Arguments]"`. A
 * rest-parameter arrow function (`(...args) => dataLayer.push(args)`) pushes a
 * plain Array instead, which gtag.js silently ignores, so every command is
 * dropped and nothing is ever sent to GA4. Do not "modernise" this.
 *
 * When VITE_GA_MEASUREMENT_ID is not set, gtag() still runs (queueing onto
 * window.dataLayer) but the remote script is never loaded, so no data leaves
 * the browser — useful for Metric Atlas static-detection testing without a
 * real GA4 property.
 */
export function initGoogleAnalytics() {
  window.dataLayer = window.dataLayer || [];

  function gtagShim() {
    // eslint-disable-next-line prefer-rest-params
    window.dataLayer.push(arguments);
  }

  (globalThis as { gtag?: unknown }).gtag = gtagShim;

  if (GA_MEASUREMENT_ID) {
    // Load gtag.js before issuing commands, matching the official snippet
    // order. Queued dataLayer entries are replayed once the script boots.
    const script = document.createElement("script");
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
    document.head.appendChild(script);
  } else {
    // console.warn (not .info) so a misconfigured deploy is visible: Vite
    // inlines import.meta.env at BUILD time, so a VITE_GA_MEASUREMENT_ID added
    // to the hosting provider after a build only takes effect on redeploy.
    console.warn(
      "[Metric Atlas] VITE_GA_MEASUREMENT_ID is not set — gtag.js was not loaded and no data will reach GA4. gtag() calls are queued on window.dataLayer only.",
    );
  }

  gtag("js", new Date());
  gtag("config", GA_MEASUREMENT_ID ?? "G-DEMOMODE", {
    send_page_view: Boolean(GA_MEASUREMENT_ID),
  });
}

export const isGaConfigured = Boolean(GA_MEASUREMENT_ID);
