// 15_2 도구 만들기 (제안서에서 가져온 값은 미리 채워요)
import { router } from 'expo-router';
import { useApp } from '@/state/AppContext';
import { CtaBar, FormField, Notice, Screen, Txt } from '@/components/ui';
import { View } from 'react-native';

export default function ToolBuild() {
  const { state } = useApp();
  return (
    <Screen title="도구 만들기"
      footer={<CtaBar primary={{ label: 'AI로 만들기', disabled: !state.form.tbSchedule.trim(), onPress: () => router.push('/tools/generating') }} />}>
      <View className="gap-1">
        <Txt v="h1">공동 상품 기획서</Txt>
      </View>
      <Notice tone="sand" icon="document-text-outline" title="제안서에서 가져왔어요" body="확정된 내용은 미리 채워 두었어요. 다른 부분은 고쳐 주세요." />
      <FormField name="tbName" label="상품 이름" badge="제안서에서 가져옴" prefilled />
      <FormField name="tbItems" label="구성 상품" badge="제안서에서 가져옴" prefilled />
      <FormField name="tbRoles" label="각 사업자의 역할" badge="제안서에서 가져옴" prefilled />
      <FormField name="tbSchedule" label="제작 일정" badge="필수" placeholder="예: 4월 첫째 주 시안 확정" />
      <FormField name="tbCost" label="비용과 수량" badge="추후 협의" placeholder="정해지면 적어 주세요" />
      <FormField name="tbMemo" label="메모" badge="선택" multiline placeholder="AI에게 전하고 싶은 내용이 있으면 적어 주세요" />
      <Txt tone="sub">합의되지 않은 비용이나 일정은 AI가 정하지 않고 추후 협의로 남겨요.</Txt>
    </Screen>
  );
}
