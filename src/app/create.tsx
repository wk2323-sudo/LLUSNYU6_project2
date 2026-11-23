// 12 협업 만들기 (협업 탭 > 협업 만들기)
import { View } from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { PROJECT } from '@/data';
import { Card, CtaBar, Screen, Tag, Txt } from '@/components/ui';
import { C } from '@/lib/colors';

export default function Create() {
  return (
    <Screen title="협업 만들기"
      footer={<CtaBar primary={{ label: 'AI 협업 추천받기', onPress: () => router.push('/ideas') }}
        secondary={{ label: '직접 아이디어 만들기', onPress: () => router.push('/ideas?mode=direct') }} />}>
      <Txt tone="sub">AI가 가게에 맞는 협업을 추천하거나, 이미 있는 아이디어를 실행 가능한 계획으로 정리해 드려요.</Txt>
      <View className="gap-3">
        <Txt v="title">이런 협업은 어때요?</Txt>
        <Card bg="yellow-soft" border="none" gap={6} onPress={() => router.push('/plan')}>
          <View className="flex-row gap-1.5"><Tag label="이종업계" tone="yellow" small /><Tag label="공동 상품 번들" small /></View>
          <Txt v="title">{PROJECT.title}</Txt>
          <Txt tone="sub">베이커리 × 가죽공방</Txt>
        </Card>
      </View>
      <View className="gap-3">
        <Txt v="title">진행 중인 협업</Txt>
        <Card gap={6} onPress={() => router.push('/workspace')}>
          <View className="flex-row items-center justify-between">
            <Txt v="title" className="flex-shrink">{PROJECT.pair}</Txt>
            <Tag label="진행 중" tone="dark" small />
          </View>
          <View className="flex-row items-center gap-1">
            <Ionicons name="arrow-forward-circle-outline" size={16} color={C.sub} />
            <Txt tone="sub">다음 할 일 · 공동 상품 기획서 확인</Txt>
          </View>
        </Card>
      </View>
    </Screen>
  );
}
