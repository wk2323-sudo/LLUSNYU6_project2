// 07 가게 프로필
import { router, useLocalSearchParams } from 'expo-router';
import { useApp } from '@/state/AppContext';
import { REQUEST_MESSAGES, STORES, type StoreId } from '@/data';
import { Card, CtaBar, Placeholder, Screen, StaticChips, StoreHead, Txt } from '@/components/ui';

export default function StoreProfile() {
  const { id } = useLocalSearchParams<{ id: StoreId }>();
  const { state, update, toggle, toast } = useApp();
  const s = STORES[id] ?? STORES.gyeol;
  const key = `store:${s.id}`;
  const saved = state.saved.includes(key);

  const request = () => {
    update((st) => ({
      storeId: s.id,
      msgIdx: 0,
      reqType: '한정 상품',
      form: { ...st.form, message: REQUEST_MESSAGES[0](s) },
    }));
    router.push('/request');
  };
  const save = () => {
    toggle('saved', key);
    toast(saved ? '저장을 취소했어요' : '내 가게에 저장했어요');
  };

  return (
    <Screen
      title="가게 프로필"
      gap={12}
      footer={
        <CtaBar
          primary={{ label: '협업 요청 보내기', onPress: request }}
          secondary={{ label: saved ? '저장됨' : '저장하기', onPress: save }}
        />
      }
    >
      <Placeholder label="가게 대표 사진" height={100} />
      <StoreHead name={s.name} sub={`${s.cat} · 성수동 · ${s.walk}`} />
      <Card gap={2}>
        <Txt v="bold">AI 추천 이유</Txt>
        {s.reasons.map((r) => (
          <Txt key={r}>{r}</Txt>
        ))}
      </Card>
      <Txt>{s.desc}</Txt>
      <StaticChips items={s.tags} />
    </Screen>
  );
}
