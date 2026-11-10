// 앱 전체 상태. 화면 이동은 expo-router가 맡고, 여기에는 화면끼리 주고받는 값만 둬요.
// 백엔드가 생기면 서버에서 받아올 값(가게, 요청 목록 등)은 이 상태 대신 API 호출로 바꾸면 돼요.
import { createContext, useContext, useMemo, useState, type ReactNode } from 'react';
import {
  MY_STORE,
  NOTIFICATION_SETTINGS,
  STORES,
  type Collab,
  type NotificationKey,
  type SentRequest,
  type StoreId,
} from '@/data';

export type Form = {
  email: string;
  pw: string;
  pw2: string;
  agree: boolean;
  biz: string;
  owner: string;
  openDate: string;
  storeName: string;
  insta: string;
  message: string;
  when: string;
  postWhen: string;
  customDetail: string;
  customWhen: string;
  curPw: string;
  newPw: string;
  newPw2: string;
};

export type CollabFilter = 'recv' | 'sent' | 'doing' | 'past';
export type ExploreMode = 'AI 추천' | '모집 게시판';
export type ContentTab = '게시물' | '스토리' | '문구';

export type AppState = {
  form: Form;
  verified: boolean;
  reverify: boolean; // 25 사업자 인증 정보 > 다시 인증하기로 02에 들어온 경우
  // 프로필 (03, 04)
  cat: string;
  customCats: string[];
  audience: string[];
  customAudience: string[];
  days: string[];
  hourOpts: string[];
  start: string;
  end: string;
  moods: string[];
  photos: number;
  introIdx: number;
  editingProfile: boolean; // 21 내 가게 > 프로필 수정으로 03에 들어온 경우
  // 탐색과 요청 (06~11, 17~19)
  exploreMode: ExploreMode;
  wantCats: string[];
  storeId: StoreId;
  postIdx: number;
  saved: string[];
  reqType: string;
  msgIdx: number;
  sentList: SentRequest[];
  boardCat: string;
  collabFilter: CollabFilter;
  // 아이디어 (12)
  ideas: number[];
  ideaSel: number;
  poolNext: number;
  direction: string;
  goals: string[];
  // 쿠폰·콘텐츠 (13, 14)
  couponIssued: boolean;
  contentTab: ContentTab;
  captionIdx: number;
  storyTag: string;
  tone: number;
  hashtags: string[];
  // 15·16에서 보고 있는 협업. null이면 지금 매치된 가게로 보여줘요.
  activeCollab: Collab | null;
  // 설정 (22~27)
  notifications: Record<NotificationKey, boolean>;
  leaveReason: number;
  leaveConfirm: boolean;
  toast: { msg: string; key: number } | null;
};

export const createInitialState = (): AppState => ({
  form: {
    email: '',
    pw: '',
    pw2: '',
    agree: false,
    biz: '',
    owner: '',
    openDate: '',
    storeName: MY_STORE.name,
    insta: '',
    message: '',
    when: '4월 첫째 주',
    postWhen: '4월 첫째 주',
    customDetail: '',
    customWhen: '',
    curPw: '',
    newPw: '',
    newPw2: '',
  },
  verified: false,
  reverify: false,
  cat: '베이커리',
  customCats: ['베이커리'],
  audience: ['연인', '가족'],
  customAudience: [],
  days: ['월', '화', '수', '목', '금', '토'],
  hourOpts: [],
  start: '',
  end: '',
  moods: ['아늑한', '조용한'],
  photos: 2,
  introIdx: 0,
  editingProfile: false,
  exploreMode: 'AI 추천',
  wantCats: ['공방'],
  storeId: 'gyeol',
  postIdx: 0,
  saved: [],
  reqType: '한정 상품',
  msgIdx: 0,
  sentList: [],
  boardCat: '전체',
  collabFilter: 'recv',
  ideas: [0, 1, 2, 3],
  ideaSel: 0,
  poolNext: 4,
  direction: '한정 상품',
  goals: ['신규 고객'],
  couponIssued: false,
  contentTab: '게시물',
  captionIdx: 0,
  storyTag: '봄 한정',
  tone: 0,
  hashtags: ['#성수동', '#봄한정', '#협업'],
  activeCollab: null,
  notifications: Object.fromEntries(NOTIFICATION_SETTINGS.map((n) => [n.key, n.on])) as Record<
    NotificationKey,
    boolean
  >,
  leaveReason: 0,
  leaveConfirm: false,
  toast: null,
});

/** 배열 상태만 골라내는 타입 (toggle에서 사용) */
type ArrayKey = { [K in keyof AppState]: AppState[K] extends string[] ? K : never }[keyof AppState];
type Patch = Partial<AppState> | ((s: AppState) => Partial<AppState>);

type AppContextValue = {
  state: AppState;
  update: (patch: Patch) => void;
  setForm: <K extends keyof Form>(key: K, value: Form[K]) => void;
  toggle: (key: ArrayKey, value: string) => void;
  toast: (msg: string) => void;
  resetAll: () => void;
  /** 지금 매치·요청 대상 가게 */
  store: (typeof STORES)[StoreId];
  /** 15·16에 보여줄 협업 */
  collab: Collab;
};

const AppContext = createContext<AppContextValue | null>(null);

export function AppProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<AppState>(createInitialState);

  const actions = useMemo(
    () => ({
      update: (patch: Patch) => setState((s) => ({ ...s, ...(typeof patch === 'function' ? patch(s) : patch) })),
      setForm: <K extends keyof Form>(key: K, value: Form[K]) =>
        setState((s) => ({ ...s, form: { ...s.form, [key]: value } })),
      toggle: (key: ArrayKey, value: string) =>
        setState((s) => {
          const list = s[key];
          return { ...s, [key]: list.includes(value) ? list.filter((v) => v !== value) : [...list, value] };
        }),
      toast: (msg: string) => setState((s) => ({ ...s, toast: { msg, key: Date.now() } })),
      // 로그아웃·탈퇴 때 처음 상태로 되돌려요 (안내 문구는 남겨요)
      resetAll: () => setState((s) => ({ ...createInitialState(), toast: s.toast })),
    }),
    [],
  );

  const value = useMemo<AppContextValue>(() => {
    const store = STORES[state.storeId];
    return {
      state,
      store,
      collab: state.activeCollab ?? { name: store.name, title: '봄 한정 가죽 키링 빵 세트' },
      ...actions,
    };
  }, [state, actions]);

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp은 AppProvider 안에서만 쓸 수 있어요');
  return ctx;
}
