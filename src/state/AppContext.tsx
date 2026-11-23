
import { createContext, useContext, useMemo, useState, type ReactNode } from 'react';
import {
  FORM_CHECKLIST, MY_STORE, NOTIFICATION_SETTINGS, PLAN_SECTIONS, PLACE_RESULT, STORES, TOOLS_BY_TYPE, TOOL_BUILD_DEFAULTS,
  GENERATED_PLAN, proposalDraft,
  type KeepItem, type NotificationKey, type PhotoKey, type StoreId, type ToolKey, type ToolStatus, type ToolType,
} from '@/data';

/** 입력칸에 들어가는 글자 값 */
export type Form = {
  // 가입
  phone: string; otp: string;
  bizNo: string; owner: string; openDate: string;
  // 프로필
  placeQuery: string; storeName: string; storeCat: string; storeAddress: string;
  target: string; visitTime: string; visitReason: string; wantedCollab: string;
  // 협업 제안서 (08)
  pTitle: string; pIdea: string; pEffect: string; pSchedule: string; pCondition: string; pRequest: string;
  // 러브콜 (19)
  lcIdea: string; lcEffect: string; lcSchedule: string; lcCondition: string; lcMessage: string; lcRequest: string;
  // 내 아이디어로 시작하기 (12)
  ciIdea: string; ciResult: string;
  // 도구 (15)
  toolDesc: string; tbName: string; tbItems: string; tbRoles: string; tbSchedule: string; tbCost: string; tbMemo: string;
  fName: string; fContact: string; fCount: string; fTime: string;
  // 홍보 콘텐츠 (14)
  refLink: string;
  // 설정
  curPw: string; newPw: string; newPw2: string;
};

export type CollabFilter = 'recv' | 'sent' | 'doing' | 'past';
export type ExploreMode = '맞춤 추천' | '모집 게시판';
export type ContentTab = '게시물' | '스토리' | '문구';

export type AppState = {
  form: Form;
  consent: boolean; // 전화번호 인증 필수 동의
  phoneVerified: boolean;
  reverify: boolean; // 25 사업자 인증 정보 > 다시 인증하기로 들어온 경우
  editingProfile: boolean; // 내 프로필 > 프로필 수정하기로 들어온 경우
  // 프로필 (03)
  moods: string[]; customMoods: string[];
  photos: Record<PhotoKey, string | null>; // 사진 주소 (기기에서 고른 사진)
  // 탐색 (06, 17)
  exploreMode: ExploreMode; exploreCat: string; exploreQuery: string;
  storeId: StoreId; postIdx: number; saved: string[];
  // 제안서·러브콜
  purposes: string[]; lcType: string;
  sentList: { storeId: StoreId; title: string; via: 'proposal' | 'lovecall' }[];
  // 받은 요청 (10)
  kept: KeepItem[]; rejectReasons: string[];
  collabFilter: CollabFilter;
  // 아이디어·계획 (12)
  partnerPick: string;
  planTexts: Record<string, string>;
  // AI 도구 (15)
  toolType: ToolType; toolsPicked: ToolKey[];
  planOverview: string; planItems: string;
  priceHold: 'none' | 'held'; // 경쟁법 경고 후 검토 요청을 보냈으면 'held'
  formChecklist: boolean[];
  toolStatus: Record<'plan' | 'form' | 'content' | 'schedule', ToolStatus>;
  toolboxFilter: '전체' | ToolStatus;
  // 홍보 콘텐츠 (14)
  contentTab: ContentTab; styleOpts: string[]; sticker: number; tone: number; hashtags: string[]; captionIdx: number;
  // 설정
  notifications: Record<NotificationKey, boolean>;
  leaveReason: number; leaveConfirm: boolean;
  toast: { msg: string; key: number } | null;
};

export const createInitialState = (): AppState => {
  const draft = proposalDraft(STORES.gyeol);
  return {
    form: {
      phone: '', otp: '',
      bizNo: '', owner: '', openDate: '',
      placeQuery: '', storeName: PLACE_RESULT.name, storeCat: PLACE_RESULT.cat, storeAddress: PLACE_RESULT.address,
      target: '', visitTime: '', visitReason: '', wantedCollab: '',
      pTitle: draft.title, pIdea: draft.idea, pEffect: draft.effect, pSchedule: draft.schedule, pCondition: draft.condition, pRequest: draft.request,
      lcIdea: '', lcEffect: '', lcSchedule: '', lcCondition: '', lcMessage: '', lcRequest: '',
      ciIdea: '', ciResult: '',
      toolDesc: '', tbName: TOOL_BUILD_DEFAULTS.name, tbItems: TOOL_BUILD_DEFAULTS.items, tbRoles: TOOL_BUILD_DEFAULTS.roles,
      tbSchedule: '', tbCost: '', tbMemo: '',
      fName: '', fContact: '', fCount: '', fTime: '',
      refLink: '',
      curPw: '', newPw: '', newPw2: '',
    },
    consent: false, phoneVerified: false, reverify: false, editingProfile: false,
    moods: [], customMoods: [],
    photos: { store: null, product: null, brand: null },
    exploreMode: '맞춤 추천', exploreCat: '전체', exploreQuery: '',
    storeId: 'gyeol', postIdx: 0, saved: [],
    purposes: draft.purposes, lcType: '한정 상품',
    sentList: [],
    kept: [], rejectReasons: [],
    collabFilter: 'recv',
    partnerPick: '추천 가게에서 고르기',
    planTexts: Object.fromEntries(PLAN_SECTIONS.map((s) => [s.key, s.text])),
    toolType: '공동 상품 번들', toolsPicked: TOOLS_BY_TYPE['공동 상품 번들'].slice(0, 2),
    planOverview: GENERATED_PLAN.overview, planItems: GENERATED_PLAN.items,
    priceHold: 'none',
    formChecklist: FORM_CHECKLIST.map((c) => c.done),
    toolStatus: { plan: '검토 중', form: '초안', content: '초안', schedule: '확정' },
    toolboxFilter: '전체',
    contentTab: '게시물', styleOpts: [], sticker: 0, tone: 0, hashtags: ['#성수동', '#봄한정', '#협업'], captionIdx: 0,
    notifications: Object.fromEntries(NOTIFICATION_SETTINGS.map((n) => [n.key, n.on])) as Record<NotificationKey, boolean>,
    leaveReason: 0, leaveConfirm: false,
    toast: null,
  };
};

/** 배열 상태만 골라내는 타입 (toggle에서 사용) */
type ArrayKey = { [K in keyof AppState]: AppState[K] extends string[] ? K : never }[keyof AppState];
type Patch = Partial<AppState> | ((s: AppState) => Partial<AppState>);

type AppContextValue = {
  state: AppState;
  update: (patch: Patch) => void;
  setForm: <K extends keyof Form>(key: K, value: Form[K]) => void;
  setForms: (patch: Partial<Form>) => void;
  toggle: (key: ArrayKey, value: string) => void;
  toast: (msg: string) => void;
  resetAll: () => void;
  /** 지금 제안·매치 대상 가게 */
  store: (typeof STORES)[StoreId];
  /** 내 가게 (프로필 설정에서 고친 값이 반영돼요) */
  me: typeof MY_STORE;
};

const AppContext = createContext<AppContextValue | null>(null);

export function AppProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<AppState>(createInitialState);

  const actions = useMemo(() => ({
    update: (patch: Patch) => setState((s) => ({ ...s, ...(typeof patch === 'function' ? patch(s) : patch) })),
    setForm: <K extends keyof Form>(key: K, value: Form[K]) =>
      setState((s) => ({ ...s, form: { ...s.form, [key]: value } })),
    setForms: (patch: Partial<Form>) => setState((s) => ({ ...s, form: { ...s.form, ...patch } })),
    toggle: (key: ArrayKey, value: string) =>
      setState((s) => {
        const list = s[key] as string[];
        return { ...s, [key]: list.includes(value) ? list.filter((v) => v !== value) : [...list, value] };
      }),
    toast: (msg: string) => setState((s) => ({ ...s, toast: { msg, key: Date.now() } })),
    // 로그아웃·탈퇴 때 처음 상태로 되돌려요 (안내 문구는 남겨요)
    resetAll: () => setState((s) => ({ ...createInitialState(), toast: s.toast })),
  }), []);

  const value = useMemo<AppContextValue>(() => ({
    state,
    store: STORES[state.storeId],
    me: {
      ...MY_STORE,
      name: state.form.storeName || MY_STORE.name,
      cat: state.form.storeCat || MY_STORE.cat,
      address: state.form.storeAddress || MY_STORE.address,
      moods: state.moods.length ? state.moods : MY_STORE.moods,
      target: state.form.target || MY_STORE.target,
    },
    ...actions,
  }), [state, actions]);

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp은 AppProvider 안에서만 쓸 수 있어요');
  return ctx;
}
