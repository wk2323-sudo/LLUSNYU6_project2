// 01 전화번호 인증 (가입 1단계)
import { useState } from 'react';
import { router } from 'expo-router';
import { useApp } from '@/state/AppContext';
import { formatPhone } from '@/data';
import { Button, FormField, ProgressTabs, Screen, Txt } from '@/components/ui';
import { PhoneAuthSheet } from '@/components/PhoneAuthSheet';

export default function Signup() {
  const { state } = useApp();
  const [sheet, setSheet] = useState(false);
  const phoneOk = state.form.phone.replace(/\D/g, '').length >= 10;
  return (
    <Screen headerBorder={false}>
      <ProgressTabs step={1} />
      <Txt v="h1">{'전화번호를\n입력해주세요'}</Txt>
      <FormField name="phone" placeholder="000 0000 0000" keyboardType="number-pad" format={formatPhone} accessibilityLabel="휴대전화 번호" />
      <Button label="인증 요청" variant="secondary" disabled={!phoneOk} onPress={() => setSheet(true)} />
      <PhoneAuthSheet visible={sheet} mode="signup" onClose={() => setSheet(false)}
        onVerified={() => { setSheet(false); router.push('/biz-verify'); }} />
    </Screen>
  );
}
