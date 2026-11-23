// 08 협업 요청 보내기 (협업 제안서)
import { View } from 'react-native';
import { router } from 'expo-router';
import { useApp } from '@/state/AppContext';
import { PURPOSES, proposalDraft } from '@/data';
import { AiNote, Chip, CtaBar, FormField, Label, Screen, Tag, Txt } from '@/components/ui';
import { PairHeader, Reasons } from '@/components/collab';

export default function Proposal() {
  const { state, store, me, update, toggle, toast } = useApp();
  const f = state.form;
  const ready = f.pTitle.trim() && f.pIdea.trim() && f.pRequest.trim() && state.purposes.length > 0;
  const send = () => {
    // TODO: 협업 요청 보내기 API
    update((s) => ({ sentList: [...s.sentList, { storeId: store.id, title: f.pTitle, via: 'proposal' }] }));
    router.replace('/request-sent');
  };
  return (
    <Screen title="협업 제안서" right={<Tag label="작성 중" tone="yellow" small />}
      footer={<CtaBar primary={{ label: '제안서 보내기', disabled: !ready, onPress: send }} />}>
      <PairHeader left={[me.short, me.cat]} right={[store.name, store.cat]} />
      <FormField name="pTitle" accessibilityLabel="제안서 제목" />
      <View className="gap-2">
        <Label text="협업 목적" />
        <View className="flex-row flex-wrap gap-2">
          {PURPOSES.map((p) => <Chip key={p} label={p} on={state.purposes.includes(p)} onPress={() => toggle('purposes', p)} />)}
        </View>
      </View>
      <View className="gap-2">
        <FormField name="pIdea" label="협업 아이디어" ai multiline />
        <AiNote />
      </View>
      <Reasons items={proposalDraft(store).reasons} />
      <FormField name="pEffect" label="서로 기대할 수 있는 효과" multiline />
      <View className="gap-2">
        <Label text="희망 일정 및 실행 조건" />
        <FormField name="pSchedule" accessibilityLabel="희망 일정" />
        <FormField name="pCondition" accessibilityLabel="실행 조건" />
      </View>
      <FormField name="pRequest" label="상대방에게 요청할 사항" multiline />
      {!ready && <Txt tone="sub" className="text-center" onPress={() => toast('제목, 목적, 아이디어, 요청 사항을 채워 주세요')}>빈 칸을 채우면 보낼 수 있어요</Txt>}
    </Screen>
  );
}
