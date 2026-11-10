// 11 매치 성사
import { View } from 'react-native';
import { router } from 'expo-router';
import { useApp } from '@/state/AppContext';
import { Card, CtaBar, Placeholder, Screen, Txt } from '@/components/ui';
import { goTab } from '@/lib/nav';

export default function Match() {
  const { store } = useApp();
  return (
    <Screen
      title="매치 성사"
      back={false}
      big
      footer={
        <CtaBar
          primary={{ label: '협업 아이디어 보기', onPress: () => router.push('/ideas') }}
          secondary={{ label: '협업 탭으로 가기', onPress: () => goTab('collab') }}
        />
      }
    >
      <View className="items-center gap-4">
        <View className="flex-row items-center gap-4">
          <Placeholder label="내 가게" width={84} height={84} round />
          <Txt v="h28">×</Txt>
          <Placeholder label={store.short} width={84} height={84} round />
        </View>
        <Txt v="h24">매치가 성사됐어요</Txt>
        <View className="items-center">
          <Txt>성수 봄빵 베이커리 × {store.name}</Txt>
          <Txt tone="sub">AI가 협업 아이디어를 준비했어요</Txt>
        </View>
      </View>
      <Card gap={6}>
        <Txt v="bold">다음 순서</Txt>
        <Txt>아이디어 고르기 → 협업 쿠폰 → 홍보 콘텐츠</Txt>
      </Card>
    </Screen>
  );
}
