// 19 러브콜 보내기
import { View } from 'react-native';
import { router } from 'expo-router';
import { useApp } from '@/state/AppContext';
import { POSTS, STORES } from '@/data';
import { Card, ChipGroup, CtaBar, FormField, Placeholder, Screen, Txt } from '@/components/ui';

const TYPES = ['한정 상품', '팝업', '공동 이벤트'];

export default function LoveCall() {
  const { state, update } = useApp();
  const p = POSTS[state.postIdx];
  const s = STORES[p.store];

  const send = () => {
    // TODO: 러브콜 생성 API (협업 요청과 같은 API로 보내요)
    update((st) => ({
      storeId: p.store,
      sentList: [...st.sentList, { storeId: p.store, type: st.reqType, when: st.form.postWhen, via: 'lovecall' }],
    }));
    router.replace('/request-sent');
  };

  return (
    <Screen title="러브콜 보내기" gap={14} footer={<CtaBar primary={{ label: '러브콜 보내기', onPress: send }} />}>
      <Card bg="fill" gap={2}>
        <Txt v="bold">모집글에서 시작한 요청이에요</Txt>
        <Txt tone="sub">협업 요청과 같은 방식으로 전달되고, 수락되면 매치돼요</Txt>
      </Card>
      <Card pad="md" row gap={12}>
        <Placeholder label="로고" width={44} height={44} round />
        <View className="flex-1">
          <Txt v="bold">{s.name}</Txt>
          <Txt tone="sub">{p.title}</Txt>
        </View>
      </Card>
      <FormField name="message" label="러브콜 메시지 (AI 초안)" multiline />
      <View className="gap-2">
        <Txt v="bold">협업 유형</Txt>
        <ChipGroup dark options={TYPES} value={state.reqType} onChange={(t) => update({ reqType: t })} />
      </View>
      <FormField name="postWhen" label="희망 시기" placeholder="예: 4월 첫째 주" />
    </Screen>
  );
}
