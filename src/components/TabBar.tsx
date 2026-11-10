// 하단 탭바 (홈 · 탐색 · 협업 · 내 가게). 선택된 탭은 파란색이에요.
import { Pressable, View } from 'react-native';
import type { BottomTabBarProps } from 'expo-router/js-tabs';
import { Ionicons } from '@expo/vector-icons';
import { C } from '@/lib/colors';
import { Txt } from './ui';

type IconName = React.ComponentProps<typeof Ionicons>['name'];

const TABS: Record<string, { label: string; icon: IconName; iconOn: IconName }> = {
  home: { label: '홈', icon: 'home-outline', iconOn: 'home' },
  explore: { label: '탐색', icon: 'search-outline', iconOn: 'search' },
  collab: { label: '협업', icon: 'people-outline', iconOn: 'people' },
  mystore: { label: '내 가게', icon: 'storefront-outline', iconOn: 'storefront' },
};

export function TabBar({ state, navigateToTab, insets }: BottomTabBarProps) {
  return (
    <View
      className="flex-row border-t border-hair bg-white px-2"
      style={{ paddingBottom: Math.max(insets.bottom, 8) }}
      accessibilityRole="tablist"
    >
      {state.routes.map((route, i) => {
        const tab = TABS[route.name];
        if (!tab) return null;
        const on = state.index === i;
        return (
          <Pressable
            key={route.key}
            onPress={() => navigateToTab(route.key)}
            accessibilityRole="tab"
            accessibilityState={{ selected: on }}
            accessibilityLabel={tab.label}
            className="h-14 flex-1 items-center justify-center gap-0.5"
          >
            <Ionicons name={on ? tab.iconOn : tab.icon} size={20} color={on ? C.brand : C.sub} />
            <Txt v="xs" tone={on ? 'brand' : 'sub'}>
              {tab.label}
            </Txt>
          </Pressable>
        );
      })}
    </View>
  );
}
