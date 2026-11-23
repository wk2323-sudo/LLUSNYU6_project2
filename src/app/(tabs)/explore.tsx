// 06 AI 추천 파트너 (맞춤 추천) · 17 모집 게시판 — 탐색 탭 안에서 상단 탭으로 전환
import { Pressable, View } from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useApp, type ExploreMode } from '@/state/AppContext';
import { EXPLORE_CATS, POSTS, RECOMMENDED, STORES } from '@/data';
import { Avatar, Card, ChipGroup, Field, FloatingButton, Screen, SectionTitle, Tag, TopTabs, Txt } from '@/components/ui';
import { C } from '@/lib/colors';

const MODES: readonly ExploreMode[] = ['맞춤 추천', '모집 게시판'];

function Recommendations() {
  const { state, update } = useApp();
  const q = state.exploreQuery.trim();
  // TODO: 추천 API에 업종과 검색어를 넘기기. 지금은 예시 가게를 걸러서 보여줘요.
  const list = RECOMMENDED.map((id) => STORES[id]).filter((s) =>
    (state.exploreCat === '전체' || s.cat === state.exploreCat) && (!q || s.name.includes(q) || s.cat.includes(q)));
  return (
    <>
      <Field value={state.exploreQuery} onChangeText={(v) => update({ exploreQuery: v })} placeholder="어떤 업종을 찾고 계신가요?"
        accessibilityLabel="업종 검색" right={<Ionicons name="search-outline" size={22} color={C.charcoal} />} />
      <ChipGroup scroll options={EXPLORE_CATS} value={state.exploreCat} onChange={(c) => update({ exploreCat: c })} />
      <View className="gap-3">
        {list.length ? list.map((s) => (
          <Card key={s.id} row pad="lg" gap={12} onPress={() => router.push(`/store/${s.id}`)} accessibilityLabel={`${s.name} 가게 프로필`}>
            <Avatar />
            <View className="flex-1 gap-1">
              <Txt v="title">{s.name}</Txt>
              <Txt tone="sub">{s.cat} · {s.walk}</Txt>
              <Tag label={s.reasonTag} />
            </View>
            <Ionicons name="chevron-forward" size={22} color={C.charcoal} />
          </Card>
        )) : (
          <Card gap={4}>
            <Txt v="title">조건에 맞는 가게가 아직 없어요</Txt>
            <Txt tone="sub">업종을 바꾸거나 전체에서 찾아보세요.</Txt>
          </Card>
        )}
      </View>
    </>
  );
}

function RecruitBoard() {
  const { toast } = useApp();
  return (
    <>
      <SectionTitle title="새로운 협업 모집" action={(
        <Pressable onPress={() => toast('정렬은 다음 버전에서 열려요')} className="flex-row items-center gap-0.5" accessibilityRole="button">
          <Txt tone="sub">최신순</Txt>
          <Ionicons name="chevron-down" size={18} color={C.sub} />
        </Pressable>
      )} />
      <View className="gap-3">
        {POSTS.map((p, i) => (
          <Card key={i} gap={4} onPress={() => router.push(`/post/${i}`)}>
            <Txt v="title">{p.title}</Txt>
            <Txt tone="sub">{STORES[p.store].name} · {p.kind}</Txt>
          </Card>
        ))}
      </View>
    </>
  );
}

export default function Explore() {
  const { state, update, toast } = useApp();
  const board = state.exploreMode === '모집 게시판';
  return (
    <Screen title="탐색" back={false} big inTab gap={20}
      right={(
        <Pressable onPress={() => toast('필터는 다음 버전에서 열려요')} hitSlop={10} accessibilityRole="button" accessibilityLabel="필터">
          <Ionicons name="options-outline" size={24} color={C.charcoal} />
        </Pressable>
      )}
      below={<TopTabs options={MODES} value={state.exploreMode} onChange={(m) => update({ exploreMode: m })} />}
      floating={board ? <FloatingButton label="모집글 쓰기" onPress={() => toast('모집글 작성 화면은 다음 버전에서 열려요')} /> : undefined}>
      {board ? <RecruitBoard /> : <Recommendations />}
    </Screen>
  );
}
