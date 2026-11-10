
## 폴더 구조

```
src/
  app/                     화면(라우트). 파일 하나가 화면 하나예요.
    _layout.tsx            루트 스택, 안내 문구(토스트), 상태바
    index.tsx              01 스플래시
    signup.tsx login.tsx   01 가입 · 로그인
    biz-verify.tsx         02 사업자 인증
    profile-setup.tsx      03 프로필 설정 1 (내 가게 > 프로필 수정에서도 사용)
    profile-setup-2.tsx    04 프로필 설정 2
    (tabs)/                하단 탭 4개
      _layout.tsx          탭 내비게이터
      home.tsx             05 홈
      explore.tsx          06 AI 추천 · 17 모집 게시판
      collab.tsx           20 협업 탭 (받은 요청 · 보낸 요청 · 진행 · 지난 협업)
      mystore.tsx          21 내 가게
    store/[id].tsx         07 가게 프로필
    request.tsx            08 협업 요청 보내기
    request-sent.tsx       09 요청 완료
    received/[idx].tsx     10 받은 요청 상세
    match.tsx              11 매치 성사
    ideas.tsx              12 AI 협업 아이디어 · 협업 방향 직접 설정
    coupon.tsx             13 협업 쿠폰
    content.tsx            14 홍보 콘텐츠 (게시물 · 스토리 · 문구)
    collab-detail.tsx      15 협업 상세
    results.tsx            16 협업 성과
    post/[idx].tsx         18 모집글 상세
    lovecall.tsx           19 러브콜 보내기
    settings/              22 설정 · 23 알림 · 24 비밀번호 · 25 사업자 정보 · 26 로그아웃 · 27 회원 탈퇴
  components/
    ui.tsx                 공통 컴포넌트 (Screen, Header, CtaBar, Button, Chip, Field, Card, Txt …)
    TabBar.tsx             하단 탭바
  state/AppContext.tsx     화면끼리 주고받는 앱 상태
  data.ts                  예시 데이터와 타입
  lib/nav.ts               화면 이동 도우미 (resetTo, goTab, goBack, copyText)
  lib/colors.ts            아이콘·스위치용 색상값
  global.css               Tailwind 지시문
tailwind.config.js         색상 토큰 (ink, sub, line, hair, fill, brand)
```


## 화면 목록
 
| 번호 | 화면 | 파일 | 화면에 보여주는 데이터 | 사용자가 하는 동작 |
|---|---|---|---|---|
| A 가입과 온보딩 |||||
| 01 | 스플래시 | `index.tsx` | 없음 | 가입 / 로그인으로 이동 |
| 01 | 회원가입 | `signup.tsx` | 없음 | 이메일, 비밀번호, 약관 동의 입력 |
| 01 | 로그인 | `login.tsx` | 없음 | 이메일, 비밀번호 입력 |
| 02 | 사업자 인증 | `biz-verify.tsx` | 인증 결과, 대표자명, 개업일자 | 사업자 등록번호 인증 |
| 03 | 프로필 설정 1 | `profile-setup.tsx` | 내 가게 프로필 (수정할 때) | 가게 이름, 업종, 고객층, 영업 요일·시간 입력 |
| 04 | 프로필 설정 2 | `profile-setup-2.tsx` | AI 한 줄 소개 | 분위기, 사진 1~3장, 인스타그램 링크 입력 |
| 05 | 홈 | `(tabs)/home.tsx` | 추천 파트너 2곳, 새 모집글 1개, 동네 소식 | 가게·모집글 열기 |
| B 추천에서 매치까지 |||||
| 06 | AI 추천 파트너 | `(tabs)/explore.tsx` | 추천 가게 목록 | 원하는 업종 고르기 |
| 07 | 가게 프로필 | `store/[id].tsx` | 가게 정보, AI 추천 이유 | 협업 요청, 저장 |
| 08 | 협업 요청 보내기 | `request.tsx` | 받는 가게, AI 요청 메시지 초안 | 메시지 수정, 협업 유형·희망 시기 선택 후 보내기 |
| 09 | 요청 완료 | `request-sent.tsx` | 방금 보낸 요청 요약 | 협업 탭으로 이동 |
| 10 | 받은 요청 상세 | `received/[idx].tsx` | 보낸 가게, 메시지, 유형, 시기, AI 적합도 요약 | 수락 / 거절 |
| 11 | 매치 성사 | `match.tsx` | 매치된 가게 | 협업 아이디어 보기 |
| C 모집 게시판과 러브콜 |||||
| 17 | 모집 게시판 | `(tabs)/explore.tsx` | 모집글 목록 (업종 필터) | 모집글 열기 |
| 18 | 모집글 상세 | `post/[idx].tsx` | 모집글 내용, 기간, 러브콜 수 | 러브콜 보내기, 저장 |
| 19 | 러브콜 보내기 | `lovecall.tsx` | 모집글, AI 메시지 초안 | 유형·시기 선택 후 보내기 (협업 요청과 같은 흐름) |
| D 협업 탭과 내 가게 |||||
| 20 | 협업 탭 | `(tabs)/collab.tsx` | 받은 요청, 보낸 요청, 매치, 진행 중, 지난 협업 | 요청·매치·협업 열기 |
| 21 | 내 가게 | `(tabs)/mystore.tsx` | 내 프로필, 진행·완료·쿠폰 사용 수, 협업 이력, 저장 목록 | 프로필 수정, 설정 |
| E 아이디어에서 성과까지 |||||
| 12 | AI 협업 아이디어 / 직접 설정 | `ideas.tsx` | AI 아이디어 목록 | 아이디어 고르기, 또는 유형·목표·세부 내용·시기 직접 입력 |
| 13 | 협업 쿠폰 | `coupon.tsx` | 쿠폰 이름, 기간, 사용처, QR, 쿠폰 코드 | 쿠폰 발행 |
| 14 | 홍보 콘텐츠 | `content.tsx` | 게시물 문구, 스토리 구성, 말투별 문구, 해시태그, 쿠폰 링크 | 문구 복사, 다시 쓰기 |
| 15 | 협업 상세 | `collab-detail.tsx` | 진행 단계, QR 스캔·쿠폰 사용 수 | 성과 보기 |
| 16 | 협업 성과 | `results.tsx` | 전후 방문 비교, 신규 고객 출처, 일별 추이, AI 요약 | 없음 |
| F 설정 |||||
| 22 | 설정 | `settings/index.tsx` | 앱 버전 | 각 설정으로 이동, 로그아웃 |
| 23 | 알림 설정 | `settings/notifications.tsx` | 알림 6종 켜짐/꺼짐 | 켜고 끄기 |
| 24 | 비밀번호 변경 | `settings/password.tsx` | 없음 | 현재·새 비밀번호 입력 |
| 25 | 사업자 인증 정보 | `settings/biz-info.tsx` | 등록번호(가림), 대표자명, 개업일자, 업종 | 다시 인증하기 (02 화면 재사용) |
| 26 | 로그아웃 확인 | `settings/index.tsx` 안의 확인 창 | 없음 | 로그아웃 |
| 27 | 회원 탈퇴 | `settings/leave.tsx` | 없음 | 탈퇴 이유 선택, 확인 후 탈퇴 |
 
