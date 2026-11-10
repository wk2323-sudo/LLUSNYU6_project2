// 18 모집글 상세
import { router, useLocalSearchParams } from 'expo-router';
import { useApp } from '@/state/AppContext';
import { LOVECALL_MESSAGE, POSTS, STORES } from '@/data';
import { Card, CtaBar, InfoRow, Screen, StaticChips, StoreHead, Txt } from '@/components/ui';

export default function RecruitPost() {
  const { idx } = useLocalSearchParams<{ idx: string }>();
  const { state, update, toggle, toast } = useApp();
  const i = POSTS[Number(idx)] ? Number(idx) : 0;
  const p = POSTS[i];
  const s = STORES[p.store];
  const key = `post:${i}`;
  const saved = state.saved.includes(key);

  const loveCall = () => {
    update((st) => ({ postIdx: i, reqType: '한정 상품', form: { ...st.form, message: LOVECALL_MESSAGE } }));
    router.push('/lovecall');
  };
  const save = () => {
    toggle('saved', key);
    toast(saved ? '저장을 취소했어요' : '내 가게에 저장했어요');
  };

  return (
    <Screen
      title="모집글"
      gap={14}
      footer={
        <CtaBar
          primary={{ label: '러브콜 보내기', onPress: loveCall }}
          secondary={{ label: saved ? '저장됨' : '저장하기', onPress: save }}
        />
      }
    >
      <StoreHead name={s.name} sub={`${s.cat} · 성수동`} size={48} title="bold" />
      <Txt v="h20">{p.title}</Txt>
      <StaticChips items={p.tags} />
      <Card gap={6}>
        <Txt>{p.body}</Txt>
      </Card>
      <Card pad="row">
        <InfoRow label="모집 기간" value={p.until} />
        <InfoRow label="받은 러브콜" value={`${p.calls}개`} />
      </Card>
    </Screen>
  );
}
