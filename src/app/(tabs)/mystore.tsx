// 21 내 가게
import { Pressable, View } from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useApp } from '@/state/AppContext';
import { MY_HISTORY, POSTS, STORES, type StoreId } from '@/data';
import { Avatar, Button, ListItem, Screen, SectionTitle, TextButton, Txt } from '@/components/ui';
import { C } from '@/lib/colors';

export default function MyStore() {
  const { state, me, update } = useApp();
  const savedItems = state.saved.map((k) => {
    const [type, id] = k.split(':');
    if (type === 'store') {
      const s = STORES[id as StoreId];
      return { key: k, title: s.name, sub: `${s.cat} · ${s.walk}`, open: () => router.push(`/store/${id}`) };
    }
    const p = POSTS[Number(id)];
    return { key: k, title: p.title, sub: STORES[p.store].name, open: () => router.push(`/post/${id}`) };
  });

  return (
    <Screen title="내 가게" back={false} big inTab
      right={(
        <Pressable onPress={() => router.push('/settings')} hitSlop={12} accessibilityRole="button" accessibilityLabel="설정">
          <Ionicons name="settings-outline" size={24} color={C.charcoal} />
        </Pressable>
      )}>
      <View className="flex-row items-center gap-3">
        <View>
          <Avatar size={64} label="로고" />
          <View className="absolute -bottom-0.5 -right-1.5 rounded-full bg-white" accessibilityLabel="사업자 인증 완료">
            <Ionicons name="checkmark-circle-outline" size={26} color={C.charcoal} />
          </View>
        </View>
        <View className="flex-1">
          <Txt v="title">{me.name}</Txt>
          <Txt tone="sub">{me.cat} · {me.area}</Txt>
        </View>
      </View>
      <Txt>{me.intro}</Txt>
      <Button label="프로필 수정" onPress={() => router.push('/my-profile')} />

      <SectionTitle title="협업 이력" action={(
        <TextButton label="전체 보기 →" onPress={() => { update({ collabFilter: 'past' }); router.navigate('/collab'); }} />
      )} />
      <View className="gap-3">
        {MY_HISTORY.map((h) => (
          <ListItem key={h.name} title={h.name} sub={h.detail} right={<Txt v="title">성과 보기</Txt>} onPress={() => router.push('/results')} />
        ))}
      </View>

      {savedItems.length > 0 && (
        <View className="gap-3">
          <SectionTitle title="저장한 가게와 글" />
          {savedItems.map((it) => <ListItem key={it.key} title={it.title} sub={it.sub} onPress={it.open} />)}
        </View>
      )}
    </Screen>
  );
}
