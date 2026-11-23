// 05 홈
import { View } from 'react-native';
import { router } from 'expo-router';
import { useApp } from '@/state/AppContext';
import { POSTS, STORES, type StoreId } from '@/data';
import { Button, Card, ImageSlot, Screen, SectionTitle, Txt } from '@/components/ui';

const PICKS: { id: StoreId; badge: string }[] = [{ id: 'gyeol', badge: '모집글 열림' }, { id: 'moa', badge: '지난 수락 이력' }];

export default function Home() {
  const { me, update } = useApp();
  // TODO: 홈 데이터 API (추천 파트너, 새로운 협업 기회, 이번 주 동네 소식)
  const post = POSTS[0];
  return (
    <Screen title="홈" back={false} big inTab>
      <View className="gap-0.5">
        <Txt v="title">{me.name} 사장님</Txt>
        <Txt tone="sub">오늘 추천 협업 파트너가 3곳 있어요</Txt>
      </View>

      <SectionTitle title="AI 추천 협업 파트너" />
      <View className="flex-row gap-3">
        {PICKS.map(({ id, badge }) => {
          const s = STORES[id];
          return (
            <View key={id} className="flex-1">
              <Card pad="md" gap={6} onPress={() => router.push(`/store/${id}`)} accessibilityLabel={`${s.name} 가게 프로필`}>
                <ImageSlot height={72} icon />
                <Txt v="title">{s.name}</Txt>
                <Txt tone="sub">{s.cat} · {s.walk}</Txt>
                <Txt>{badge}</Txt>
              </Card>
            </View>
          );
        })}
      </View>
      <Button label="AI 추천 파트너 전체 보기" onPress={() => { update({ exploreMode: '맞춤 추천' }); router.navigate('/explore'); }} />

      <SectionTitle title="새로운 협업 기회" />
      <Card row pad="md" gap={12} onPress={() => router.push('/post/0')}>
        <ImageSlot width={48} height={48} />
        <View className="flex-1">
          <Txt v="title">{post.title}</Txt>
          <Txt tone="sub">{STORES[post.store].name} · 러브콜 {post.calls}개</Txt>
        </View>
      </Card>
      <Card pad="md" gap={2}>
        <Txt v="title">이번 주 동네 소식</Txt>
        <Txt tone="sub">성수 플리마켓 4월 12일 · 봄 시즌 협업 적기</Txt>
      </Card>
    </Screen>
  );
}
