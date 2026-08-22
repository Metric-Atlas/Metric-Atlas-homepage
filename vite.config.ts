import { defineConfig, type PluginOption } from 'vite'
import react from '@vitejs/plugin-react'

// Metric Atlas 연동. METRIC_ATLAS_ENABLED=true일 때만 활성화되며, 평소
// 빌드는 이 블록의 영향을 받지 않는다. Vercel에서는 Preview 환경에만
// METRIC_ATLAS_ENABLED=true를 등록해서 production 빌드에 영향이 없다.
async function metricAtlasPlugin(): Promise<PluginOption[]> {
  if (process.env.METRIC_ATLAS_ENABLED !== 'true') return []
  const { default: metricAtlas } = await import('@metric-atlas/vite')
  return [metricAtlas({ enabled: true, overlay: { enabled: true } })]
}

// https://vite.dev/config/
export default defineConfig(async () => ({
  plugins: [...(await metricAtlasPlugin()), react()],
}))
