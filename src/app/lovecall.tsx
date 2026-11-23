// 19 러브콜 보내기: 모집글에서 시작한 요청 (협업 요청과 같은 방식으로 전달돼요)
import { View } from 'react-native';
import { router } from 'expo-router';
import { useApp } from '@/state/AppContext';
import { LOVECALL_TYPES, POSTS, proposalDraft } from '@/data';
import { AiNote, Avatar, Card, ChipGroup, CtaBar, Field, Label, Notice, Screen, Txt } from '@/components/ui';
import { Reasons } from '@/components/collab';

export default function Lovecall() {
  const { state, store, update, setForms } = useApp();
  const post = POSTS[state.postIdx] ?? POSTS[0];
  const d = proposalDraft(store);
  const f = state.form;
  const set = (k: keyof typeof f) => (v: string) => setForms({ [k]: v });
  const send = () => {
    
    update((s) => ({ sentList: [...s.sentList, { storeId: store.id, title: post.title, via: 'lovecall' }] }));
    router.replace('/request-sent');
  };
  return (
    <Screen title="러브콜 보내기" footer={<CtaBar primary={{ label: '러브콜 보내기', disabled: !f.lcMessage.trim(), onPress: send }} />}>
      <Notice tone="sand" icon="heart-outline" title="모집글에서 시작한 요청이에요" body="협업 요청과 같은 방식으로 전달되고, 수락되면 매치돼요" />
      <Card row gap={12}>
        <Avatar label="로고" />
        <View className="flex-1">
          <Txt v="title">{store.name}</Txt>
          <Txt tone="sub" numberOfLines={1}>{post.title}</Txt>
        </View>
      </Card>
      <View className="gap-2">
        <Label text="협업 유형" />
        <ChipGroup options={LOVECALL_TYPES} value={state.lcType} onChange={(v) => update({ lcType: v })} />
      </View>
      <View className="gap-2">
        <Field label="협업 아이디어" ai multiline value={f.lcIdea} onChangeText={set('lcIdea')} />
        <AiNote />
      </View>
      <Reasons items={d.reasons} />
      <Field label="서로 기대할 수 있는 효과" multiline value={f.lcEffect} onChangeText={set('lcEffect')} />
      <View className="gap-2">
        <Label text="희망 일정 및 실행 조건" />
        <Field value={f.lcSchedule} onChangeText={set('lcSchedule')} accessibilityLabel="희망 일정" />
        <Field value={f.lcCondition} onChangeText={set('lcCondition')} accessibilityLabel="실행 조건" />
      </View>
      <Field label="러브콜 메시지 (AI 초안)" ai multiline value={f.lcMessage} onChangeText={set('lcMessage')} />
      <Field label="상대방에게 요청할 사항" multiline value={f.lcRequest} onChangeText={set('lcRequest')} />
    </Screen>
  );
}
