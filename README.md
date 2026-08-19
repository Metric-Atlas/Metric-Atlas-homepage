# Metric Atlas Test Project

Metric Atlas(`../Metric-Atlas`)를 설치해 테스트하기 위한 호스트 앱입니다. "Metric Atlas"라는
오픈소스 프로젝트를 소개하는 랜딩 페이지 형태이며, 문의하기 / 커피 사주기 / PR 올리기 /
이슈 등록하기 / Star 주기 / 스폰서 / 공유하기 / 뉴스레터 구독 버튼에 GA4 · Mixpanel
이벤트를 연결해 두었습니다.

각 버튼은 `docs/05-feature-1-detection-overlay.md`에 정의된 탐지 패턴을 하나씩
커버하도록 의도적으로 다르게 구현했습니다.

| 버튼 | 파일 | 패턴 | 기대 결과 |
|---|---|---|---|
| 문의하기 | `src/components/actions/ContactLink.tsx` | GA4 `gtag()` 인라인 핸들러 | emitter=ga4, binding=exact |
| 커피 사주기 | `src/components/actions/CoffeeButton.tsx` | GTM `dataLayer.push()` 인라인 | emitter=gtm, provider=unknown |
| PR 올리기 | `src/components/actions/PrButton.tsx` | Mixpanel `mixpanel.track()` | MVP 미지원 Provider — 탐지되지 않아야 정상 |
| 이슈 등록하기 | `src/components/actions/IssueButton.tsx` | 같은 파일 handler 참조로 `gtag()` 호출 | binding=inferred/exact (same-file reference) |
| GitHub Star | `src/components/actions/StarButton.tsx` | `trackEvent()` 래퍼가 내부에서 `gtag()` 호출 | MVP 미지원 — wrapper 경고 대상 |
| 스폰서 하기 | `src/components/actions/SponsorButton.tsx` | Custom Component(`<SponsorButton/>`) 내부 이벤트 | overlaySupported=false |
| 공유하기 | `src/components/actions/ShareButton.tsx` | 동적 이벤트명 `` `share_${platform}` `` | binding=unresolved |
| 뉴스레터 구독 | `src/components/actions/ContactForm.tsx` | 네이티브 `<form onSubmit>` + `dataLayer.push()` | element type=form |

## 실행

```bash
npm install
npm run dev
```

## GA4 / Mixpanel 연결 (선택)

키를 넣지 않아도 버튼 클릭 시 이벤트 호출 자체는 실행됩니다(콘솔에 로그만 남고
외부로는 전송되지 않음). Metric Atlas의 **Event Overlay**는 소스 코드를 정적으로
분석하므로 실제 GA4/Mixpanel 계정이 없어도 테스트할 수 있습니다.

실제 GA4/Mixpanel로 데이터를 흘려보내 **Analytics Health Dashboard**까지 검증하려면:

```bash
cp .env.example .env
```

- `VITE_GA_MEASUREMENT_ID` — GA4 속성의 측정 ID (`G-XXXXXXXXXX`). GA4 관리 >
  데이터 스트림에서 확인.
- `VITE_MIXPANEL_TOKEN` — Mixpanel 프로젝트 토큰. Mixpanel > Project Settings >
  Access Keys에서 확인.

> Analytics Health Dashboard가 GA4 실측 데이터를 읽어오려면 이 값들과 별개로,
> **Metric Atlas 쪽**(`../Metric-Atlas`)에 GA4 서비스 계정 자격 증명
> (`GOOGLE_APPLICATION_CREDENTIALS` 또는
> `METRIC_ATLAS_GA4_SERVICE_ACCOUNT_JSON_BASE64`)과 `METRIC_ATLAS_GA4_PROPERTY_ID`를
> 별도로 설정해야 합니다. Mixpanel은 GA4 Data API 대상이 아니므로 Health 대조에는
> 사용되지 않습니다 — 이 프로젝트에서는 "GA4 MVP 패턴 vs. 아직 미지원인 Provider"를
> 비교 테스트하기 위한 용도로만 포함했습니다.

## Metric Atlas 연동 (시연)

패키지가 npm에 publish되기 전까지는 형제 디렉토리의 모노레포 빌드 산출물을 사용합니다.
`METRIC_ATLAS_ENABLED=true`일 때만 활성화되며 **평소 빌드에는 영향이 없습니다.**

```bash
# 0) 선행: 형제 디렉토리에 모노레포 클론 + 빌드 (1회)
#    <parent>/Metric-Atlas-homepage  ← 이 repo
#    <parent>/Metric-Atlas           ← 모노레포
cd ../Metric-Atlas && pnpm install && pnpm build && cd -

# 1) Metric Atlas를 켜서 빌드 → dist + .metric-atlas/manifest.json + data-atlas-id 주입
METRIC_ATLAS_ENABLED=true npm run build

# 2) Runtime으로 서빙 (GA4 env가 있으면 /api/health가 실측 반환)
#    credential 설정은 모노레포 .env.metric-atlas.example 참고
node ../Metric-Atlas/packages/cli/dist/bin.js serve ./dist --port 8787
# → http://127.0.0.1:8787 (홈페이지 + Overlay 런처)

# 3) Dashboard (모노레포에서)
METRIC_ATLAS_RUNTIME_ORIGIN=http://127.0.0.1:8787 pnpm --filter @metric-atlas/demo-react-vite dev
# → http://localhost:5180
```

모노레포가 다른 경로에 있다면 `METRIC_ATLAS_PLUGIN_PATH`로 플러그인 산출물 경로를 지정합니다.

```bash
METRIC_ATLAS_ENABLED=true METRIC_ATLAS_PLUGIN_PATH=/path/to/Metric-Atlas/packages/vite/dist/index.js npm run build
```

> npm publish 이후에는 이 동적 로드 대신 `@metric-atlas/vite` devDependency 설치로 전환합니다 (Phase 6 OSS Release에서 결정).
