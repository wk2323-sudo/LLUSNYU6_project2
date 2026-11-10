// 08 협업 요청 보내기
import { View } from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useApp } from '@/state/AppContext';
import { REQUEST_MESSAGES } from '@/data';
import { Button, Card, ChipGroup, CtaBar, FormField, Placeholder, Screen, Txt } from '@/components/ui';
import { C } from '@/lib/colors';

const TYPES = ['한정 상품', '팝업', '공동 이벤트', 'SNS 협업'];

export default function CollabRequest() {
  const { state, store, update, setForm } = useApp();

  const rewrite = () => {
    // TODO: AI 메시지 초안 API 재호출
    const i = (state.msgIdx + 1) % REQUEST_MESSAGES.length;
    update({ msgIdx: i });
    setForm('message', REQUEST_MESSAGES[i](store));
  };
  const send = () => {
    // TODO: 협업 요청 생성 API
    update((s) => ({
      sentList: [...s.sentList, { storeId: store.id, type: s.reqType, when: s.form.when, via: 'request' }],
    }));
    router.replace('/request-sent');
  };

  return (
    <Screen title="협업 요청" gap={14} footer={<CtaBar primary={{ label: '협업 요청 보내기', onPress: send }} />}>
      <Card pad="md" row gap={12}>
        <Placeholder label="로고" width={44} height={44} round />
        <View className="flex-1">
          <Txt tone="sub">받는 가게</Txt>
          <Txt v="bold">{store.name}</Txt>
        </View>
      </Card>
      <FormField name="message" label="요청 메시지 (AI 초안)" multiline />
      <Button label="AI 초안 다시 쓰기" variant="ghost" onPress={rewrite} />
      <View className="gap-2">
        <Txt v="bold">협업 유형</Txt>
        <ChipGroup dark options={TYPES} value={state.reqType} onChange={(t) => update({ reqType: t })} />
      </View>
      <FormField name="when" label="희망 시기" placeholder="예: 4월 첫째 주" />
      <View className="flex-row items-start gap-1.5">
        <Ionicons name="warning-outline" size={22} color={C.sub} />
        <Txt tone="sub" className="flex-1">
          협업 진행은 앱 밖에서 해요. 앱은 매칭과 아이디어를 도와드려요.
        </Txt>
      </View>
    </Screen>
  );
}
