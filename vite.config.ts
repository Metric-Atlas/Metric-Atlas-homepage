import { defineConfig, type PluginOption } from 'vite'
import react from '@vitejs/plugin-react'

// Metric Atlas 연동. METRIC_ATLAS_ENABLED=true일 때만 활성화되며, 평소
// 빌드는 이 블록의 영향을 받지 않는다. @metric-atlas/vite와 그 의존 패키지는
// vendor/metric-atlas 아래 빌드 산출물로 커밋돼 있어(devDependencies의
// file: 참조) 별도 sibling 체크아웃 없이 어떤 빌드 환경에서도 동작한다.
async function metricAtlasPlugin(): Promise<PluginOption[]> {
  if (process.env.METRIC_ATLAS_ENABLED !== 'true') return []
  const { default: metricAtlas } = await import('@metric-atlas/vite')
  return [metricAtlas({ enabled: true, overlay: { enabled: true } })]
}

// https://vite.dev/config/
export default defineConfig(async () => ({
  plugins: [...(await metricAtlasPlugin()), react()],
}))
