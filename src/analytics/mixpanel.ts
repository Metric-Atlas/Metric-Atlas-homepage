import mixpanel from "mixpanel-browser";

const MIXPANEL_TOKEN = import.meta.env.VITE_MIXPANEL_TOKEN as
  | string
  | undefined;

export const isMixpanelConfigured = Boolean(MIXPANEL_TOKEN);

export function initMixpanel() {
  if (!MIXPANEL_TOKEN) {
    console.info(
      "[Metric Atlas Demo] VITE_MIXPANEL_TOKEN is not set — mixpanel.track() calls are logged locally only.",
    );
    return;
  }

  mixpanel.init(MIXPANEL_TOKEN, {
    track_pageview: true,
    persistence: "localStorage",
  });
}

export { mixpanel };
