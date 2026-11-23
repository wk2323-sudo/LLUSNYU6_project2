// 12_1 AI 계획 정리: 섹션마다 다시 만들기 · 직접 수정 · AI에게 수정 요청
import { useState } from 'react';
import { TextInput, View } from 'react-native';
import { router } from 'expo-router';
import { useApp } from '@/state/AppContext';
import { PLAN_ALTERNATES, PLAN_SECTIONS, proposalDraft } from '@/data';
import { Card, CtaBar, Notice, Screen, TextButton, Txt } from '@/components/ui';
import { C } from '@/lib/colors';

export default function Plan() {
  const { state, store, update, setForms, toast } = useApp();
  const [editing, setEditing] = useState<string | null>(null);
  const [draft, setDraft] = useState('');
  const setText = (key: string, text: string) => update((s) => ({ planTexts: { ...s.planTexts, [key]: text } }));

  const regenerate = (key: string) => {
    // TODO: 섹션 다시 만들기 API
    const cur = state.planTexts[key];
    const base = PLAN_SECTIONS.find((s) => s.key === key)!.text;
    setText(key, cur === PLAN_ALTERNATES[key] ? base : PLAN_ALTERNATES[key]);
  };
  const toProposal = () => {
    const d = proposalDraft(store);
    setForms({ pTitle: d.title, pIdea: state.planTexts.overview, pEffect: d.effect, pSchedule: d.schedule, pCondition: d.condition, pRequest: d.request });
    update({ purposes: d.purposes });
    router.push('/proposal');
  };

  return (
    <Screen title="AI 계획 정리"
      footer={<CtaBar primary={{ label: '제안서 작성하기', onPress: toProposal }}
        secondary={{ label: '다시 정리하기', onPress: () => { update({ planTexts: Object.fromEntries(PLAN_SECTIONS.map((s) => [s.key, PLAN_ALTERNATES[s.key]])) }); toast('AI가 다시 정리했어요'); } }} />}>
      <Notice tone="sand" icon="sparkles-outline" title="AI 초안이에요" body="입력한 아이디어를 정리했어요. 확인하고 직접 수정할 수 있어요." />
      {PLAN_SECTIONS.map((sec) => (
        <Card key={sec.key} gap={10}>
          <View className="flex-row items-center justify-between">
            <Txt v="title">{sec.title}</Txt>
            <TextButton label="다시 만들기" icon="refresh" onPress={() => regenerate(sec.key)} />
          </View>
          {editing === sec.key ? (
            <>
              <TextInput value={draft} onChangeText={setDraft} multiline autoFocus accessibilityLabel={`${sec.title} 수정`}
                className="min-h-[80px] rounded-lg border border-charcoal p-3 text-[15px] text-charcoal" textAlignVertical="top"
                placeholderTextColor={C.mid} />
              <View className="flex-row justify-end gap-4">
                <TextButton label="취소" onPress={() => setEditing(null)} />
                <TextButton label="저장" tone="charcoal" onPress={() => { setText(sec.key, draft); setEditing(null); }} />
              </View>
            </>
          ) : (
            <>
              <Txt>{state.planTexts[sec.key]}</Txt>
              <View className="flex-row gap-4">
                <TextButton label="직접 수정" icon="create-outline" onPress={() => { setDraft(state.planTexts[sec.key]); setEditing(sec.key); }} />
                <TextButton label="AI에게 수정 요청" icon="sparkles-outline" onPress={() => { regenerate(sec.key); toast('AI가 고쳐서 다시 썼어요'); }} />
              </View>
            </>
          )}
        </Card>
      ))}
    </Screen>
  );
}
