// 하단 탭바 (홈 · 탐색 · 협업 · 내 가게). Figma 'bottom nav': 떠 있는 둥근 바, 선택된 탭은 베이지 알약.
import { Pressable, View } from 'react-native';
import type { BottomTabBarProps } from 'expo-router/js-tabs';
import { Ionicons } from '@expo/vector-icons';
import { C } from '@/lib/colors';
import { CollabIcon } from './brand';
import { Txt, type IconName } from './ui';

const TABS: Record<string, { label: string; icon?: IconName }> = {
  home: { label: '홈', icon: 'home-outline' },
  explore: { label: '탐색', icon: 'search-outline' },
  collab: { label: '협업' },
  mystore: { label: '내 가게', icon: 'storefront-outline' },
};

export function TabBar({ state, navigateToTab, insets }: BottomTabBarProps) {
  return (
    <View className="bg-white px-5 pt-1.5" style={{ paddingBottom: Math.max(insets.bottom, 10) }}>
      <View className="h-[68px] flex-row items-center rounded-full border border-line bg-white px-1.5"
        style={{ shadowColor: '#000', shadowOpacity: 0.06, shadowRadius: 10, shadowOffset: { width: 0, height: 2 }, elevation: 2 }}
        accessibilityRole="tablist">
        {state.routes.map((route, i) => {
          const tab = TABS[route.name];
          if (!tab) return null;
          const on = state.index === i;
          const color = on ? C.charcoal : C.sub;
          return (
            <Pressable key={route.key} onPress={() => navigateToTab(route.key)} accessibilityRole="tab"
              accessibilityState={{ selected: on }} accessibilityLabel={tab.label}
              className={`h-[57px] flex-1 items-center justify-center gap-0.5 rounded-full ${on ? 'bg-sand' : ''}`}>
              {tab.icon ? <Ionicons name={tab.icon} size={22} color={color} /> : <CollabIcon size={24} color={color} />}
              <Txt v={on ? 'title' : 'body'} tone={on ? 'charcoal' : 'sub'}>{tab.label}</Txt>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}
