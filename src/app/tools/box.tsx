// 15_8 협업 도구 보관함
import { View } from 'react-native';
import { router } from 'expo-router';
import { useApp } from '@/state/AppContext';
import { PROJECT, TOOLBOX } from '@/data';
import { Card, ChipGroup, Notice, Screen, Tag, TextButton, Txt } from '@/components/ui';

const FILTERS = ['전체', '초안', '검토 중', '확정'] as const;
const ROUTE = { plan: '/tools/plan', form: '/tools/form', content: '/content', schedule: '/tools/select' } as const;

export default function ToolBox() {
  const { state, update } = useApp();
  const items = TOOLBOX.map((t) => ({ ...t, status: state.toolStatus[t.key] }))
    .filter((t) => state.toolboxFilter === '전체' || t.status === state.toolboxFilter);
  const reviewing = TOOLBOX.some((t) => state.toolStatus[t.key] === '검토 중');
  return (
    <Screen title="협업 도구 보관함">
      <ChipGroup options={FILTERS} value={state.toolboxFilter} fill onChange={(f) => update({ toolboxFilter: f })} />
      <View className="gap-0.5">
        <Txt tone="sub">{PROJECT.pair}</Txt>
        <Txt v="title">{PROJECT.title}</Txt>
      </View>
      {reviewing && <Notice tone="sand" icon="people-outline" title="공동 검토 중이에요" body="파트너가 수정한 내용은 함께 확인하기 전까지 확정되지 않아요." />}
      <View className="gap-3">
        {items.length ? items.map((t) => (
          <Card key={t.key} row gap={12} onPress={() => router.push(ROUTE[t.key])} accessibilityLabel={t.title}>
            <View className="flex-1 gap-0.5">
              <Txt v="title">{t.title}</Txt>
              <Txt tone="sub">{t.sub}</Txt>
            </View>
            <Tag label={t.status} tone={t.status === '검토 중' ? 'yellow' : t.status === '확정' ? 'dark' : 'line'} small />
          </Card>
        )) : <Txt tone="sub">이 상태의 도구가 아직 없어요.</Txt>}
      </View>
      <TextButton label="+ 새로운 도구 만들기" tone="charcoal" onPress={() => router.push('/tools/select')} />
    </Screen>
  );
}
