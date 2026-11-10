// 예시 데이터. 백엔드가 생기면 API 응답으로 교체하는 부분이에요.
// 타입은 그대로 두고 값만 API에서 받아오면 화면 코드는 바꾸지 않아도 돼요.

export type StoreId = 'gyeol' | 'moa' | 'book' | 'tarot' | 'pong';

export type Store = {
  id: StoreId;
  name: string;
  short: string; // 동그란 로고 자리에 들어가는 짧은 이름
  cat: string;
  walk: string;
  badge: string;
  desc: string;
  tags: string[];
  reasons: string[]; // AI 추천 이유
};

export type Post = {
  store: StoreId;
  title: string;
  calls: number; // 받은 러브콜 수
  until: string;
  tags: string[];
  body: string;
};

export type Idea = { title: string; desc: string; meta: string };

/** 15 협업 상세, 16 협업 성과에 보여주는 협업 */
export type Collab = { name: string; title: string; detail?: string };

export type SentRequest = { storeId: StoreId; type: string; when: string; via: 'request' | 'lovecall' };

export const MY_STORE = { name: '성수 봄빵 베이커리', area: '성수동' };

export const STORES: Record<StoreId, Store> = {
  gyeol: {
    id: 'gyeol',
    name: '가죽공방 결',
    short: '결',
    cat: '공방',
    walk: '도보 4분',
    badge: '모집글 열림',
    desc: '가죽 소품과 키링을 직접 만드는 작은 공방이에요',
    tags: ['아늑한', '핸드메이드', '체험 가능'],
    reasons: ['업종이 달라요! (베이커리와 공방)', '고객층이 겹쳐요! (연인, 가족)', '분위기가 비슷해요! (아늑한)'],
  },
  moa: {
    id: 'moa',
    name: '꽃집 모아',
    short: '모아',
    cat: '꽃집',
    walk: '도보 6분',
    badge: '지난 수락 이력 있음',
    desc: '계절 꽃으로 작은 부케와 꽃 구독을 만드는 동네 꽃집이에요',
    tags: ['감성적인', '계절 꽃', '원데이 클래스'],
    reasons: ['업종이 달라요! (베이커리와 꽃집)', '고객층이 겹쳐요! (연인, 직장인)', '분위기가 비슷해요! (감성적인)'],
  },
  book: {
    id: 'book',
    name: '책방 느린걸음',
    short: '느린걸음',
    cat: '서점',
    walk: '도보 9분',
    badge: '분위기 잘 맞음',
    desc: '독립출판물을 소개하고 북토크를 여는 골목 책방이에요',
    tags: ['조용한', '북토크', '독립출판'],
    reasons: ['업종이 달라요! (베이커리와 서점)', '고객층이 겹쳐요! (학생, 직장인)', '분위기가 비슷해요! (조용한)'],
  },
  tarot: {
    id: 'tarot',
    name: '미스테리 타로',
    short: '타로',
    cat: '타로샵',
    walk: '도보 5분',
    badge: '새 요청',
    desc: '조용한 골목에서 1:1 타로 상담을 하는 작은 가게예요',
    tags: ['신비로운', '조용한', '연인'],
    reasons: ['업종이 달라요! (베이커리와 타로샵)', '고객층이 겹쳐요! (연인)', '분위기가 비슷해요! (조용한)'],
  },
  pong: {
    id: 'pong',
    name: '퐁신퐁신 베이커리',
    short: '퐁신퐁신',
    cat: '베이커리',
    walk: '도보 8분',
    badge: '매치',
    desc: '폭신한 식빵과 브리오슈를 굽는 베이커리예요',
    tags: ['활기찬', '식빵', '브런치'],
    reasons: ['고객층이 겹쳐요! (가족)', '분위기가 비슷해요! (활기찬)'],
  },
};

export const CAT_TO_STORE: Record<string, StoreId> = { 공방: 'gyeol', 꽃집: 'moa', 서점: 'book' };
export const RECOMMENDED: StoreId[] = ['gyeol', 'moa', 'book'];

export const POSTS: Post[] = [
  {
    store: 'gyeol',
    title: '봄 한정 상품 같이 만들 가게 구해요',
    calls: 3,
    until: '4월 10일까지',
    tags: ['베이커리 환영', '한정 상품', '4월 시작'],
    body: '봄 시즌에 맞춰 가죽 키링과 어울리는 먹거리를 함께 만들고 싶어요. 쿠폰으로 서로의 단골을 연결해요.',
  },
  {
    store: 'moa',
    title: '카페와 함께 하는 꽃 한 송이 이벤트',
    calls: 1,
    until: '4월 15일까지',
    tags: ['카페 환영', '공동 이벤트', '4월 중순'],
    body: '음료를 주문한 손님께 꽃 한 송이를 건네는 이벤트를 함께 열 가게를 찾아요.',
  },
  {
    store: 'book',
    title: '북토크 날 같이 간식 낼 베이커리 찾아요',
    calls: 5,
    until: '4월 12일까지',
    tags: ['베이커리 환영', '북토크', '4월 셋째 주'],
    body: '매달 여는 북토크에 곁들일 간식을 함께 준비할 베이커리를 찾고 있어요. 참가자에게 쿠폰을 나눠드려요.',
  },
];

// TODO: AI 메시지 초안 API로 교체
export const REQUEST_MESSAGES: ((s: Store) => string)[] = [
  () => '안녕하세요, 성수 봄빵 베이커리입니다. 봄 시즌에 함께 한정 상품을 만들어보면 어떨까요?',
  (s) =>
    `안녕하세요, ${s.name} 사장님! 성수 봄빵 베이커리입니다. 두 가게의 단골이 겹치는 것 같아 봄 시즌 협업을 제안드려요.`,
  (s) => `${s.name} 사장님, 반갑습니다. 근처에서 빵집을 하고 있어요. 서로의 손님을 연결하는 작은 협업을 해보고 싶어요.`,
];
export const LOVECALL_MESSAGE = '안녕하세요, 성수 봄빵 베이커리입니다. 봄 시즌 한정 상품을 함께 만들고 싶어요.';

// TODO: AI 한 줄 소개 API로 교체
export const INTROS = [
  '빵 냄새로 아침을 여는 성수동 동네 베이커리',
  '매일 아침 갓 구운 빵으로 골목을 깨우는 작은 빵집',
  '성수동 골목에서 천천히 굽는 아늑한 동네 빵집',
];

// 12 AI 협업 아이디어. 처음에는 앞의 4개를 보여주고 '아이디어 더 보기'로 하나씩 추가해요.
export const IDEA_POOL: Idea[] = [
  { title: '서로의 가게에서 쓰는 교차 할인', desc: '서로의 단골에게 10% 할인을 제공해요', meta: '쿠폰 · 가장 간단' },
  {
    title: '가죽공방 결 패키징',
    desc: '가죽 패키징에 빵 세트를 담아 판매해요',
    meta: '참고 맥락 성수 플리마켓 4월 12일, 봄 시즌',
  },
  {
    title: '봄 한정 가죽 키링 빵 세트',
    desc: '빵 세트에 공방 키링을 함께 담아 판매해요',
    meta: '한정 상품 · 쿠폰 포함',
  },
  { title: '공방 체험과 베이커리 티타임', desc: '체험 뒤에 빵과 음료를 즐기는 반나절 코스', meta: '체험 · 패키지' },
  { title: '플리마켓 공동 부스', desc: '4월 12일 성수 플리마켓에 한 부스로 함께 나가요', meta: '팝업 · 동네 행사' },
  { title: '스탬프 투어 카드', desc: '두 가게를 모두 들르면 작은 선물을 드려요', meta: '공동 이벤트 · 재방문' },
];

// 12 협업 방향 직접 설정
export const DIRECTIONS = ['한정 상품', '공동 이벤트', '교차 할인', 'SNS 협업', '체험 프로그램'];
export const GOALS = ['신규 고객', '단골 연결', '매출 증대', '가게 알리기'];

// 14 홍보 콘텐츠
export const POST_CAPTIONS: ((s: Store) => string)[] = [
  (s) => `봄 한정, 가죽 키링이 들어 있는 빵 세트!\n성수 봄빵 × ${s.name}`,
  (s) => `봄에만 만나는 두 가게의 협업\n성수 봄빵 × ${s.name}`,
];
export const POST_HASHTAGS = '#성수동 #봄한정 #협업';
export const STORY_STEPS: [string, string][] = [
  ['1 가게 소개', '봄빵과 키링 소개'],
  ['2 혜택 안내', '한정 세트와 할인'],
  ['3 쿠폰 QR', '링크 스티커로 연결'],
];
export const STORY_TAGS = ['봄 한정', '쿠폰 증정', '오늘만', '함께 해요'];
export const TONE_OPTIONS: { tone: string; text: (s: Store) => string }[] = [
  { tone: '친근한', text: (s) => `봄 한정! 봄빵 × ${s.name}이 함께 만든 가죽 키링 빵 세트예요` },
  { tone: '감성적인', text: () => '봄바람 같은 빵 한 조각과 손으로 만든 키링 하나, 두 가게가 건네는 작은 선물' },
  { tone: '간결한', text: () => '봄 한정 빵 세트와 가죽 키링, 4월 한 달만 만나요' },
];
export const HASHTAG_OPTIONS = ['#성수동', '#봄한정', '#협업', '#가죽키링'];
export const COUPON_LINK = 'llus.app/c/BOM2026';

// 20 협업 탭
export const RECEIVED_REQUESTS: {
  storeId: StoreId;
  detail: string;
  type: string;
  when: string;
  isNew: boolean;
  message: string;
}[] = [
  {
    storeId: 'tarot',
    detail: '한정 상품 · 4월 첫째 주',
    type: '한정 상품',
    when: '4월 첫째 주',
    isNew: true,
    message: '안녕하세요, 미스테리 타로입니다. 상담 손님께 드릴 작은 빵 세트를 함께 만들어보고 싶어요.',
  },
  {
    storeId: 'moa',
    detail: '공동 이벤트 · 4월 둘째 주',
    type: '공동 이벤트',
    when: '4월 둘째 주',
    isNew: true,
    message: '안녕하세요, 꽃집 모아입니다. 빵을 사는 손님께 꽃 한 송이를 건네는 이벤트를 함께 열어요.',
  },
  {
    storeId: 'book',
    detail: '북토크 간식 · 4월 셋째 주',
    type: '공동 이벤트',
    when: '4월 셋째 주',
    isNew: false,
    message: '안녕하세요, 책방 느린걸음입니다. 북토크 날 곁들일 간식을 함께 준비해주실 수 있을까요?',
  },
];
export const SAMPLE_SENT = [
  { name: '성수 가을빵 베이커리', detail: '한정 상품 · 4월 첫째 주', isNew: true },
  { name: '향기나는 행복', detail: '공동 이벤트 · 4월 둘째 주', isNew: true },
  { name: '책방 느린걸음', detail: '북토크 간식 · 4월 셋째 주', isNew: false },
];
export const MATCHES: { storeId: StoreId; detail: string }[] = [
  { storeId: 'gyeol', detail: '한정 상품 · 4월 둘째 주' },
  { storeId: 'pong', detail: '공동 이벤트 · 4월 셋째 주' },
];
export const IN_PROGRESS: Collab[] = [{ name: '겨울 책방', title: '북토크 간식', detail: '북토크 간식 · 4월 첫째 주' }];
export const PAST_COLLABS: (Collab & { isNew: boolean })[] = [
  { name: '멍냥 가게', title: '한정 상품', detail: '한정 상품 · 3월', isNew: true },
  { name: '꽃집 모아', title: '꽃 한 송이 이벤트', detail: '꽃 한 송이 이벤트 · 3월', isNew: true },
  { name: '책방 느린걸음', title: '북토크 간식', detail: '북토크 간식 · 2월', isNew: false },
];
export const MY_HISTORY: Collab[] = [
  { name: '겨울 책방', title: '북토크 간식', detail: '북토크 간식 · 진행 중' },
  { name: '꽃집 모아', title: '꽃 한 송이 이벤트', detail: '꽃 한 송이 이벤트 · 완료' },
];

// 16 협업 성과 (화면 구성을 위한 예시 숫자)
export const RESULTS = {
  before: 96,
  during: 132,
  tiles: [
    ['쿠폰 사용', '48회'],
    ['QR 스캔', '132회'],
    ['신규 방문', '27명'],
  ] as [string, string][],
  sources: [
    { label: '상대 가게를 통해 온 신규 고객', count: 42, pct: 32, color: 'bg-brand', strong: true },
    { label: '내 가게 기존 단골', count: 58, pct: 44, color: 'bg-line', strong: false },
    { label: '검색과 지나가다 들른 고객', count: 32, pct: 24, color: 'bg-hair', strong: false },
  ],
  daily: [3, 4, 6, 5, 9, 12, 10, 8, 9, 11, 13, 12, 15, 7],
  markers: [
    { n: 1, day: 1, label: '협업 시작' },
    { n: 2, day: 5, label: '스토리 게시' },
    { n: 3, day: 12, label: '쿠폰 마감 안내' },
  ],
};

// 22~27 설정
export type NotificationKey = 'request' | 'accept' | 'lovecall' | 'coupon' | 'local' | 'marketing';
export const NOTIFICATION_SETTINGS: { key: NotificationKey; title: string; desc: string; on: boolean }[] = [
  { key: 'request', title: '협업 요청 알림', desc: '새 요청을 받으면 알려드려요', on: true },
  { key: 'accept', title: '요청 수락 알림', desc: '내 요청이 수락되면 알려드려요', on: true },
  { key: 'lovecall', title: '러브콜 알림', desc: '내 모집글에 러브콜이 오면 알려드려요', on: true },
  { key: 'coupon', title: '쿠폰 사용 알림', desc: '협업 쿠폰이 사용되면 알려드려요', on: true },
  { key: 'local', title: '동네 소식 알림', desc: '근처 행사와 시즌 소식을 알려드려요', on: false },
  { key: 'marketing', title: '마케팅 정보 수신', desc: '이벤트와 혜택 소식을 받아요', on: false },
];
export const LEAVE_REASONS = [
  '사용 빈도가 낮아요',
  '원하는 협업 상대를 찾기 어려워요',
  '다른 서비스를 쓰고 있어요',
  '기타',
];

export const TIMES = Array.from({ length: 48 }, (_, i) => `${Math.floor(i / 2)}:${i % 2 ? '30' : '00'}`);
