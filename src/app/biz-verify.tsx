// 02 사업자 인증 (25 사업자 인증 정보 > 다시 인증하기에서도 같은 화면을 써요)
import { View } from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useApp } from '@/state/AppContext';
import { Button, CtaBar, FormField, Progress, Screen, Txt } from '@/components/ui';
import { C } from '@/lib/colors';

export default function BizVerify() {
  const { state, update, toast } = useApp();
  const reverify = state.reverify;

  const verify = () => {
    if (!state.form.biz.trim()) return toast('사업자 등록번호를 먼저 입력해주세요');
    // TODO: 국세청 사업자 상태조회 API. 지금은 인증 성공을 가정하고 대표자명·개업일자를 채워요.
    update((s) => ({
      verified: true,
      form: { ...s.form, owner: s.form.owner || '최유나', openDate: s.form.openDate || '2023년 3월 2일' },
    }));
    toast('인증됐어요. 대표자명과 개업일자를 채웠어요');
  };

  const next = () => {
    if (!reverify) return router.push('/profile-setup');
    update({ reverify: false });
    router.back();
    toast('사업자 정보를 다시 인증했어요');
  };

  return (
    <Screen
      title="사업자 인증"
      gap={12}
      footer={<CtaBar primary={{ label: '인증 요청하기', disabled: !state.verified, onPress: next }} />}
    >
      {!reverify && <Progress step={1} />}
      <Txt v="h22">사업자 등록번호를 입력해주세요</Txt>
      <Txt tone="sub">인증된 사업자만 협업을 주고받을 수 있어요</Txt>
      <FormField name="biz" label="사업자 등록번호" placeholder="000 00 00000" keyboardType="number-pad" />
      <Button label="번호 인증" variant="secondary" size="sm" onPress={verify} />
      {state.verified && (
        <View className="flex-row items-center gap-1">
          <Ionicons name="checkmark" size={22} color={C.sub} />
          <Txt tone="sub">인증완료</Txt>
        </View>
      )}
      <FormField name="owner" label="대표자명" placeholder="이름 입력" />
      <FormField name="openDate" label="개업일자" placeholder="2024년 1월 1일" />
    </Screen>
  );
}
