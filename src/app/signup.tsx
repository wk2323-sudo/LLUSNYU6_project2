// 01 가입
import { router } from 'expo-router';
import { useApp } from '@/state/AppContext';
import { Checkbox, CtaBar, FormField, Screen, Txt } from '@/components/ui';

export default function Signup() {
  const { state, setForm } = useApp();
  const { email, pw, pw2, agree } = state.form;
  const mismatch = pw2.length > 0 && pw !== pw2;
  const canNext = email.includes('@') && pw.length >= 8 && pw === pw2 && agree;
  return (
    <Screen
      title="회원가입"
      back={false}
      big
      footer={<CtaBar primary={{ label: '다음', disabled: !canNext, onPress: () => router.push('/biz-verify') }} />}
    >
      <FormField name="email" label="이메일" placeholder="example@email.com" keyboardType="email-address" />
      <FormField name="pw" label="비밀번호" placeholder="8자 이상 입력" secure />
      <FormField name="pw2" label="비밀번호 확인" placeholder="한 번 더 입력" secure />
      {mismatch && (
        <Txt v="xs" tone="sub" className="-mt-2">
          비밀번호가 서로 달라요. 다시 확인해주세요
        </Txt>
      )}
      <Checkbox checked={agree} onChange={(v) => setForm('agree', v)} label="이용약관과 개인정보 처리방침에 동의해요" />
    </Screen>
  );
}
