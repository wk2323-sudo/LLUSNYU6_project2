// 23 알림 설정
import { Platform, Switch, View } from 'react-native';
import { useApp } from '@/state/AppContext';
import { NOTIFICATION_SETTINGS } from '@/data';
import { Screen, Txt } from '@/components/ui';
import { C } from '@/lib/colors';


const WEB_THUMB = Platform.OS === 'web' ? ({ activeThumbColor: C.white } as object) : {};

export default function NotificationSettings() {
  const { state, update } = useApp();
  return (
    <Screen title="알림 설정" gap={0}>
      {NOTIFICATION_SETTINGS.map((n) => (
        <View key={n.key} className="min-h-[75px] flex-row items-center gap-3 border-b border-line">
          <View className="flex-1 gap-0.5">
            <Txt v="title">{n.title}</Txt>
            <Txt tone="sub">{n.desc}</Txt>
          </View>
          {/* TODO: 알림 설정 저장 API, expo-notifications 권한 요청 */}
          <Switch
            accessibilityLabel={n.title}
            value={state.notifications[n.key]}
            onValueChange={(v) => update((s) => ({ notifications: { ...s.notifications, [n.key]: v } }))}
            trackColor={{ false: C.line, true: C.charcoal }}
            thumbColor={C.white}
            ios_backgroundColor={C.line}
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
