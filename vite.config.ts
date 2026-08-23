import { defineConfig, type PluginOption } from 'vite'
import react from '@vitejs/plugin-react'

// Metric Atlas 연동. METRIC_ATLAS_ENABLED=true일 때만 활성화되며, 평소
// 빌드는 이 블록의 영향을 받지 않는다. Vercel에서는 Preview 환경에만
// METRIC_ATLAS_ENABLED=true를 등록해서 production 빌드에 영향이 없다.
async function metricAtlasPlugin(): Promise<PluginOption[]> {
  if (process.env.METRIC_ATLAS_ENABLED !== 'true') return []
  const { default: metricAtlas } = await import('@metric-atlas/vite')
  // mixpanel은 기본 비활성 어댑터(DEC-037) — PrButton의 mixpanel.track()을
  // 잡으려면 명시적으로 켜야 한다.
  return [
    metricAtlas({
      enabled: true,
      overlay: { enabled: true },
      detectors: ['ga4', 'gtm', 'mixpanel'],
    }),
  ]
}

// https://vite.dev/config/
export default defineConfig(async () => ({
  plugins: [...(await metricAtlasPlugin()), react()],
}))
