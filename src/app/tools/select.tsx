// 15_1 도구 선택
import { View } from 'react-native';
import { router } from 'expo-router';
import { useApp } from '@/state/AppContext';
import { TOOLS, TOOLS_BY_TYPE, TOOL_TYPES, type ToolKey } from '@/data';
import { Card, CheckBox, ChipGroup, CtaBar, FormField, Label, Screen, Txt } from '@/components/ui';
import { goBack } from '@/lib/nav';

export default function ToolSelect() {
  const { state, update } = useApp();
  const list = TOOLS_BY_TYPE[state.toolType];
  const pick = (k: ToolKey) => update((s) => ({ toolsPicked: s.toolsPicked.includes(k) ? s.toolsPicked.filter((x) => x !== k) : [...s.toolsPicked, k] }));
  const canNext = state.toolsPicked.some((k) => list.includes(k)) || state.form.toolDesc.trim().length > 0;
  return (
    <Screen title="도구 선택"
      footer={<CtaBar primary={{ label: '다음', disabled: !canNext, onPress: () => router.push('/tools/build') }}
        secondary={{ label: '도구 없이 계속하기', onPress: goBack }} />}>
      <View className="gap-1">
        <Txt v="h1">무엇을 만들까요?</Txt>
        <Txt tone="sub">협업 유형에 맞춰 AI가 추천한 도구예요. 필요한 것만 골라 주세요.</Txt>
      </View>
      <View className="gap-2">
        <Label text="협업 유형" />
        <ChipGroup scroll options={TOOL_TYPES} value={state.toolType}
          onChange={(t) => update({ toolType: t, toolsPicked: TOOLS_BY_TYPE[t].slice(0, 2) })} />
      </View>
      <View className="gap-2">
        <Label text="추천 도구" ai />
        {list.map((k) => {
          const on = state.toolsPicked.includes(k);
          return (
            <Card key={k} row gap={12} selected={on} onPress={() => pick(k)} accessibilityLabel={TOOLS[k].title}>
              <CheckBox checked={on} />
              <View className="flex-1 gap-0.5">
                <Txt v="title">{TOOLS[k].title}</Txt>
                <Txt tone="sub">{TOOLS[k].desc}</Txt>
              </View>
            </Card>
          );
        })}
      </View>
      <FormField name="toolDesc" label="필요한 도구를 직접 설명해 주세요." multiline
        placeholder="예: 두 가게가 함께 사용할 준비물 체크리스트를 만들어줘." />
      <Txt tone="sub">도구를 고르지 않아도 협업은 계속할 수 있어요.</Txt>
    </Screen>
  );
}
