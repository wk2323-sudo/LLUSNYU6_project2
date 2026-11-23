// 10 받은 요청 상세 + 10_1 수락 확인 + 10_2 거절 사유
// 제안 상세 카드를 꾹 누르면 '킵'해요. 킵한 항목은 수락 후 협업 상세로 이어져요.
import { useState } from 'react';
import { View } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useApp } from '@/state/AppContext';
import { KEEP_ITEMS, RECEIVED_REQUESTS, REJECT_REASONS, STORES, type KeepItem } from '@/data';
import { Avatar, BottomSheet, Button, Card, Chip, CtaBar, Label, Screen, Tag, Txt } from '@/components/ui';
import { goTab } from '@/lib/nav';
import { C } from '@/lib/colors';

export default function Received() {
  const { idx } = useLocalSearchParams<{ idx: string }>();
  const r = RECEIVED_REQUESTS[Number(idx)] ?? RECEIVED_REQUESTS[0];
  const s = STORES[r.storeId];
  const { state, update, toast } = useApp();
  const [sheet, setSheet] = useState<'accept' | 'reject' | null>(null);
  const values: Record<KeepItem, string> = { '협업 방식': r.method, '희망 일정': r.schedule, '역할·비용': r.roles };

  const keep = (k: KeepItem) => update((st) => ({ kept: st.kept.includes(k) ? st.kept.filter((x) => x !== k) : [...st.kept, k] }));
  const accept = () => {
    // TODO: 요청 수락 API (킵한 항목 함께 전달)
    setSheet(null);
    update({ storeId: r.storeId });
    router.replace('/match');
  };
  const reject = () => {
    // TODO: 요청 거절 API (거절 사유는 추천 개선에 사용)
    setSheet(null);
    update({ rejectReasons: [], collabFilter: 'recv' });
    goTab('collab');
    toast('요청을 거절했어요');
  };

  return (
    <Screen title="받은 요청"
      footer={<CtaBar primary={{ label: '수락하기', onPress: () => setSheet('accept') }} secondary={{ label: '거절하기', onPress: () => setSheet('reject') }} />}>
      <View className="flex-row items-center gap-3">
        <Avatar size={56} label="로고" />
        <View className="flex-1">
          <Txt v="title">{s.name}</Txt>
          <Txt tone="sub">{s.cat} · {s.area}</Txt>
        </View>
      </View>
      <Txt v="h1">{r.title}</Txt>
      <Card bg="cream" border="none"><Txt>{r.message}</Txt></Card>
      <View className="gap-2">
        <Label text="AI가 찾은 협업 접점" ai />
        <View className="flex-row flex-wrap gap-2">{r.touchpoints.map((t) => <Tag key={t} label={t} tone="yellow" />)}</View>
      </View>
      <View className="gap-2">
        <Label text="제안 상세" right={<Txt v="caption" tone="sub">꾹 눌러 킵하기</Txt>} />
        {KEEP_ITEMS.map((k) => {
          const on = state.kept.includes(k);
          return (
            <Card key={k} row gap={12} selected={on} onLongPress={() => keep(k)} onPress={() => on && keep(k)}
              accessibilityLabel={`${k} ${values[k]}${on ? ', 킵함' : ''}`}>
              <Txt tone="sub" className="w-[72px]">{k}</Txt>
              <Txt className="flex-1">{values[k]}</Txt>
              {on && <Ionicons name="bookmark" size={18} color={C.charcoal} />}
            </Card>
          );
        })}
      </View>

      <BottomSheet visible={sheet === 'accept'} onClose={() => setSheet(null)} label="수락할까요?">
        <View className="gap-5 p-5">
          <View className="gap-1">
            <Txt v="h1">수락할까요?</Txt>
            <Txt tone="sub">{s.name}와 협업을 시작해요</Txt>
          </View>
          {state.kept.length > 0 && (
            <Card bg="cream" border="none" gap={6}>
              <Txt v="title">킵한 항목 {state.kept.length}개</Txt>
              {state.kept.map((k) => <Txt key={k}>· {k}: {values[k]}</Txt>)}
              <Txt tone="sub">협업 상세에서 이어서 이야기해요</Txt>
            </Card>
          )}
          <Button label="수락하기" onPress={accept} />
        </View>
      </BottomSheet>

      <BottomSheet visible={sheet === 'reject'} onClose={() => setSheet(null)} label="거절 사유">
        <View className="gap-5 p-5">
          <View className="gap-1">
            <Txt v="h1">거절하는 이유를 알려주세요</Txt>
            <Txt tone="sub">나에게 꼭 맞는 추천을 받는 데 도움이 돼요</Txt>
          </View>
          <View className="flex-row flex-wrap gap-2">
            {REJECT_REASONS.map((x) => (
              <Chip key={x} label={x} on={state.rejectReasons.includes(x)}
                onPress={() => update((st) => ({ rejectReasons: st.rejectReasons.includes(x) ? st.rejectReasons.filter((y) => y !== x) : [...st.rejectReasons, x] }))} />
            ))}
          </View>
          <View className="gap-3">
            <Button label="거절하기" onPress={reject} />
            <Button label="돌아가기" variant="secondary" onPress={() => setSheet(null)} />
          </View>
        </View>
      </BottomSheet>
    </Screen>
  );
}
