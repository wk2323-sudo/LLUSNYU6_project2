// 23 알림 설정
import { Platform, Switch, View } from 'react-native';
import { useApp } from '@/state/AppContext';
import { NOTIFICATION_SETTINGS } from '@/data';
import { Screen, Txt } from '@/components/ui';
import { C } from '@/lib/colors';

// 웹 미리보기에서 켜진 스위치 손잡이가 기본 청록색으로 보이지 않게 (react-native-web 전용 속성)
const WEB_THUMB = Platform.OS === 'web' ? ({ activeThumbColor: C.white } as object) : {};

export default function NotificationSettings() {
  const { state, update } = useApp();
  return (
    <Screen title="알림 설정" gap={0}>
      {NOTIFICATION_SETTINGS.map((n) => (
        <View key={n.key} className="min-h-[75px] flex-row items-center gap-3 border-b border-hair">
          <View className="flex-1 gap-0.5">
            <Txt v="bold">{n.title}</Txt>
            <Txt tone="sub">{n.desc}</Txt>
          </View>
          {/* TODO: 알림 설정 저장 API, expo-notifications 권한 요청 */}
          <Switch
            accessibilityLabel={n.title}
            value={state.notifications[n.key]}
            onValueChange={(v) => update((s) => ({ notifications: { ...s.notifications, [n.key]: v } }))}
            trackColor={{ false: C.hair, true: C.brand }}
            thumbColor={C.white}
            ios_backgroundColor={C.hair}
            {...WEB_THUMB}
          />
        </View>
      ))}
      <Txt tone="sub" className="pt-5">
        기기 설정에서 알림이 꺼져 있으면 알림을 받을 수 없어요
      </Txt>
    </Screen>
  );
}
