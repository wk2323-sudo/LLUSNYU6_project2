// 09 요청 완료
import { View } from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { ALSO_LIKE, STORES } from '@/data';
import { Card, ImageSlot, Screen, SectionTitle, Tag, Txt } from '@/components/ui';
import { goTab } from '@/lib/nav';
import { useApp } from '@/state/AppContext';
import { C } from '@/lib/colors';

export default function RequestSent() {
  const { update } = useApp();
  const done = () => { update({ collabFilter: 'sent' }); goTab('collab'); };
  return (
    <Screen back={false} headerBorder={false} right={<Txt v="title" onPress={done} accessibilityRole="button">완료</Txt>}>
      <View className="items-center gap-3 py-8">
        <View className="h-16 w-16 items-center justify-center rounded-full bg-yellow">
          <Ionicons name="paper-plane-outline" size={30} color={C.charcoal} />
        </View>
        <Txt v="h1">요청을 보냈어요</Txt>
        <Txt tone="sub">상대가 수락하면 알림으로 알려드려요</Txt>
      </View>
      <SectionTitle title="이런 가게도 있어요" />
      <View className="gap-3">
        {ALSO_LIKE.map(({ id, badge }) => {
          const s = STORES[id];
          return (
            <Card key={id} row pad="md" gap={12} onPress={() => router.push(`/store/${id}`)} accessibilityLabel={s.name}>
              <ImageSlot width={56} height={56} label="사진" icon={false} />
              <View className="flex-1 gap-1">
                <Txt v="title">{s.name}</Txt>
                <Txt tone="sub">{s.cat} · {s.walk}</Txt>
              </View>
              <Tag label={badge} />
            </Card>
          );
        })}
      </View>
    </Screen>
  );
}
