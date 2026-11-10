// 20 협업 탭: 받은 요청 · 보낸 요청 · 진행 · 지난 협업
import { View } from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useApp, type CollabFilter } from '@/state/AppContext';
import { IN_PROGRESS, MATCHES, PAST_COLLABS, RECEIVED_REQUESTS, SAMPLE_SENT, STORES } from '@/data';
import { Card, Chip, Screen, TitleRow, Txt } from '@/components/ui';
import { C } from '@/lib/colors';

const FILTERS: [CollabFilter, string][] = [
  ['recv', '받은 요청'],
  ['sent', '보낸 요청'],
  ['doing', '진행'],
  ['past', '지난 협업'],
];

/** 종이비행기. 파란색은 새 소식, 회색은 확인함 */
function Plane({ active }: { active: boolean }) {
  return <Ionicons name="paper-plane-outline" size={26} color={active ? C.brand : C.line} />;
}

/** 왼쪽 가게 이름과 설명, 오른쪽 아이콘이나 링크가 있는 목록 카드 */
function ListCard({
  title,
  detail,
  right,
  filled = false,
  onPress,
}: {
  title: string;
  detail: string;
  right?: React.ReactNode;
  filled?: boolean;
  onPress?: () => void;
}) {
  return (
    <Card
      pad="row"
      row
      gap={12}
      bg={filled ? 'brand' : 'white'}
      border={filled ? 'brand' : 'line'}
      onPress={onPress}
      style={{ minHeight: 72 }}
    >
      <View className="flex-1">
        <Txt v="bold" tone={filled ? 'white' : 'ink'}>
          {title}
        </Txt>
        <Txt tone={filled ? 'soft' : 'sub'}>{detail}</Txt>
      </View>
      {right}
    </Card>
  );
}

export default function CollabTab() {
  const { state, update } = useApp();
  const f = state.collabFilter;

  // 앱에서 보낸 요청이 위로, 예시 요청이 아래로 와요
  const sent = [
    ...[...state.sentList]
      .reverse()
      .map((r) => ({ name: STORES[r.storeId].name, detail: `${r.type} · ${r.when || '미정'}`, isNew: true })),
    ...SAMPLE_SENT,
  ];

  return (
    <Screen title="협업" back={false} big inTab>
      {/* 네 칩을 한 줄에 똑같이 나눠 담아요 (좁은 폰에서도 줄바꿈 없이) */}
      <View className="flex-row gap-2">
        {FILTERS.map(([k, label]) => (
          <Chip
            key={k}
            label={label}
            fill
            on={f === k}
            badge={k === 'doing' && f !== 'doing' ? '1' : undefined}
            onPress={() => update({ collabFilter: k })}
          />
        ))}
      </View>

      {f === 'recv' && (
        <>
          <Txt v="h18">받은 요청 {RECEIVED_REQUESTS.filter((r) => r.isNew).length}건</Txt>
          {RECEIVED_REQUESTS.map((r, i) => (
            <ListCard
              key={r.storeId}
              title={STORES[r.storeId].name}
              detail={r.detail}
              right={<Plane active={r.isNew} />}
              onPress={() => router.push(`/received/${i}`)}
            />
          ))}
        </>
      )}

      {f === 'sent' && (
        <>
          <Txt v="h18">보낸 요청</Txt>
          {sent.map((r, i) => (
            <ListCard key={i} title={r.name} detail={r.detail} right={<Plane active={r.isNew} />} />
          ))}
        </>
      )}

      {f === 'doing' && (
        <>
          <Txt v="h18">매치</Txt>
          {MATCHES.map((m) => (
            <ListCard
              key={m.storeId}
              filled
              title={STORES[m.storeId].name}
              detail={m.detail}
              onPress={() => {
                update({ storeId: m.storeId, activeCollab: null });
                router.push('/match');
              }}
            />
          ))}
          <Txt v="h18" className="mt-2">
            진행 중
          </Txt>
          {IN_PROGRESS.map((c) => (
            <Card
              key={c.name}
              pad="row"
              gap={2}
              onPress={() => {
                update({ activeCollab: c });
                router.push('/collab-detail');
              }}
            >
              <TitleRow title={c.name} aside="확인함" />
              <Txt tone="sub">{c.detail}</Txt>
            </Card>
          ))}
        </>
      )}

      {f === 'past' && (
        <>
          <Txt v="h18">지난 협업 {PAST_COLLABS.length}건</Txt>
          {PAST_COLLABS.map((c) => (
            <ListCard
              key={c.name}
              title={c.name}
              detail={c.detail ?? ''}
              right={
                <Txt v={c.isNew ? 'bold' : 'body'} tone={c.isNew ? 'brand' : 'sub'}>
                  성과 보기
                </Txt>
              }
              onPress={() => {
                update({ activeCollab: c });
                router.push('/results');
              }}
            />
          ))}
        </>
      )}
    </Screen>
  );
}
