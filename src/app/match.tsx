// 11 매치 성사
import { View } from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useApp } from '@/state/AppContext';
import { Avatar, Button, Card, Txt, type IconName } from '@/components/ui';
import { goTab } from '@/lib/nav';
import { C } from '@/lib/colors';

export default function Match() {
  const { store, me, update } = useApp();
  const insets = useSafeAreaInsets();
  const next: [string, IconName, () => void][] = [
    ['아이디어 보기', 'bulb-outline', () => router.push('/ideas')],
    ['쿠폰 만들기', 'ticket-outline', () => router.push('/coupon')],
    ['성과 보기', 'bar-chart-outline', () => router.push('/results')],
  ];
  return (
    <View className="flex-1 bg-white px-5" style={{ paddingTop: insets.top + 12, paddingBottom: Math.max(insets.bottom, 16) }}>
      <View className="flex-row justify-end">
        <Txt v="title" onPress={() => goTab('mystore')} accessibilityRole="button">내 가게</Txt>
      </View>
      <View className="flex-1 items-center justify-center gap-5">
        <View className="flex-row items-center">
          <Avatar size={72} label={me.short} />
          <View className="-ml-4 rounded-full border-4 border-white"><Avatar size={72} label={store.short} /></View>
        </View>
        <Txt v="h1">매치가 성사됐어요</Txt>
        <Txt tone="sub">{me.name} × {store.name}</Txt>
        <View className="w-full gap-3 pt-4">
          <Txt v="title">이어서 해보세요</Txt>
          <View className="flex-row gap-3">
            {next.map(([label, icon, go]) => (
              <View key={label} className="flex-1">
                <Card onPress={go} gap={8} style={{ alignItems: 'center' }} accessibilityLabel={label}>
                  <Ionicons name={icon} size={26} color={C.charcoal} />
                  <Txt v="bodyBold">{label}</Txt>
                </Card>
              </View>
            ))}
          </View>
        </View>
      </View>
      <Button label="협업 바로 가기" onPress={() => { update({ collabFilter: 'doing' }); goTab('collab'); }} />
    </View>
  );
}
