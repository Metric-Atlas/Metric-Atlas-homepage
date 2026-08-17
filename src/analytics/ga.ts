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
 * Standard GA4 gtag.js bootstrap. When VITE_GA_MEASUREMENT_ID is not set,
 * gtag() still runs (pushes to window.dataLayer) but the remote script is
 * never loaded, so no data leaves the browser — useful for Metric Atlas
 * static-detection testing without a real GA4 property.
 */
export function initGoogleAnalytics() {
  window.dataLayer = window.dataLayer || [];
  (globalThis as { gtag?: typeof gtag }).gtag = (...args: unknown[]) => {
    window.dataLayer.push(args);
  };

  gtag("js", new Date());
  gtag("config", GA_MEASUREMENT_ID ?? "G-DEMOMODE", {
    send_page_view: Boolean(GA_MEASUREMENT_ID),
  });

  if (!GA_MEASUREMENT_ID) {
    console.info(
      "[Metric Atlas Demo] VITE_GA_MEASUREMENT_ID is not set — gtag() calls are logged locally only.",
    );
    return;
  }

  const script = document.createElement("script");
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
  document.head.appendChild(script);
}

export const isGaConfigured = Boolean(GA_MEASUREMENT_ID);
