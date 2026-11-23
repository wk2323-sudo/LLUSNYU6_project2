# DURE 앱 프론트엔드 (LLUS)

동네 가게 사장님끼리 협업 상대를 찾고, AI 도움을 받아 협업을 기획하고, 쿠폰으로 성과를 확인하는 모바일 앱이에요.

이 저장소는 **프론트엔드만** 있어요. 서버 없이 앱 안의 예시 데이터로 모든 화면이 동작하고, 앱을 다시 켜면 처음 상태로 돌아가요.
서버가 붙어야 하는 자리는 코드에 `TODO:` 주석으로 표시해 뒀어요.

- 디자인: [Figma LLUS_DURE · UIUX_wireframe (edited) 페이지](https://www.figma.com/design/s1nLRltcCCJRIni7DOzkZ1/LLUS_DURE?node-id=1232-1752)
- 화면 번호(01~27)는 Figma 프레임 이름과 같아요. 각 화면 파일 첫 줄 주석에 번호가 있어요.

### 백엔드 개발자가 먼저 볼 곳

1. **[서버 연결 지점](#서버-연결-지점)**: 어느 화면의 어떤 동작에 API가 필요한지
2. **[데이터](#데이터)**: 화면이 쓰는 데이터 모양. 코드로는 `src/data.ts`
3. **[아직 정해지지 않은 것](#아직-정해지지-않은-것)**
4. VS Code에서 `TODO:`로 전체 검색(Cmd+Shift+F)하면 연결 지점이 모두 나와요.

---

## 기술 스택

| 역할 | 사용 기술 |
|---|---|
| 언어 | TypeScript |
| 앱 | React Native 0.88, React 19 |
| 실행·빌드 | Expo SDK 58 |
| 화면 이동 | Expo Router (파일 기반 라우팅) |
| 스타일 | NativeWind 4 (Tailwind CSS 3) |
| 아이콘 | @expo/vector-icons (Ionicons) |
| 그 밖에 | react-native-svg (로고·도넛 차트), react-native-qrcode-svg (쿠폰 QR), expo-image-picker (가게 사진), expo-clipboard |
| 개발 환경 | VS Code |

## 실행

필요한 것: Node.js 22.13 이상, 휴대폰의 **Expo Go** 앱(스토어 최신 버전).

```bash
npm install
npx expo start
```

- **휴대폰**: 터미널의 QR 코드를 찍어요 (컴퓨터와 같은 와이파이).
- **브라우저**: 터미널에서 `w`
- 연결이 안 되면 `npx expo start --tunnel`, 설정을 바꿨는데 반영이 안 되면 `npx expo start --clear`

```bash
npm run typecheck   # TypeScript 검사
npm run lint        # ESLint 검사
npx expo install <패키지>   # 패키지 추가 (Expo SDK에 맞는 버전으로)
```

`npm audit fix --force`는 실행하지 마세요. Expo SDK에 맞춰 둔 패키지 버전이 바뀌어 앱이 열리지 않을 수 있어요.

> 이번 버전에서 패키지가 늘었어요. 예전 폴더에 덮어썼다면 `npm install`을 한 번 더 해 주세요.

## 폴더 구조

```
src/
  app/                    화면(라우트). 파일 하나가 화면 하나예요.
    _layout.tsx           루트 스택, 안내 문구(토스트), 상태바
    (tabs)/               하단 탭 4개 (홈 · 탐색 · 협업 · 내 가게)
    tools/                15 AI 도구 (선택 · 만들기 · 생성 중 · 기획서 · 신청서 · 보관함)
    settings/             22~27 설정
  components/
    ui.tsx                공통 부품 (글자, 버튼, 칩, 입력칸, 카드, 시트, 토스트 …)
    TabBar.tsx            떠 있는 알약 모양 하단 탭
    brand.tsx             DURE 로고, 협업 아이콘
    PhoneAuthSheet.tsx    전화번호 인증 시트 (동의 → 인증번호 5자리)
    PhotoSlot.tsx         가게 사진 칸 (사진 보관함에서 고르기)
    collab.tsx            제안서·러브콜 공통 조각
  state/AppContext.tsx    앱 전체 상태 (화면끼리 주고받는 값)
  data.ts                 예시 데이터 (서버가 생기면 API 응답으로 바뀔 자리)
  lib/                    색상, 화면 이동 도우미
```

## 화면 목록

| 번호 | 화면 | 파일 |
|---|---|---|
| 01 | 스플래시 + 전화번호 로그인 시트 | `index.tsx` |
| 01 | 전화번호 인증 (가입 1단계) | `signup.tsx` |
| 01 | 사업자 인증 (2단계) · 인증 대기 | `biz-verify.tsx`, `biz-pending.tsx` |
| 03 | 가게 정보 불러오기 (3단계) + 이 가게가 맞나요? 시트 | `profile-setup.tsx` |
| 03 | 가게를 더 알려주세요 (분위기, 고객층, 사진) | `profile-details.tsx` |
| 05 | 홈 | `(tabs)/home.tsx` |
| 06 · 17 | 탐색: 맞춤 추천 / 모집 게시판 | `(tabs)/explore.tsx` |
| 07 | 가게 프로필 | `store/[id].tsx` |
| 08 | 협업 제안서 | `proposal.tsx` |
| 09 | 요청 완료 | `request-sent.tsx` |
| 10 | 받은 요청 상세 + 수락 확인 · 거절 사유 시트 | `received/[idx].tsx` |
| 11 | 매치 성사 | `match.tsx` |
| 12 | 협업 만들기 | `create.tsx` |
| 12 | AI 협업 아이디어 (이종/동종) · 내 아이디어로 시작하기 | `ideas.tsx` |
| 12_1 | AI 계획 정리 | `plan.tsx` |
| 13 | 협업 쿠폰 QR | `coupon.tsx` |
| 14 | 홍보 콘텐츠 (게시물 · 스토리 · 문구) | `content.tsx` |
| 15 | 협업 워크스페이스 | `workspace.tsx` |
| 15_1~15_8 | 도구 선택 · 만들기 · 생성 중/실패 · 기획서(+경쟁법 경고) · 신청서 · 보관함 | `tools/*.tsx` |
| 16 | 협업 성과 결과 | `results.tsx` |
| 18 | 모집글 상세 | `post/[idx].tsx` |
| 19 | 러브콜 보내기 | `lovecall.tsx` |
| 20 | 협업 탭 (받은 요청 · 보낸 요청 · 진행 · 지난 협업) | `(tabs)/collab.tsx` |
| 21 | 내 가게 | `(tabs)/mystore.tsx` |
| 21_1 | 내 프로필 | `my-profile.tsx` |
| 22~27 | 설정 · 알림 · 비밀번호 · 사업자 인증 정보 · 탈퇴 (+ 로그아웃 확인) | `settings/*.tsx` |

### 주요 흐름

- **가입**: 스플래시 → 가입하기 → 전화번호 → 인증 요청(동의 시트 → 인증번호) → 사업자 인증 → 확인 중(3초) → 가게 정보 불러오기 → 이 가게가 맞나요? → 가게를 더 알려주세요 → 홈
- **로그인**: 스플래시 → 전화번호로 로그인하기 시트 → 인증번호 → 홈
- **요청 보내기**: 탐색/홈 → 가게 프로필 → 협업 요청 보내기 → 제안서 → 요청 완료 → 협업 탭(보낸 요청)
- **러브콜**: 탐색 > 모집 게시판 → 모집글 → 러브콜 보내기 → 요청 완료
- **요청 받기**: 협업 탭 → 받은 요청 → (항목 꾹 눌러 킵) → 수락하기 → 매치 성사 → 아이디어 / 쿠폰 / 성과 / 협업 바로 가기
- **협업 만들기**: 협업 탭 > 협업 만들기 → AI 추천 또는 직접 입력 → AI 계획 정리 → 제안서
- **AI 도구**: 진행 중인 협업 → 워크스페이스 → 새로운 도구 만들기 → 도구 선택 → 만들기 → 생성 중 → 기획서 → 파트너에게 검토 요청 → 보관함

## 서버 연결 지점

| 화면 | 동작 | 필요한 것 |
|---|---|---|
| 01 | 인증번호 보내기·확인 | Supabase Auth 전화번호 OTP (`PhoneAuthSheet.tsx`) |
| 01 | 사업자 정보 확인 | 국세청 사업자 상태조회 (`biz-pending.tsx`) |
| 03 | 가게 검색 | 네이버 지역 검색 (`profile-setup.tsx`) |
| 03 | 프로필 저장 | 가게 프로필 저장 + 사진 업로드 (`profile-details.tsx`) |
| 05, 06 | 추천 파트너, 업종·검색어 필터 | 추천 API |
| 08, 19 | 제안서·러브콜 초안, 보내기 | AI 초안 + 요청 보내기 (러브콜은 같은 요청에 `via=lovecall`) |
| 10 | 수락(킵한 항목 포함) · 거절(사유 포함) | 요청 응답 API |
| 12, 12_1 | 아이디어 추천, 계획 정리, 섹션 다시 만들기 | AI API |
| 13 | 쿠폰 발급 (코드·링크·기간) | 쿠폰 API |
| 15 | 도구 생성, 상태(초안·검토 중·확정), 경쟁법 문구 판별 | AI 도구 API + 서버 규칙 |
| 16 | 성과 숫자 | 쿠폰 사용·QR 스캔·방문 고객·유입 경로 집계 |
| 20 | 협업 목록 | 받은/보낸 요청, 매치, 진행 중, 지난 협업 |
| 22~27 | 알림 설정, 비밀번호, 로그아웃, 탈퇴 | 계정 API |

## 데이터

화면이 쓰는 예시 데이터와 모양은 모두 `src/data.ts`에 있어요. 주요 묶음:

- 가게 `Store`, 내 가게 `MY_STORE`, 모집글 `Post`, 받은 요청 `ReceivedRequest`
- 협업 탭 목록 (`SAMPLE_SENT`, `MATCHES`, `IN_PROGRESS`, `PAST_COLLABS`)
- 아이디어·계획 (`METHODS_CROSS`, `METHODS_SAME`, `PLAN_SECTIONS`)
- 워크스페이스·도구 (`PROJECT`, `TOOLS`, `TOOLS_BY_TYPE`, `GENERATED_PLAN`, `TOOLBOX`)
- 홍보 콘텐츠, 쿠폰 `COUPON`, 성과 `RESULTS`, 알림 설정, 탈퇴 사유

## 디자인 토큰 (DURE)

`tailwind.config.js`와 `src/lib/colors.ts`에 같은 값이 있어요.

| 이름 | 값 | 쓰임 |
|---|---|---|
| charcoal | #47423e | 버튼, 제목, 선택된 상태 |
| pressed | #2a2623 | 버튼 눌림 |
| sand | #dcd5cd | 테두리, 지난 값, 선택된 탭 바탕 |
| cream | #f4f1ee | 연한 바탕 |
| line | #e8e3dd | 구분선, 카드 테두리 |
| sub / mid | #6f6862 / #a39b92 | 보조 글자 |
| yellow / yellow-soft | #ffec9f / #fff5ce | 강조·AI (위 글자는 차콜만) |

글자 크기: 큰 제목 24 Bold · 제목 16 Bold · 본문 15 · 캡션 12. Figma는 Noto Sans KR이고, 앱은 지금 기기 기본 글꼴을 써요. 같은 글꼴을 쓰려면 `expo-font`로 Noto Sans KR을 넣으면 돼요.

## 아직 정해지지 않은 것

- **비밀번호 변경(24)**: 로그인이 전화번호 인증 방식이라 비밀번호가 없어요. 화면은 Figma대로 두었는데, 뺄지 다른 기능으로 바꿀지 정해야 해요.
- 받은 요청의 '킵' 항목을 수락 후 어디서 보여줄지 (Figma에는 "협업 상세에서 이어서 이야기해요"만 있어요)
- 경쟁법 경고 판별 기준 (지금은 `PRICE_FIXING` 정규식으로 흉내만 내요)

## Figma와 다른 점

- **스플래시 사진**: Figma 서버에서 이미지를 받을 수 없어 차콜 배경 + 로고로 대신했어요. Figma에서 사진을 내보내 `assets/images/splash.jpg`로 넣고 `src/app/index.tsx`의 `SPLASH_PHOTO`를 바꾸면 사진이 나와요.
- 03-5(다른 안)는 만들지 않고 03-4를 썼어요.
- Figma에서 이름이 "버튼"인 보조 버튼은 화면 설명에 맞춰 이름을 붙였어요 (예: 저장하기, 도구 없이 계속하기, 다시 정리하기, 문구 복사하기, 링크 복사).
- 매치 성사의 **협업 바로 가기**는 협업 탭의 '진행'으로 가요. 진행 목록을 누르면 워크스페이스가 열려요.
- 15_3 생성 실패 화면은 `tools/generating.tsx`의 `SIMULATE_FAILURE`를 `true`로 바꾸면 볼 수 있어요.
- 15_7 경쟁법 경고는 기획서의 구성 상품을 직접 수정해서 "가격", "할인율", "같은 금액" 같은 말을 넣고 저장하면 떠요.
- 성과 화면(16)은 탭바 없이 열려요.
