import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { initGoogleAnalytics } from "./analytics/ga";
import { initMixpanel } from "./analytics/mixpanel";
import "./index.css";
import App from "./App.tsx";

initGoogleAnalytics();
initMixpanel();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
