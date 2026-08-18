# Analytics Event Catalog

이 문서는 코드에 실제로 심어진 모든 GA4 / GTM / Mixpanel 호출을 정리한 것입니다.
각 이벤트는 `docs/05-feature-1-detection-overlay.md`(Metric-Atlas)에 정의된 탐지
패턴 중 하나를 의도적으로 대표하도록 구현되어 있습니다.

## 초기화 (자동 발생)

| 위치 | 내용 |
|---|---|
| `src/analytics/ga.ts` | 앱 로드 시 `gtag("js", new Date())`, `gtag("config", <측정ID>, { send_page_view: true })` 호출. GA4 자동 수집(page_view, session_start 등)의 기준점. |
| `src/analytics/mixpanel.ts` | `mixpanel.init(token, { track_pageview: true, ... })` — 초기화와 동시에 Mixpanel이 페이지뷰를 자동 전송. 코드에 `mixpanel.track(...)` 직접 호출이 없어도 발생하는 이벤트라 Event Overlay 탐지 대상이 아님. |

## 사용자 액션 이벤트

| # | 이벤트명 | Provider | 파일 | 트리거 | 파라미터 | 탐지 패턴 |
|---|---|---|---|---|---|---|
| 1 | `nav_click` | GA4 | `src/components/Header.tsx` (9, 15, 21, 30행) | 헤더 메뉴 4개(`기능`/`빠른 체험`/`커뮤니티`/`GitHub`) 클릭 | `section: "features" \| "quickstart" \| "community" \| "github"` | 인라인 핸들러, `gtag()` 직접 호출 → **exact** |
| 2 | `contact_click` | GA4 | `src/components/actions/ContactLink.tsx:11` | "문의하기" 클릭 | `method: "email"`, `location: "hero"` | 인라인 핸들러, `gtag()` 직접 호출 → **exact** |
| 3 | `coffee_click` | GTM | `src/components/actions/CoffeeButton.tsx:14` | "커피 사주기" 클릭 | `amount_suggested: 5`, `currency: "USD"` | 인라인 핸들러, `dataLayer.push()` 직접 호출 → **exact** (emitter=gtm, provider=unknown) |
| 4 | `pr_click` | Mixpanel | `src/components/actions/PrButton.tsx:18` | "PR 올리기" 클릭 | `source: "community_actions"` | Metric Atlas MVP 미지원 Provider — **탐지되지 않는 게 정상** |
| 5 | `issue_click` | GA4 | `src/components/actions/IssueButton.tsx:8` | "이슈 등록하기" 클릭 | `repo: "metric-atlas/metric-atlas"` | 같은 파일의 handler 참조(`handleIssueClick`)로 호출 → **inferred/exact** (인라인이 아닌 참조 바인딩) |
| 6 | `star_click` | GA4 | `src/components/actions/StarButton.tsx:10` | "GitHub에 Star 주기" 클릭 | `location: "community_actions"` | `trackEvent()` 래퍼가 내부에서 `gtag()` 호출, JSX는 `trackEvent(...)`만 호출 → Metric Atlas MVP **미지원 래퍼 패턴** (경고 대상) |
| 7 | `share_${platform}` | GA4 | `src/components/actions/ShareButton.tsx:30` | "공유하기" 클릭 (드롭다운으로 선택된 플랫폼) | `platform: "x" \| "linkedin" \| "reddit"` | 이벤트명이 런타임 값(template literal)으로 결정됨 → **unresolved** |
| 8 | `sponsor_click` | GA4 | `src/components/actions/SponsorButton.tsx:13` | "스폰서 하기" 클릭 | `tier: "monthly"` | 대문자 Custom Component(`<SponsorButton/>`) 내부에서 발생 → **overlaySupported=false** |
| 9 | `lead_submit` | GTM | `src/components/actions/ContactForm.tsx:15` | 뉴스레터 구독 폼 제출 | `form_type: "newsletter"` | 네이티브 `<form onSubmit>` + `dataLayer.push()` 직접 호출 → **exact**, element type=form |

## 요약

- **GA4 direct (`gtag`)**: #1, #2, #5, #6(래퍼 내부), #7, #8 — 6개 사이트
- **GTM direct (`dataLayer.push`)**: #3, #9 — 2개 사이트
- **Mixpanel (`mixpanel.track`)**: #4 — 1개 사이트, Metric Atlas MVP 범위 밖
- **의도적으로 미지원/특이 케이스로 설계된 것**: #4(Provider 미지원), #6(래퍼), #7(동적 이벤트명), #8(Custom Component)

## 실제 전송 확인 방법

1. 브라우저 개발자도구 → Network 탭 → `collect`(GA4) 또는 `mixpanel`(Mixpanel)로 필터
2. 버튼 클릭 → 요청이 200/204로 나가는지 확인 (광고 차단 확장 프로그램이 있으면
   `net::ERR_BLOCKED_BY_CLIENT`로 막힐 수 있으니 끄고 테스트)
3. GA4 관리 → 실시간(Realtime) 보고서, Mixpanel → Live View에서 이벤트명 확인
