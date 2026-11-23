// 15 협업 워크스페이스
import { View } from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useApp } from '@/state/AppContext';
import { PROJECT, TOOLS, WORKSPACE_TOOLS } from '@/data';
import { Card, CtaBar, Divider, Screen, StatusRow, Tag, Txt } from '@/components/ui';
import { C } from '@/lib/colors';

export default function Workspace() {
  const { toast } = useApp();
  const openTool = (key: string, status: string) => {
    if (key === 'plan' && status === '초안') router.push('/tools/plan');
    else router.push('/tools/select');
  };
  return (
    <Screen title="협업 워크스페이스"
      footer={<CtaBar primary={{ label: '새로운 도구 만들기', onPress: () => router.push('/tools/select') }}
        secondary={{ label: '도구 보관함', onPress: () => router.push('/tools/box') }} />}>
      <Card bg="cream" border="none" gap={6}>
        <Tag label="협업 진행 중" tone="dark" small />
        <Txt tone="sub">{PROJECT.pair}</Txt>
        <Txt v="h1">{PROJECT.title}</Txt>
      </Card>
      <View className="gap-3">
        <StatusRow label="협업 목적" value={PROJECT.purpose} status="확정" />
        <StatusRow label="예정 일정" value={PROJECT.schedule} status="확인 필요" />
      </View>
      <Divider />
      <View className="gap-3">
        <Txt v="title">합의된 내용</Txt>
        {PROJECT.agreed.map((a) => <StatusRow key={a.label} label={a.label} value={a.value} status={a.status} />)}
      </View>
      <Divider />
      <View className="gap-3">
        <View className="gap-1">
          <View className="flex-row items-center gap-1.5">
            <Ionicons name="sparkles-outline" size={18} color={C.charcoal} />
            <Txt v="title">AI 도구</Txt>
          </View>
          <Txt tone="sub">협업에 맞는 도구를 AI가 추천해요. 필요한 것만 만들어도 돼요.</Txt>
        </View>
        {WORKSPACE_TOOLS.map((t) => (
          <Card key={t.key} row gap={12} onPress={() => openTool(t.key, t.status)} accessibilityLabel={TOOLS[t.key].title}>
            <View className="flex-1 gap-0.5">
              <Txt v="title">{TOOLS[t.key].title}</Txt>
              <Txt tone="sub">{t.sub ?? TOOLS[t.key].desc}</Txt>
            </View>
            <Tag label={t.status} tone={t.status === '추천' ? 'yellow' : 'line'} small />
          </Card>
        ))}
      </View>
      <Divider />
      <View className="gap-3">
        <Txt v="title">협업 활동</Txt>
        {PROJECT.activity.map((a) => <StatusRow key={a.what} label={a.who} value={a.what} status={a.status} />)}
        <Txt v="bodyBold" onPress={() => toast('제안함 대화는 다음 버전에서 열려요')} accessibilityRole="button">제안함에서 대화 보기 →</Txt>
      </View>
    </Screen>
  );
}
