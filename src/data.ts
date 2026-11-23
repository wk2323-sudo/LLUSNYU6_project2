

/* ---------- 가게 ---------- */

export type StoreId = 'gyeol' | 'moa' | 'hyang' | 'tarot' | 'pong' | 'ondo' | 'dal' | 'book';

export type Store = {
  id: StoreId;
  name: string;
  short: string; // 동그란 로고 자리에 들어가는 짧은 이름
  cat: string; // 업종
  area: string; // 동네
  walk: string; // 내 가게에서 걸리는 시간
  reasonTag: string; // 추천 목록에 붙는 근거 태그
  desc: string; // 한 줄 소개
  moods: string[]; // 분위기 태그
  interests: string[]; // 협업 관심 분야
  interestNote: string;
  target: string; // 주요 고객층
  location: string;
  matches: { title: string; desc: string }[]; // AI가 찾은 잘 맞는 이유
  history: string | null; // 협업 이력 (없으면 null)
};

export const MY_STORE = {
  name: '성수 봄빵 베이커리',
  short: '봄빵',
  cat: '베이커리',
  area: '성수동',
  address: '서울 성동구 성수이로 00',
  intro: '빵 냄새로 아침을 여는 성수동 동네 베이커리',
  moods: ['아늑한', '핸드메이드', '선물 중심'],
  interests: ['시즌 한정 상품', '공동 프로모션', '팝업'],
  interestNote: '다른 가게와 한정 상품을 함께 기획하고 싶어요.',
  target: '20~30대 선물 구매 고객',
  location: '서울 성동구',
};

const matchesFor = (partnerCat: string, note: string) => [
  { title: '서로 보완할 수 있는 업종', desc: `베이커리와 ${partnerCat}은 선물 세트나 공동 프로모션을 기획해 볼 수 있어요.` },
  { title: '비슷한 고객 이용 목적', desc: note },
  { title: '가까운 지역', desc: '두 가게 모두 성수동에 있어 함께 방문하는 이벤트를 고려할 수 있어요.' },
];

export const STORES: Record<StoreId, Store> = {
  gyeol: {
    id: 'gyeol', name: '가죽공방 결', short: '결', cat: '공방', area: '성수동', walk: '도보 4분', reasonTag: '겹치는 고객층',
    desc: '가죽 소품과 키링을 직접 만드는 작은 공방', moods: ['아늑한', '핸드메이드', '체험 가능'],
    interests: ['시즌 한정 상품', '공동 체험', '선물 세트'], interestNote: '먹거리와 어울리는 소품 패키지를 만들어 보고 싶어요.',
    target: '20~30대 커플', location: '서울 성동구',
    matches: matchesFor('공방', '두 가게 모두 선물과 데이트 목적의 고객을 주요 대상으로 입력했어요.'), history: null,
  },
  moa: {
    id: 'moa', name: '꽃집 모아', short: '모아', cat: '꽃집', area: '성수동', walk: '도보 6분', reasonTag: '지난 수락 이력 있음',
    desc: '일상에 오래 남는 작은 순간을 만드는 플라워 스튜디오', moods: ['차분한', '감성적인', '선물 중심'],
    interests: ['시즌 한정 상품', '공동 프로모션', '팝업'], interestNote: '다른 지역 브랜드와 특별한 선물 상품을 기획하고 싶어요.',
    target: '20~30대 선물 구매 고객', location: '서울 성동구',
    matches: matchesFor('플라워샵', '두 가게 모두 선물 구매 목적의 고객을 주요 대상으로 입력했어요.'), history: '카페 온도와 꽃 한 송이 이벤트 · 3월',
  },
  hyang: {
    id: 'hyang', name: '향수 공방 향기로움', short: '향기', cat: '공방', area: '성수동', walk: '도보 9분', reasonTag: '모집글 열림',
    desc: '나만의 향을 만드는 원데이 클래스 공방', moods: ['조용한', '감성적인', '체험 가능'],
    interests: ['공동 체험', '팝업'], interestNote: '체험 클래스와 어울리는 간식을 함께 준비하고 싶어요.',
    target: '20~30대 여성', location: '서울 성동구',
    matches: matchesFor('향수 공방', '두 가게 모두 주말 나들이 고객이 많다고 입력했어요.'), history: null,
  },
  tarot: {
    id: 'tarot', name: '미스테리 타로', short: '타로', cat: '타로샵', area: '성수동', walk: '도보 5분', reasonTag: '새 요청',
    desc: '조용한 골목에서 1:1 타로 상담을 하는 작은 가게', moods: ['신비로운', '조용한'],
    interests: ['공동 프로모션'], interestNote: '상담 손님께 드릴 작은 선물을 찾고 있어요.',
    target: '20~30대 커플', location: '서울 성동구',
    matches: matchesFor('타로샵', '두 가게 모두 데이트 목적의 고객이 많다고 입력했어요.'), history: null,
  },
  pong: {
    id: 'pong', name: '퐁신퐁신 베이커리', short: '퐁신', cat: '베이커리', area: '성수동', walk: '도보 8분', reasonTag: '같은 업종',
    desc: '폭신한 식빵과 브리오슈를 굽는 베이커리', moods: ['활기찬', '브런치'],
    interests: ['공동 구매', '공동 홍보'], interestNote: '밀가루와 포장재를 함께 구매하고 싶어요.',
    target: '가족 단위 고객', location: '서울 성동구',
    matches: matchesFor('베이커리', '두 가게 모두 아침 시간 방문 고객이 많다고 입력했어요.'), history: null,
  },
  ondo: {
    id: 'ondo', name: '카페 온도', short: '온도', cat: '카페', area: '성수동', walk: '도보 3분', reasonTag: '모집글 열림',
    desc: '로스팅부터 직접 하는 동네 카페', moods: ['아늑한', '조용한'], interests: ['팝업', '공동 프로모션'],
    interestNote: '디저트와 함께하는 세트 메뉴를 만들고 싶어요.', target: '20~30대 직장인', location: '서울 성동구',
    matches: matchesFor('카페', '두 가게 모두 오전 시간대 손님이 많다고 입력했어요.'), history: null,
  },
  dal: {
    id: 'dal', name: '소품샵 달맞이', short: '달맞이', cat: '편집샵', area: '성수동', walk: '도보 8분', reasonTag: '모집글 열림',
    desc: '동네 작가의 소품을 소개하는 편집샵', moods: ['감성적인', '핸드메이드'], interests: ['시즌 한정 상품'],
    interestNote: '선물 포장에 어울리는 소품을 함께 기획하고 싶어요.', target: '20대 여성', location: '서울 성동구',
    matches: matchesFor('편집샵', '두 가게 모두 선물 구매 목적의 고객을 주요 대상으로 입력했어요.'), history: null,
  },
  book: {
    id: 'book', name: '책방 느린걸음', short: '느린걸음', cat: '서점', area: '성수동', walk: '도보 9분', reasonTag: '분위기 잘 맞음',
    desc: '독립출판물을 소개하고 북토크를 여는 골목 책방', moods: ['조용한', '북토크'], interests: ['공동 행사'],
    interestNote: '북토크에 곁들일 간식을 함께 준비하고 싶어요.', target: '20~30대 직장인', location: '서울 성동구',
    matches: matchesFor('서점', '두 가게 모두 주말 여가 고객이 많다고 입력했어요.'), history: null,
  },
};

/** 06 AI 추천 파트너 목록 */
export const RECOMMENDED: StoreId[] = ['gyeol', 'moa', 'hyang'];
/** 09 요청 완료의 '이런 가게도 있어요' */
export const ALSO_LIKE: { id: StoreId; badge: string }[] = [
  { id: 'moa', badge: '지난 수락 이력' },
  { id: 'ondo', badge: '모집글 열림' },
  { id: 'dal', badge: '모집글 열림' },
];
/** 06 업종 칩: 전체 + 12종 */
export const EXPLORE_CATS = ['전체', '베이커리', '바', '서점', '카페', '피트니스', '꽃집', '갤러리', '공방', '식당', '편집샵', '체험관광', '시장'];

/* ---------- 모집글 ---------- */

export type Post = {
  store: StoreId;
  title: string;
  kind: string; // 협업 방식 (공동 상품, 공간 공유 …)
  calls: number;
  until: string;
  tags: string[];
  body: string;
};

export const POSTS: Post[] = [
  {
    store: 'gyeol', title: '봄 한정 상품을 함께 만들 가게 구해요', kind: '공동 상품', calls: 3, until: '4월 10일까지',
    tags: ['베이커리 환영', '한정 상품', '4월 시작'],
    body: '봄 시즌에 맞춰 가죽 키링과 어울리는 먹거리를 함께 만들고 싶어요. 쿠폰으로 서로의 단골을 연결해요.',
  },
  {
    store: 'moa', title: '카페와 함께하는 팝업 이벤트', kind: '공간 공유', calls: 1, until: '4월 15일까지',
    tags: ['카페 환영', '팝업', '4월 중순'],
    body: '꽃집 한쪽 공간에서 음료와 꽃을 함께 소개하는 주말 팝업을 열고 싶어요.',
  },
  {
    store: 'book', title: '북토크 날 같이 진행할 브랜드', kind: '공동 행사', calls: 5, until: '4월 12일까지',
    tags: ['베이커리 환영', '북토크', '4월 셋째 주'],
    body: '매달 여는 북토크에 곁들일 간식을 함께 준비할 브랜드를 찾고 있어요. 참가자에게 쿠폰을 나눠드려요.',
  },
];

/* ---------- 협업 제안서 (08, 19) ---------- */

export const PURPOSES = ['신규 고객 유입', '시즌 프로모션', '단골 교차 방문', '브랜드 알리기'];
export const LOVECALL_TYPES = ['한정 상품', '팝업', '공동 이벤트'];

/** 제안서 기본값. TODO: AI 제안서 초안 API로 교체 */
export function proposalDraft(s: Store, method?: string) {
  return {
    title: method ? `${method} 협업` : '봄 한정 피크닉 패키지 협업',
    purposes: ['신규 고객 유입', '시즌 프로모션'],
    idea: `봄 시즌에 맞춰 베이커리의 한정 빵 세트와 ${s.name}의 ${s.cat === '공방' ? '수제 소품' : '대표 상품'}을 하나의 피크닉 패키지로 구성합니다.`,
    reasons: ['유사한 고객층: 20~30대, 커플', '비슷한 분위기: 따뜻함, 핸드메이드', `상호보완적 상품: 베이커리 × ${s.cat}`],
    effect: `베이커리는 선물용 상품을 확장하고, ${s.name}은 새로운 고객에게 ${s.cat} 상품을 소개할 수 있어요.`,
    schedule: '4월 첫째 주 ~ 넷째 주',
    condition: '역할·비용 분담: 협의 필요',
    request: '안녕하세요, 성수 봄빵 베이커리입니다. 봄 시즌에 함께 한정 상품을 만들어보면 어떨까요? 관심 있으시면 상품 구성과 일정에 대해 함께 논의하고 싶습니다.',
  };
}
export const LOVECALL_MESSAGE = '안녕하세요, 성수 봄빵 베이커리입니다. 봄 시즌 한정 상품을 함께 만들고 싶어요.';

/* ---------- 받은 요청 (10) ---------- */

export type ReceivedRequest = {
  storeId: StoreId; title: string; detail: string; message: string; isNew: boolean;
  method: string; schedule: string; roles: string; touchpoints: string[];
};

export const RECEIVED_REQUESTS: ReceivedRequest[] = [
  {
    storeId: 'tarot', title: '상담 손님 선물 세트', detail: '한정 상품 · 4월 첫째 주', isNew: true,
    message: '안녕하세요, 미스테리 타로입니다. 상담 손님께 드릴 작은 빵 세트를 함께 만들어보면 어떨까요? 구성과 일정을 함께 이야기하고 싶어요.',
    method: '공동 상품 개발', schedule: '4월 첫째 주 ~ 넷째 주', roles: '추후 협의', touchpoints: ['고객층', '브랜드 분위기', '상품 보완성'],
  },
  {
    storeId: 'moa', title: '꽃 한 송이 이벤트', detail: '공동 이벤트 · 4월 둘째 주', isNew: true,
    message: '안녕하세요, 꽃집 모아입니다. 빵을 사는 손님께 꽃 한 송이를 건네는 이벤트를 함께 열어보면 어떨까요?',
    method: '공동 이벤트', schedule: '4월 둘째 주 주말', roles: '꽃은 모아, 공간은 봄빵', touchpoints: ['고객층', '브랜드 분위기'],
  },
  {
    storeId: 'book', title: '북토크 간식', detail: '북토크 간식 · 4월 셋째 주', isNew: false,
    message: '안녕하세요, 책방 느린걸음입니다. 북토크 날 곁들일 간식을 함께 준비해주실 수 있을까요?',
    method: '공동 행사', schedule: '4월 셋째 주 토요일', roles: '추후 협의', touchpoints: ['고객층', '상품 보완성'],
  },
];
/** 제안 상세 카드 (꾹 눌러 '킵'하는 항목) */
export const KEEP_ITEMS = ['협업 방식', '희망 일정', '역할·비용'] as const;
export type KeepItem = (typeof KEEP_ITEMS)[number];
export const REJECT_REASONS = ['일정이 안 맞아요', '방향이 달라요', '지금은 어려워요'];

/* ---------- 협업 탭 (20) ---------- */

export const SAMPLE_SENT = [
  { name: '성수 가을빵 베이커리', detail: '한정 상품 · 4월 첫째 주', isNew: true },
  { name: '향기나는 행복', detail: '공동 이벤트 · 4월 둘째 주', isNew: true },
  { name: '책방 느린걸음', detail: '북토크 간식 · 4월 셋째 주', isNew: false },
];
export const MATCHES: { storeId: StoreId; detail: string }[] = [
  { storeId: 'gyeol', detail: '한정 상품 · 4월 둘째 주' },
  { storeId: 'pong', detail: '공동 이벤트 · 4월 셋째 주' },
];
export const IN_PROGRESS = [{ name: '겨울 책방', title: '북토크 간식', detail: '북토크 간식 · 4월 첫째 주' }];
export const PAST_COLLABS = [
  { name: '멍냥 가게', title: '한정 상품', detail: '한정 상품 · 3월' },
  { name: '꽃집 모아', title: '꽃 한 송이 이벤트', detail: '꽃 한 송이 이벤트 · 3월' },
];
export const MY_HISTORY = [
  { name: '겨울 책방', title: '북토크 간식', detail: '북토크 간식 · 진행 중' },
  { name: '꽃집 모아', title: '꽃 한 송이 이벤트', detail: '꽃 한 송이 이벤트 · 완료' },
];

/* ---------- 협업 아이디어 (12) ---------- */

export type Method = { title: string; desc: string; icon: string };
/** 다른 업종끼리 (이종업계) */
export const METHODS_CROSS: Method[] = [
  { title: '상품 묶어 팔기', desc: '새로운 패키지를 만들어요', icon: 'gift-outline' },
  { title: '서로 추천하기', desc: '서로의 고객에게 소개해요', icon: 'swap-horizontal-outline' },
  { title: '팝업 함께 열기', desc: '공간을 활용해 판매해요', icon: 'storefront-outline' },
  { title: '콘텐츠 함께 만들기', desc: '사진과 홍보물을 제작해요', icon: 'camera-outline' },
];
/** 같은 업종끼리 (동종업계) */
export const METHODS_SAME: Method[] = [
  { title: '함께 구매하기', desc: '물품을 함께 주문해요', icon: 'basket-outline' },
  { title: '공간·장비 나누기', desc: '공간과 장비를 공유해요', icon: 'archive-outline' },
  { title: '함께 만들기', desc: '새 상품을 함께 개발해요', icon: 'cube-outline' },
  { title: '함께 알리기', desc: '홍보와 행사를 함께해요', icon: 'megaphone-outline' },
];
export const PARTNER_PICK = ['추천 가게에서 고르기', '추후 지정'];

/** 12_1 AI 계획 정리: 다섯 섹션. TODO: AI 정리 API로 교체 */
export const PLAN_SECTIONS = [
  { key: 'overview', title: '협업 개요', text: '성수 봄빵 베이커리와 가죽공방 결이 봄 시즌 한정 피크닉 패키지를 함께 만들어요.' },
  { key: 'purpose', title: '협업 목적', text: '시즌 한정 상품으로 서로의 고객에게 가게를 알려요.' },
  { key: 'roles', title: '필요한 역할과 자원', text: '봄빵은 빵 구성과 제작을, 결은 가죽 소품 제작과 포장을 맡아요. 포장 박스는 함께 정해야 해요.' },
  { key: 'steps', title: '예상 실행 단계', text: '상품 구성 확정, 시안 제작, 한정 판매 시작 순서로 진행해요.' },
  { key: 'check', title: '확인해야 하는 항목', text: '판매 기간, 제작 수량, 비용 분담은 아직 정해지지 않았어요.' },
];
/** '다시 만들기'를 누르면 보여줄 다른 초안 */
export const PLAN_ALTERNATES: Record<string, string> = {
  overview: '두 가게가 봄 피크닉을 주제로 빵과 가죽 소품을 담은 한정 패키지를 선보여요.',
  purpose: '서로의 단골에게 새로운 가게를 소개하고 봄 시즌 매출을 함께 늘려요.',
  roles: '봄빵은 빵 세트 구성, 결은 키링 제작을 맡고, 포장과 홍보는 함께 준비해요.',
  steps: '구성 확정 → 샘플 제작 → 사진 촬영 → 예약 판매 → 현장 판매 순서로 진행해요.',
  check: '판매 가격, 수량, 비용 분담, 판매 장소를 함께 정해야 해요.',
};

/* ---------- 협업 워크스페이스와 AI 도구 (15) ---------- */

export const PROJECT = {
  pair: '성수 봄빵 베이커리 × 가죽공방 결',
  title: '봄 한정 피크닉 패키지',
  purpose: '시즌 한정 상품으로 서로의 고객에게 가게를 알려요',
  schedule: '일정은 아직 정해지지 않았어요',
  agreed: [
    { label: '아이디어', value: '봄 한정 피크닉 패키지', status: '확정' },
    { label: '봄빵 역할', value: '빵 구성과 제작', status: '확정' },
    { label: '결 역할', value: '가죽 소품 제작과 포장', status: '확정' },
    { label: '준비할 내용', value: '포장 박스 시안', status: '확인 필요' },
    { label: '미정 항목', value: '비용 분담, 제작 수량', status: '확인 필요' },
  ],
  activity: [
    { who: '결', what: '공동 상품 기획서를 수정했어요', status: '확인 필요' },
    { who: '봄빵', what: '참가 신청서를 만들었어요', status: '확정' },
  ],
};

export type ToolKey = 'schedule' | 'plan' | 'checklist' | 'content' | 'preorder' | 'order' | 'settle' | 'form';
export const TOOLS: Record<ToolKey, { title: string; desc: string }> = {
  schedule: { title: '협업 실행 계획표', desc: '일정과 역할을 한눈에 정리해요' },
  plan: { title: '공동 상품 구성 기획서', desc: '구성 상품과 역할, 일정을 정리해요' },
  checklist: { title: '제작 및 역할 체크리스트', desc: '준비할 일과 담당을 나눠요' },
  content: { title: '홍보 콘텐츠', desc: 'SNS 문구와 스토리 구성을 만들어요' },
  preorder: { title: '예약 주문 안내 자료', desc: '예약 안내 문구와 신청 양식을 만들어요' },
  order: { title: '공동 구매 주문서', desc: '품목과 수량, 나눌 비용을 정리해요' },
  settle: { title: '비용 정산표', desc: '누가 얼마를 냈는지 정리해요' },
  form: { title: '참가 신청서', desc: '손님 신청을 받을 양식을 만들어요' },
};
/** 협업 유형에 따라 추천 도구가 달라져요 */
export const TOOL_TYPES = ['공동 상품 번들', '공동 구매', '공동 체험 이벤트'] as const;
export type ToolType = (typeof TOOL_TYPES)[number];
export const TOOLS_BY_TYPE: Record<ToolType, ToolKey[]> = {
  '공동 상품 번들': ['schedule', 'plan', 'checklist', 'content', 'preorder'],
  '공동 구매': ['schedule', 'order', 'settle', 'checklist'],
  '공동 체험 이벤트': ['schedule', 'form', 'checklist', 'content'],
};
/** 워크스페이스의 AI 도구 목록 */
export const WORKSPACE_TOOLS: { key: ToolKey; sub?: string; status: '추천' | '초안' }[] = [
  { key: 'schedule', status: '추천' },
  { key: 'plan', sub: '기획서 · 오늘 수정', status: '초안' },
  { key: 'checklist', status: '추천' },
];

/** 15_2 도구 만들기: 제안서에서 가져온 값 */
export const TOOL_BUILD_DEFAULTS = {
  name: '봄 한정 피크닉 패키지',
  items: '크루아상 3종, 가죽 키링',
  roles: '봄빵은 빵 구성, 결은 가죽 소품 제작',
};

/** 15_4 생성된 기획서. TODO: AI 도구 생성 API로 교체 */
export const GENERATED_PLAN = {
  overview: '봄 한정 피크닉 패키지는 성수 봄빵 베이커리의 빵과 가죽공방 결의 가죽 소품을 함께 담은 시즌 한정 상품이에요.',
  items: '크루아상 3종, 가죽 키링 1개, 피크닉 포장 박스',
  itemsAlt: '크루아상 2종과 스콘 1종, 가죽 키링 1개, 피크닉 포장 박스',
  roles: [
    ['빵 구성과 제작', '봄빵', '4월 둘째 주'],
    ['가죽 소품 제작', '결', '4월 둘째 주'],
    ['포장 박스 시안', '함께', '확인 필요'],
  ] as [string, string, string][],
  open: [
    { label: '비용', value: '비용 분담은 추후 협의' },
    { label: '수량', value: '제작 수량은 추후 협의' },
  ],
};

/** 15_7 경쟁법 경고: 같은 업종끼리 가격·할인을 맞추는 문구. TODO: 서버 규칙과 AI 판별로 교체 */
export const PRICE_FIXING = /(가격|할인율|판매가|같은 금액|동일한 금액|값을 맞)/;

/** 15_5 참가 신청서 체크리스트 */
export const FORM_CHECKLIST = [
  { label: '포장 박스 시안 정하기', owner: '결', done: false },
  { label: '빵 시식 샘플 준비', owner: '봄빵', done: true },
  { label: '안내 포스터 인쇄', owner: '함께', done: false },
];

/** 15_8 보관함 */
export type ToolStatus = '초안' | '검토 중' | '확정';
export const TOOLBOX: { key: 'plan' | 'form' | 'content' | 'schedule'; title: string; sub: string; status: ToolStatus }[] = [
  { key: 'plan', title: '공동 상품 기획서', sub: '기획서 · 오늘 수정', status: '검토 중' },
  { key: 'form', title: '참가 신청서', sub: '신청서 · 어제 수정', status: '초안' },
  { key: 'content', title: '홍보 콘텐츠', sub: '홍보 문구 · 3일 전 수정', status: '초안' },
  { key: 'schedule', title: '협업 실행 계획표', sub: '계획표 · 지난주 수정', status: '확정' },
];

/* ---------- 홍보 콘텐츠 (14) ---------- */

export const POST_CAPTIONS = [
  '이번 봄, 빵 냄새와 가죽 향이 만나요. 성수동에서 만나는 한정 피크닉 패키지',
  '봄 소풍 가방에 빵 한 봉지와 가죽 키링 하나. 두 가게가 함께 준비했어요',
];
export const POST_HASHTAGS = ['#성수동', '#봄한정', '#협업'];
export const STYLE_OPTIONS = ['#보이스', '#댄스'];
export const STORY_STEPS: [string, string][] = [
  ['1 가게 소개', '봄빵과 키링 소개'],
  ['2 혜택 안내', '한정 세트와 할인'],
  ['3 쿠폰 QR', '링크 스티커로 연결'],
];
export const STICKER_OPTIONS = [
  '봄 한정, 두 가게가 함께 만든 작은 선물',
  '쿠폰 들고 이웃 가게 한 바퀴 돌아봐요',
  '오늘만 함께하는 이웃 가게 혜택',
  '함께 해요, 우리 동네 봄 나들이',
];
export const TONE_OPTIONS = [
  { tone: '친근한', text: '봄 한정! 봄빵 × 가죽공방 결이 함께 만든 가죽 키링 빵 세트예요' },
  { tone: '감성적인', text: '봄바람 같은 빵 한 조각과 손으로 만든 키링 하나, 두 가게가 건네는 작은 선물' },
  { tone: '간결한', text: '봄 한정 빵 세트와 가죽 키링, 4월 한 달만 만나요' },
];
export const HASHTAG_OPTIONS = ['#성수동', '#봄한정', '#협업', '#가죽키링'];

/* ---------- 쿠폰 (13) ---------- */

export const COUPON = {
  title: '봄 협업 세트 10% 할인',
  period: '4월 1일 ~ 4월 30일',
  where: '두 가게 모두',
  code: 'BOM2026',
  link: 'https://llus.app/c/BOM2026', // TODO: 쿠폰 발급 API가 돌려주는 링크로 교체
};

/* ---------- 협업 성과 (16, 예시 숫자) ---------- */

export const RESULTS = {
  summary: '베이커리와 공방 조합은 반응이 좋아요. 다음 협업 후보로 꽃집을 추천해요',
  before: 96,
  during: 132,
  daily: [3, 4, 6, 5, 9, 12, 10, 8, 9, 11, 13, 12, 15, 7],
  markers: [
    { n: 1, day: 1, label: '협업 시작' },
    { n: 2, day: 5, label: '스토리 게시' },
    { n: 3, day: 12, label: '쿠폰 마감 안내' },
  ],
  dailyInsight: '스토리를 올린 날부터 쿠폰 사용이 늘기 시작했어요',
  tiles: [['쿠폰 사용', '48회'], ['QR 스캔', '132회'], ['신규 방문', '27명']] as [string, string][],
  sources: [
    { label: '내 가게 기존 단골', count: 58, pct: 44, color: '#47423e' },
    { label: '상대 가게를 통해 온 신규 고객', count: 42, pct: 32, color: '#ffec9f' },
    { label: '검색과 지나가다 들른 고객', count: 32, pct: 24, color: '#e0e0e0' },
  ],
  sourceInsight: '신규 고객 3명 중 1명은 상대 가게에서 왔어요',
};

/* ---------- 프로필 설정 (03) ---------- */

/** 03 프로필 설정 3: 네이버 지역 검색 결과 자리. TODO: 네이버 지역 검색 API로 교체 */
export const PLACE_RESULT = { name: '성수 봄빵 베이커리', cat: '베이커리', address: '서울 성동구 성수이로 00' };
export const MOODS = ['아늑한', '감성적인', '조용한'];
export const PHOTO_SLOTS = [
  { key: 'store', label: '매장' },
  { key: 'product', label: '상품' },
  { key: 'brand', label: '브랜드' },
] as const;
export type PhotoKey = (typeof PHOTO_SLOTS)[number]['key'];

/* ---------- 설정 (22~27) ---------- */

export type NotificationKey = 'request' | 'accept' | 'lovecall' | 'coupon' | 'local' | 'marketing';
export const NOTIFICATION_SETTINGS: { key: NotificationKey; title: string; desc: string; on: boolean }[] = [
  { key: 'request', title: '협업 요청 알림', desc: '새 요청을 받으면 알려드려요', on: true },
  { key: 'accept', title: '요청 수락 알림', desc: '내 요청이 수락되면 알려드려요', on: true },
  { key: 'lovecall', title: '러브콜 알림', desc: '내 모집글에 러브콜이 오면 알려드려요', on: true },
  { key: 'coupon', title: '쿠폰 사용 알림', desc: '협업 쿠폰이 사용되면 알려드려요', on: true },
  { key: 'local', title: '모집글 소식 알림', desc: '새로운 모집글이 뜨면 알려드려요', on: false },
  { key: 'marketing', title: '마케팅 정보 수신', desc: '이벤트와 혜택 소식을 받아요', on: false },
];
export const LEAVE_REASONS = ['사용 빈도가 낮아요', '원하는 협업 상대를 찾기 어려워요', '다른 서비스를 쓰고 있어요', '기타'];

/* ---------- 입력 모양 맞추기 ---------- */

/** 010 0000 0000 */
export const formatPhone = (v: string) => {
  const d = v.replace(/\D/g, '').slice(0, 11);
  return [d.slice(0, 3), d.slice(3, 7), d.slice(7)].filter(Boolean).join(' ');
};
/** 000 00 00000 */
export const formatBizNo = (v: string) => {
  const d = v.replace(/\D/g, '').slice(0, 10);
  return [d.slice(0, 3), d.slice(3, 5), d.slice(5)].filter(Boolean).join(' ');
};
/** YYYY MM DD */
export const formatDate = (v: string) => {
  const d = v.replace(/\D/g, '').slice(0, 8);
  return [d.slice(0, 4), d.slice(4, 6), d.slice(6)].filter(Boolean).join(' ');
};
