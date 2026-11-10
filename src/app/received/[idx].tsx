// 10 받은 요청 상세
import { router, useLocalSearchParams } from 'expo-router';
import { useApp } from '@/state/AppContext';
import { RECEIVED_REQUESTS, STORES } from '@/data';
import { Card, CtaBar, InfoRow, Screen, StaticChips, StoreHead, Txt } from '@/components/ui';
import { goTab } from '@/lib/nav';

export default function ReceivedRequest() {
  const { idx } = useLocalSearchParams<{ idx: string }>();
  const { update, toast } = useApp();
  const req = RECEIVED_REQUESTS[Number(idx)] ?? RECEIVED_REQUESTS[0];
  const s = STORES[req.storeId];

  const accept = () => {
    // TODO: 요청 수락 API
    update({ storeId: req.storeId, activeCollab: null });
    router.replace('/match');
  };
  const reject = () => {
    update({ collabFilter: 'recv' });
    goTab('collab');
    toast('요청을 거절했어요');
  };

  return (
    <Screen
      title="받은 요청"
      gap={14}
      footer={
        <CtaBar primary={{ label: '수락하기', onPress: accept }} secondary={{ label: '거절하기', onPress: reject }} />
      }
    >
      <StoreHead name={s.name} sub={`${s.cat} · 성수동`} />
      <StaticChips items={s.tags} />
      <Card gap={6}>
        <Txt v="bold">받은 메시지</Txt>
        <Txt>{req.message}</Txt>
      </Card>
      <Card pad="row">
        <InfoRow label="협업 유형" value={req.type} />
        <InfoRow label="희망 시기" value={req.when} />
      </Card>
      <Card gap={2}>
        <Txt v="bold">AI 적합도 요약</Txt>
        <Txt>업종이 달라요 · 고객층이 겹쳐요 · 분위기가 비슷해요</Txt>
      </Card>
    </Screen>
  );
}
