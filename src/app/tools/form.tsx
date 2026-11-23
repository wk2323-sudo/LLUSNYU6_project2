// 15_5 생성된 도구 (참가 신청서 미리보기)
import { View } from 'react-native';
import { useApp } from '@/state/AppContext';
import { FORM_CHECKLIST } from '@/data';
import { Card, Checkbox, CtaBar, FormField, Notice, Screen, Tag, Txt } from '@/components/ui';
import { copyText } from '@/lib/nav';

export default function ToolForm() {
  const { state, update, toast } = useApp();
  return (
    <Screen title="참가 신청서"
      footer={<CtaBar primary={{ label: '파트너에게 공유', onPress: () => toast('파트너에게 공유했어요') }}
        secondary={{ label: '링크 복사', onPress: async () => { await copyText('https://llus.app/t/form'); toast('링크를 복사했어요'); } }} />}>
      <Notice icon="eye-outline" title="미리보기예요" body="실제 신청 접수는 아직 연결되지 않았어요. 양식 초안으로 사용해 주세요." />
      <FormField name="fName" label="이름" badge="필수" placeholder="이름을 입력해 주세요" />
      <FormField name="fContact" label="연락처" badge="필수" placeholder="연락처를 입력해 주세요" keyboardType="phone-pad" />
      <FormField name="fCount" label="참여 인원" badge="필수" placeholder="예: 2명" />
      <FormField name="fTime" label="참여 희망 시간" badge="선택" placeholder="예: 토요일 오후" />
      <Card gap={12}>
        <Txt v="title">준비물 체크리스트</Txt>
        {FORM_CHECKLIST.map((c, i) => (
          <View key={c.label} className="flex-row items-center gap-2">
            <View className="flex-1">
              <Checkbox checked={state.formChecklist[i]} label={c.label}
                onChange={(v) => update((s) => ({ formChecklist: s.formChecklist.map((x, j) => (j === i ? v : x)) }))} />
            </View>
            <Tag label={c.owner} small />
          </View>
        ))}
      </Card>
    </Screen>
  );
}
