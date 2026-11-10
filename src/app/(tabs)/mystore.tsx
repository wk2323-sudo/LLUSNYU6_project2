// 21 내 가게
import { Pressable, View } from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useApp } from '@/state/AppContext';
import { INTROS, MY_HISTORY, POSTS, STORES, type StoreId } from '@/data';
import { Button, Card, Placeholder, Screen, Txt } from '@/components/ui';
import { C } from '@/lib/colors';

export default function MyStore() {
  const { state, update } = useApp();

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
    <Screen
      title="내 가게"
      back={false}
      big
      inTab
      right={
        <Pressable
          onPress={() => router.push('/settings')}
          hitSlop={12}
          accessibilityRole="button"
          accessibilityLabel="설정"
        >
          <Ionicons name="settings-outline" size={24} color={C.sub} />
        </Pressable>
      }
    >
      <View className="flex-row items-center gap-3">
        <View>
          <Placeholder label="로고" width={64} height={64} round />
          {/* 사업자 인증 완료 표시 */}
          <View className="absolute -bottom-0.5 -right-1 rounded-full bg-white" accessibilityLabel="사업자 인증 완료">
            <Ionicons name="checkmark-circle-outline" size={24} color={C.brand} />
          </View>
        </View>
        <View className="flex-1">
          <Txt v="h20">{state.form.storeName || '성수 봄빵 베이커리'}</Txt>
          <Txt tone="sub">{state.cat || '베이커리'} · 성수동</Txt>
        </View>
      </View>
      <Txt>{INTROS[state.introIdx]}</Txt>
      <Button
        label="프로필 수정"
        size="md"
        onPress={() => {
          update({ editingProfile: true });
          router.push('/profile-setup');
        }}
      />

      <View className="flex-row gap-2.5">
        {[
          ['진행 중', '1'],
          ['완료', '3'],
          ['쿠폰 사용', '48'],
        ].map(([k, v]) => (
          <View key={k} className="flex-1">
            <Card pad="md" gap={0}>
              <Txt tone="sub">{k}</Txt>
              <Txt v="h22">{v}</Txt>
            </Card>
          </View>
        ))}
      </View>

      <View className="flex-row items-center justify-between">
        <Txt v="h18">협업 이력</Txt>
        <Pressable
          onPress={() => {
            update({ collabFilter: 'past' });
            router.navigate('/collab');
          }}
          hitSlop={8}
        >
          <Txt tone="sub">전체 보기 →</Txt>
        </Pressable>
      </View>
      {MY_HISTORY.map((h) => (
        <Card
          key={h.name}
          pad="row"
          row
          gap={12}
          onPress={() => {
            update({ activeCollab: h });
            router.push('/results');
          }}
        >
          <View className="flex-1">
            <Txt v="bold">{h.name}</Txt>
            <Txt tone="sub">{h.detail}</Txt>
          </View>
          <Txt v="bold" tone="brand">
            성과 보기
          </Txt>
        </Card>
      ))}

      {savedItems.length > 0 && (
        <>
          <Txt v="h18">저장한 가게와 글</Txt>
          {savedItems.map((it) => (
            <Card key={it.key} pad="row" gap={4} onPress={it.open}>
              <Txt v="bold">{it.title}</Txt>
              <Txt tone="sub">{it.sub}</Txt>
            </Card>
          ))}
        </>
      )}
    </Screen>
  );
}
