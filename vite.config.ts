import { defineConfig, type PluginOption } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'node:path'
import { pathToFileURL } from 'node:url'

// Metric Atlas 연동 (사내 시연용).
// 패키지가 npm publish 되기 전까지는 형제 디렉토리에 클론된 Metric-Atlas
// 모노레포의 빌드 산출물을 동적으로 불러온다. METRIC_ATLAS_ENABLED=true일
// 때만 활성화되며, 평소 빌드는 이 블록의 영향을 받지 않는다.
// 연동 방법: README "Metric Atlas 연동" 섹션 참고.
async function metricAtlasPlugin(): Promise<PluginOption[]> {
  if (process.env.METRIC_ATLAS_ENABLED !== 'true') return []
  const pluginPath =
    process.env.METRIC_ATLAS_PLUGIN_PATH ??
    path.resolve(import.meta.dirname, '../Metric-Atlas/packages/vite/dist/index.js')
  const { default: metricAtlas } = await import(pathToFileURL(pluginPath).href)
  return [metricAtlas({ enabled: true, overlay: { enabled: true } })]
}

// https://vite.dev/config/
export default defineConfig(async () => ({
  plugins: [...(await metricAtlasPlugin()), react()],
}))
