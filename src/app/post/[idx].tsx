// 18 모집글 상세
import { View } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { useApp } from '@/state/AppContext';
import { LOVECALL_MESSAGE, POSTS, STORES, proposalDraft } from '@/data';
import { Avatar, CtaBar, Divider, InfoRow, Screen, Tags, Txt } from '@/components/ui';

export default function PostDetail() {
  const { idx } = useLocalSearchParams<{ idx: string }>();
  const i = Number(idx) || 0;
  const p = POSTS[i] ?? POSTS[0];
  const s = STORES[p.store];
  const { state, update, setForms, toggle, toast } = useApp();
  const startLovecall = () => {
    // 러브콜 AI 초안을 채워 두고 이동해요. TODO: AI 러브콜 초안 API
    const d = proposalDraft(s);
    setForms({
      lcIdea: `봄 시즌에 맞춰 베이커리의 한정 빵 세트와 ${s.name}의 상품을 함께 구성한 패키지를 만들고 싶어요.`,
      lcEffect: d.effect, lcSchedule: d.schedule, lcCondition: d.condition, lcMessage: LOVECALL_MESSAGE,
      lcRequest: '샘플 상품 5종 준비와 매장 진열 공간 일부를 부탁드려요.',
    });
    update({ storeId: p.store, postIdx: i });
    router.push('/lovecall');
  };
  const key = `post:${i}`;
  const saved = state.saved.includes(key);
  return (
    <Screen title="모집글"
      footer={<CtaBar
        primary={{ label: '러브콜 보내기', onPress: startLovecall }}
        secondary={{ label: saved ? '저장 취소' : '모집글 저장하기', onPress: () => { toggle('saved', key); toast(saved ? '저장을 취소했어요' : '모집글을 저장했어요'); } }} />}>
      <View className="flex-row items-center gap-3">
        <Avatar size={48} label="로고" />
        <View className="flex-1">
          <Txt v="title">{s.name}</Txt>
          <Txt tone="sub">{s.cat} · {s.area}</Txt>
        </View>
      </View>
      <Txt v="h1">{p.title}</Txt>
      <Tags items={p.tags} />
      <Txt>{p.body}</Txt>
      <Divider />
      <InfoRow label="모집 기간" value={p.until} strong />
      <InfoRow label="받은 러브콜" value={`${p.calls}개`} strong />
    </Screen>
  );
}
