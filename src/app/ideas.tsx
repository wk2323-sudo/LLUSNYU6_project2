// 12 AI 협업 아이디어 (AI 추천: 다른 업종끼리 / 같은 업종끼리) · 12 내 아이디어로 시작하기 (직접 설정)
import { useState } from 'react';
import { View } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useApp } from '@/state/AppContext';
import { METHODS_CROSS, METHODS_SAME, PARTNER_PICK, PLAN_SECTIONS } from '@/data';
import { Card, ChipGroup, CtaBar, FormField, Label, Notice, Screen, Segmented, Txt, type IconName } from '@/components/ui';
import { C } from '@/lib/colors';

const MODES = ['AI 추천', '직접 설정'] as const;

export default function Ideas() {
  const params = useLocalSearchParams<{ mode?: string }>();
  const { state, store, me, update, toast } = useApp();
  const [mode, setMode] = useState<(typeof MODES)[number]>(params.mode === 'direct' ? '직접 설정' : 'AI 추천');
  const same = store.cat === me.cat; // 같은 업종이면 동종업계 추천
  const methods = same ? METHODS_SAME : METHODS_CROSS;
  const [picked, setPicked] = useState<string | null>(null);

  const organize = () => {
    // TODO: AI 계획 정리 API (아이디어·상대·원하는 결과 → 다섯 섹션)
    update({ planTexts: Object.fromEntries(PLAN_SECTIONS.map((s) => [s.key, s.text])) });
    router.push('/plan');
  };

  const footer = mode === 'AI 추천'
    ? <CtaBar primary={{ label: '이 방식으로 계획 만들기', disabled: !picked, onPress: organize }}
        secondary={{ label: '직접 아이디어 입력하기', onPress: () => setMode('직접 설정') }} />
    : <CtaBar primary={{ label: 'AI로 정리하기', disabled: !state.form.ciIdea.trim(), onPress: organize }}
        secondary={{ label: 'AI 추천 보기', onPress: () => setMode('AI 추천') }} />;

  return (
    <Screen title={mode === 'AI 추천' ? 'AI 협업 아이디어' : '내 아이디어로 시작하기'} footer={footer}
      below={<View className="px-5 pt-3"><Segmented options={MODES} value={mode} onChange={setMode} /></View>}>
      {mode === 'AI 추천' ? (
        <>
          <View className="gap-1">
            <Txt v="h1">어떤 협업을 해보고 싶으세요?</Txt>
            <Txt tone="sub">원하는 방식을 골라보세요.</Txt>
          </View>
          <Txt v="title">{same ? '같은 업종끼리' : '다른 업종끼리'}</Txt>
          <View className="flex-row flex-wrap gap-3">
            {methods.map((m) => (
              <View key={m.title} style={{ width: '47.5%' }}>
                <Card selected={picked === m.title} gap={8} onPress={() => setPicked(m.title)} accessibilityLabel={m.title}>
                  <Ionicons name={m.icon as IconName} size={28} color={C.charcoal} />
                  <Txt v="title">{m.title}</Txt>
                  <Txt tone="sub">{m.desc}</Txt>
                </Card>
              </View>
            ))}
          </View>
          <Notice title="추천은 참고용이에요" body="마음에 드는 아이디어가 없으면 직접 입력할 수 있어요." />
        </>
      ) : (
        <>
          <FormField name="ciIdea" label="협업 아이디어" badge="필수" multiline
            placeholder="예: 빵 세트에 가죽 키링을 함께 담아 봄 한정 선물 패키지를 만들고 싶어요" />
          <View className="gap-2">
            <Label text="협업 상대" />
            <ChipGroup options={PARTNER_PICK} value={state.partnerPick} fill
              onChange={(v) => { update({ partnerPick: v }); if (v === PARTNER_PICK[0]) toast(`${store.name}을(를) 상대로 정리해요`); }} />
          </View>
          <FormField name="ciResult" label="원하는 결과" placeholder="예: 새로운 단골 고객 만나기" />
          <Notice title="AI가 정리해 드려요" body="입력한 아이디어를 AI가 정리해 주고, 내용은 언제든 직접 고칠 수 있어요." icon="sparkles-outline" />
        </>
      )}
    </Screen>
  );
}
