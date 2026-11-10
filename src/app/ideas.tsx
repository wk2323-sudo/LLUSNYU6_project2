// 12 AI 협업 아이디어 · 12 협업 방향 직접 설정 (위쪽 세그먼트로 전환)
import { useState } from 'react';
import { View } from 'react-native';
import { router } from 'expo-router';
import { useApp } from '@/state/AppContext';
import { DIRECTIONS, GOALS, IDEA_POOL } from '@/data';
import { Button, Card, ChipGroup, CtaBar, FormField, Screen, Segmented, TitleRow, Txt } from '@/components/ui';

type Mode = 'AI 추천' | '직접 설정';
const MODES: readonly Mode[] = ['AI 추천', '직접 설정'];

function AiIdeas() {
  const { state, update } = useApp();
  return (
    <>
      {state.ideas.map((ix, i) => {
        const idea = IDEA_POOL[ix];
        const on = state.ideaSel === i;
        return (
          <Card key={ix} gap={2} selected={on} onPress={() => update({ ideaSel: i })} accessibilityLabel={idea.title}>
            <TitleRow title={idea.title} aside={on ? '선택됨' : null} />
            <Txt>{idea.desc}</Txt>
            <Txt tone="sub">{idea.meta}</Txt>
          </Card>
        );
      })}
      {state.poolNext < IDEA_POOL.length && (
        <Button
          label="아이디어 더 보기 +"
          variant="ghost"
          onPress={() => update((s) => ({ ideas: [...s.ideas, s.poolNext], poolNext: s.poolNext + 1 }))}
        />
      )}
    </>
  );
}

function CustomDirection() {
  const { state, update, toggle } = useApp();
  return (
    <>
      <View className="gap-2">
        <Txt v="bold">큰 방향 (협업 유형)</Txt>
        <ChipGroup options={DIRECTIONS} value={state.direction} onChange={(d) => update({ direction: d })} />
      </View>
      <View className="gap-2">
        <Txt v="bold">목표</Txt>
        <ChipGroup options={GOALS} value={state.goals} onChange={(g) => toggle('goals', g)} />
      </View>
      <FormField
        name="customDetail"
        label="세부 내용"
        multiline
        placeholder="예: 빵 세트에 가죽 키링을 함께 담아 봄 한정으로 판매하고 싶어요"
      />
      <FormField name="customWhen" label="희망 시기" placeholder="예: 4월 첫째 주부터 2주" />
    </>
  );
}

export default function Ideas() {
  const { state, store, update, toast } = useApp();
  const [mode, setMode] = useState<Mode>('AI 추천');

  const proceed = () => {
    const title =
      mode === 'AI 추천'
        ? IDEA_POOL[state.ideas[state.ideaSel]].title
        : state.form.customDetail.trim()
          ? `${state.direction} · 직접 설정`
          : `${state.direction} 협업`;
    update({ activeCollab: { name: store.name, title } });
    router.push('/coupon');
  };
  const reshuffle = () => {
    // TODO: AI 아이디어 API 재호출. 지금은 아이디어 풀에서 무작위로 4개를 골라요.
    const idx = IDEA_POOL.map((_, i) => i)
      .sort(() => Math.random() - 0.5)
      .slice(0, 4);
    update({ ideas: idx, ideaSel: 0, poolNext: IDEA_POOL.length });
    toast('새 아이디어를 추천했어요');
  };

  return (
    <Screen
      title={mode === 'AI 추천' ? 'AI 협업 아이디어' : '협업 방향 직접 설정'}
      gap={12}
      footer={
        <CtaBar
          primary={{ label: '이 방향으로 협업 진행하기', onPress: proceed }}
          secondary={
            mode === 'AI 추천'
              ? { label: '다시 추천받기', onPress: reshuffle }
              : { label: '다시 AI 추천 보기', onPress: () => setMode('AI 추천') }
          }
        />
      }
    >
      <Segmented options={MODES} value={mode} onChange={setMode} />
      {mode === 'AI 추천' ? <AiIdeas /> : <CustomDirection />}
    </Screen>
  );
}
