// 20 협업 탭: 받은 요청 · 보낸 요청 · 진행 · 지난 협업
import { View } from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useApp, type CollabFilter } from '@/state/AppContext';
import { IN_PROGRESS, MATCHES, PAST_COLLABS, RECEIVED_REQUESTS, SAMPLE_SENT, STORES } from '@/data';
import { Chip, FloatingButton, ListItem, Screen, Tag, Txt } from '@/components/ui';
import { C } from '@/lib/colors';

const FILTERS: [CollabFilter, string][] = [['recv', '받은 요청'], ['sent', '보낸 요청'], ['doing', '진행'], ['past', '지난 협업']];

/** 종이비행기. 새 소식이면 차콜, 확인했으면 베이지 */
const Plane = ({ active }: { active: boolean }) => <Ionicons name="paper-plane-outline" size={28} color={active ? C.charcoal : C.mid} />;

export default function CollabTab() {
  const { state, update } = useApp();
  const f = state.collabFilter;
  // TODO: 협업 목록 API (받은 요청, 보낸 요청, 매치, 진행 중, 지난 협업)
  const sent = [
    ...[...state.sentList].reverse().map((r) => ({ name: STORES[r.storeId].name, detail: `${r.title} · 방금 보냄`, isNew: true })),
    ...SAMPLE_SENT,
  ];

  return (
    <Screen title="협업" back={false} big inTab
      floating={<FloatingButton label="협업 만들기" onPress={() => router.push('/create')} />}>
      <View className="flex-row gap-2">
        {FILTERS.map(([k, label]) => (
          <Chip key={k} label={label} fill on={f === k} badge={k === 'doing' && f !== 'doing' ? '1' : undefined}
            onPress={() => update({ collabFilter: k })} />
        ))}
      </View>

      {f === 'recv' && (
        <View className="gap-3">
          <Txt v="title">받은 요청 {RECEIVED_REQUESTS.filter((r) => r.isNew).length}건</Txt>
          {RECEIVED_REQUESTS.map((r, i) => (
            <ListItem key={r.storeId} title={STORES[r.storeId].name} sub={r.detail} right={<Plane active={r.isNew} />}
              onPress={() => router.push(`/received/${i}`)} />
          ))}
        </View>
      )}

      {f === 'sent' && (
        <View className="gap-3">
          <Txt v="title">보낸 요청</Txt>
          {sent.map((r, i) => <ListItem key={i} title={r.name} sub={r.detail} right={<Plane active={r.isNew} />} />)}
        </View>
      )}

      {f === 'doing' && (
        <View className="gap-3">
          <Txt v="title">매치</Txt>
          {MATCHES.map((m) => (
            <ListItem key={m.storeId} title={STORES[m.storeId].name} sub={m.detail}
              onPress={() => { update({ storeId: m.storeId }); router.push('/workspace'); }} />
          ))}
          <Txt v="title" className="mt-4">진행 중</Txt>
          {IN_PROGRESS.map((c) => (
            <ListItem key={c.name} title={c.name} sub={c.detail} right={<Tag label="확인함" />} onPress={() => router.push('/workspace')} />
          ))}
        </View>
      )}

      {f === 'past' && (
        <View className="gap-3">
          <Txt v="title">지난 협업 {PAST_COLLABS.length}건</Txt>
          {PAST_COLLABS.map((c) => (
            <ListItem key={c.name} title={c.name} sub={c.detail} right={<Txt v="title">성과 보기</Txt>} onPress={() => router.push('/results')} />
          ))}
        </View>
      )}
    </Screen>
  );
}
