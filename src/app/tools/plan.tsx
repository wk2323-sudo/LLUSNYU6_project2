// 15_4 생성된 도구 (공동 상품 기획서) + 15_7 경쟁법 경고
import { useState } from 'react';
import { TextInput, View } from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useApp } from '@/state/AppContext';
import { GENERATED_PLAN, PRICE_FIXING } from '@/data';
import { Button, Card, CtaBar, Divider, Notice, Screen, Tag, TextButton, Txt } from '@/components/ui';
import { copyText } from '@/lib/nav';
import { C } from '@/lib/colors';

type Section = 'overview' | 'items';

export default function ToolPlan() {
  const { state, update, toast } = useApp();
  const [editing, setEditing] = useState<Section | null>(null);
  const [draft, setDraft] = useState('');
  const [warning, setWarning] = useState<string | null>(null);
  const held = state.priceHold === 'held';
  const text = { overview: state.planOverview, items: state.planItems };

  const save = (sec: Section) => {
    // 같은 업종끼리 가격·할인을 맞추는 문장이 있으면 경고해요 (TODO: 서버 규칙·AI 판별로 교체)
    const hit = draft.split(/[.。\n]/).map((x) => x.trim()).find((x) => PRICE_FIXING.test(x));
    update(sec === 'overview' ? { planOverview: draft } : { planItems: draft });
    setEditing(null);
    setWarning(hit ?? null);
  };

  const block = (sec: Section, title: string) => (
    <Card gap={10} selected={editing === sec}>
      <View className="flex-row items-center justify-between">
        <Txt v="title">{title}</Txt>
        {editing === sec ? <Tag label="편집 중" tone="yellow" small />
          : sec === 'items' && <TextButton label="다시 만들기" icon="refresh" onPress={() =>
              update((s) => ({ planItems: s.planItems === GENERATED_PLAN.itemsAlt ? GENERATED_PLAN.items : GENERATED_PLAN.itemsAlt }))} />}
      </View>
      {editing === sec ? (
        <>
          <TextInput value={draft} onChangeText={setDraft} multiline autoFocus accessibilityLabel={`${title} 수정`}
            className="min-h-[80px] rounded-lg border border-charcoal bg-white p-3 text-[15px] text-charcoal" textAlignVertical="top" />
          <View className="flex-row justify-end gap-4">
            <TextButton label="취소" onPress={() => setEditing(null)} />
            <TextButton label="저장" tone="charcoal" onPress={() => save(sec)} />
          </View>
        </>
      ) : (
        <>
          <Txt>{text[sec]}</Txt>
          <View className="flex-row gap-4">
            <TextButton label="직접 수정" icon="create-outline" onPress={() => { setDraft(text[sec]); setEditing(sec); }} />
            <TextButton label="AI에게 수정 요청" icon="sparkles-outline" onPress={() => toast('AI에게 수정을 요청했어요')} />
          </View>
        </>
      )}
    </Card>
  );

  return (
    <Screen title="공동 상품 기획서"
      footer={<CtaBar
        primary={{ label: held ? '공유를 잠시 보류했어요' : '파트너에게 검토 요청', disabled: held,
          onPress: () => { update((s) => ({ toolStatus: { ...s.toolStatus, plan: '검토 중' } })); toast('파트너에게 검토를 요청했어요'); router.push('/tools/box'); } }}
        secondary={{ label: '링크 복사', onPress: async () => { await copyText('https://llus.app/t/plan'); toast('링크를 복사했어요 · PDF 내보내기는 준비 중이에요'); } }} />}>
      <Notice tone="sand" icon="sparkles-outline" title="AI 초안이에요" body="확정되지 않은 내용은 확인 필요로 표시했어요." />

      {warning && (
        <View className="gap-3 rounded-xl border border-charcoal bg-yellow-soft p-4" accessibilityRole="alert">
          <View className="flex-row items-center gap-2">
            <Ionicons name="warning-outline" size={22} color={C.charcoal} />
            <Txt v="title">가격 합의로 보일 수 있어요</Txt>
          </View>
          <Txt v="bodyBold">“{warning}”</Txt>
          <Txt>같은 업종의 가게끼리 일반 판매가격이나 할인율을 미리 맞추면 부당한 공동행위로 볼 수 있어요. 이번 협업 상품의 구성이나 제작비 협의는 괜찮아요.</Txt>
          <Txt v="caption" tone="sub">법적 적법성을 판단해 주는 안내는 아니에요. 필요하면 전문가에게 확인해 주세요.</Txt>
          {held ? (
            <Tag label="검토 요청 보냄" tone="dark" />
          ) : (
            <View className="gap-2">
              <Button label="문장 고치기" onPress={() => { setDraft(state.planItems); setEditing('items'); }} />
              <Button label="검토 요청" variant="secondary" onPress={() => { update({ priceHold: 'held' }); toast('공유를 잠시 보류했어요'); }} />
              <Txt v="caption" tone="sub">검토 요청 후에는 공유가 잠시 보류돼요.</Txt>
            </View>
          )}
        </View>
      )}

      {block('overview', '상품 개요')}
      {block('items', '구성 상품')}

      <Card gap={10}>
        <Txt v="title">역할 분담</Txt>
        <View className="flex-row"><Txt tone="sub" className="flex-[2]">항목</Txt><Txt tone="sub" className="flex-1">담당</Txt><Txt tone="sub" className="flex-1">일정</Txt></View>
        <Divider />
        {GENERATED_PLAN.roles.map(([item, who, when]) => (
          <View key={item} className="flex-row items-center">
            <Txt className="flex-[2]">{item}</Txt>
            <Txt className="flex-1">{who}</Txt>
            <View className="flex-1 items-start">{when === '확인 필요' ? <Tag label={when} tone="yellow" small /> : <Txt>{when}</Txt>}</View>
          </View>
        ))}
      </Card>
      <Card gap={10}>
        <Txt v="title">아직 정해지지 않은 항목</Txt>
        {GENERATED_PLAN.open.map((o) => (
          <View key={o.label} className="flex-row gap-3"><Txt tone="sub" className="w-12">{o.label}</Txt><Txt className="flex-1">{o.value}</Txt></View>
        ))}
      </Card>
      <TextButton label="참가 신청서 보기" icon="document-outline" onPress={() => router.push('/tools/form')} />
    </Screen>
  );
}
