// 05 홈
import { View } from 'react-native';
import { router } from 'expo-router';
import { useApp } from '@/state/AppContext';
import { STORES, type StoreId } from '@/data';
import { Button, Card, Placeholder, Screen, Txt } from '@/components/ui';

export default function Home() {
  const { state, update } = useApp();
  return (
    <Screen title="홈" back={false} big inTab>
      <View>
        <Txt v="h20">{state.form.storeName || '성수 봄빵 베이커리'} 사장님</Txt>
        <Txt tone="sub">오늘 추천 협업 파트너가 3곳 있어요</Txt>
      </View>

      <Txt v="h18">AI 추천 협업 파트너</Txt>
      <View className="flex-row gap-3">
        {(['gyeol', 'moa'] as StoreId[]).map((id) => {
          const s = STORES[id];
          return (
            <View key={id} className="flex-1">
              <Card
                pad="md"
                gap={6}
                onPress={() => router.push(`/store/${id}`)}
                accessibilityLabel={`${s.name} 가게 프로필`}
              >
                <Placeholder label="사진" height={72} />
                <Txt v="bold">{s.name}</Txt>
                <Txt tone="sub">
                  {s.cat} · {s.walk}
                </Txt>
                <Txt>{id === 'moa' ? '지난 수락 이력' : s.badge}</Txt>
              </Card>
            </View>
          );
        })}
      </View>
      <Button
        label="AI 추천 파트너 전체 보기"
        onPress={() => {
          update({ exploreMode: 'AI 추천' });
          router.navigate('/explore');
        }}
      />

      <Txt v="h18">새로운 협업 기회</Txt>
      <Card pad="md" row gap={12} onPress={() => router.push('/post/0')}>
        <Placeholder label="사진" width={48} height={48} />
        <View className="flex-1">
          <Txt v="bold">봄 한정 상품 같이 만들 가게 구해요</Txt>
          <Txt tone="sub">가죽공방 결 · 러브콜 3개</Txt>
        </View>
      </Card>
      <Card pad="md" gap={2}>
        <Txt v="bold">이번 주 동네 소식</Txt>
        <Txt tone="sub">성수 플리마켓 4월 12일 · 봄 시즌 협업 적기</Txt>
      </Card>
    </Screen>
  );
}
