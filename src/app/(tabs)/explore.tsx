// 06 AI 추천 파트너 · 17 모집 게시판 (탐색 탭 안에서 위쪽 세그먼트로 전환)
import { View } from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useApp, type ExploreMode } from '@/state/AppContext';
import { CAT_TO_STORE, POSTS, RECOMMENDED, STORES } from '@/data';
import { Button, Card, ChipGroup, Placeholder, Screen, Segmented, Txt } from '@/components/ui';
import { C } from '@/lib/colors';

const WANT_CATS = ['공방', '꽃집', '빵집', '파티룸', '서점', '카페', '트렌드'];
const BOARD_CATS = ['전체', '공방', '꽃집', '서점', '카페'];
const MODES: readonly ExploreMode[] = ['AI 추천', '모집 게시판'];

function Recommendations() {
  const { state, toggle } = useApp();
  // 고른 업종의 가게를 위로 올려요. TODO: 추천 API에 고른 업종을 넘기기
  const picked = state.wantCats.map((c) => CAT_TO_STORE[c]).filter(Boolean);
  const ids = [...picked, ...RECOMMENDED.filter((id) => !picked.includes(id))];
  return (
    <>
      <Card>
        <Txt v="bold">어떤 업종과 협업하고 싶으세요?</Txt>
        <ChipGroup options={WANT_CATS} value={state.wantCats} onChange={(c) => toggle('wantCats', c)} />
      </Card>
      <Txt v="xs" tone="sub">
        업종이 다르고, 고객층이 겹치고, 분위기가 맞는 가게를 추천해요
      </Txt>
      {ids.map((id) => {
        const s = STORES[id];
        return (
          <Card
            key={id}
            pad="md"
            row
            gap={12}
            onPress={() => router.push(`/store/${id}`)}
            accessibilityLabel={`${s.name} 가게 프로필`}
          >
            <Placeholder label="사진" width={56} height={56} />
            <View className="flex-1">
              <Txt v="bold">{s.name}</Txt>
              <Txt v="sm" tone="sub">
                {s.cat} · {s.walk}
              </Txt>
              <Txt v="sm">{s.badge}</Txt>
            </View>
            <Ionicons name="chevron-forward" size={20} color={C.sub} />
          </Card>
        );
      })}
    </>
  );
}

function RecruitBoard() {
  const { state, update, toast } = useApp();
  const posts = POSTS.map((p, i) => ({ ...p, i })).filter(
    (p) => state.boardCat === '전체' || CAT_TO_STORE[state.boardCat] === p.store,
  );
  const notReady = () => toast('모집글 작성 화면은 다음 버전에서 열려요');
  return (
    <>
      <ChipGroup options={BOARD_CATS} value={state.boardCat} onChange={(c) => update({ boardCat: c })} />
      <Button label="모집글 쓰기" size="md" onPress={notReady} />
      {posts.length ? (
        posts.map((p) => (
          <Card key={p.i} pad="row" gap={4} onPress={() => router.push(`/post/${p.i}`)}>
            <View className="flex-row justify-between">
              <Txt tone="sub">{STORES[p.store].name}</Txt>
              <Txt tone="sub">러브콜 {p.calls}개</Txt>
            </View>
            <Txt v="bold">{p.title}</Txt>
          </Card>
        ))
      ) : (
        <Card>
          <Txt tone="sub" className="text-center">
            이 업종의 모집글이 아직 없어요
          </Txt>
          <Button label="첫 모집글 쓰기" variant="ghost" onPress={notReady} />
        </Card>
      )}
    </>
  );
}

export default function Explore() {
  const { state, update } = useApp();
  return (
    <Screen
      title="탐색"
      back={false}
      big
      inTab
      below={
        <View className="px-3 pt-3">
          <Segmented options={MODES} value={state.exploreMode} onChange={(m) => update({ exploreMode: m })} />
        </View>
      }
    >
      {state.exploreMode === 'AI 추천' ? <Recommendations /> : <RecruitBoard />}
    </Screen>
  );
}
