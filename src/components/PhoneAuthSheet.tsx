// 전화번호 인증 시트: ① 필수 동의(로그인일 때는 번호 입력도) → ② 인증번호 5자리

import { useRef, useState, type ComponentRef } from 'react';
import { Pressable, TextInput, View } from 'react-native';
import { useApp } from '@/state/AppContext';
import { formatPhone } from '@/data';
import { BottomSheet, Button, Checkbox, FormField, TextButton, Txt } from './ui';

const OTP_LENGTH = 5;

export function PhoneAuthSheet({ visible, mode, onClose, onVerified }: {
  visible: boolean; mode: 'login' | 'signup'; onClose: () => void; onVerified: () => void;
}) {
  const { state, update, setForm, toast } = useApp();
  const [step, setStep] = useState<'consent' | 'otp'>('consent');
  const otpRef = useRef<ComponentRef<typeof TextInput>>(null);
  const phoneOk = state.form.phone.replace(/\D/g, '').length >= 10;
  const canNext = state.consent && (mode === 'signup' || phoneOk);
  const otp = state.form.otp;

  const close = () => { setStep('consent'); onClose(); };
  const next = () => {
    // TODO: Supabase Auth로 인증번호 보내기 (signInWithOtp, SMS는 Twilio 우선 검토)
    setForm('otp', '');
    setStep('otp');
    setTimeout(() => otpRef.current?.focus(), 350);
  };
  const verify = () => {
    // TODO: Supabase Auth로 인증번호 확인 (verifyOtp). 지금은 다섯 자리만 맞으면 통과해요.
    update({ phoneVerified: true });
    setStep('consent');
    onVerified();
  };

  return (
    <BottomSheet visible={visible} onClose={close} label={step === 'consent' ? '전화번호 인증 동의' : '인증번호 입력'}>
      {step === 'consent' ? (
        <View className="gap-5 p-5">
          {mode === 'login' && (
            <>
              <Txt v="h1">전화번호로 로그인</Txt>
              <FormField name="phone" label="휴대전화 번호" placeholder="010 0000 0000" keyboardType="number-pad" format={formatPhone} />
            </>
          )}
          <Checkbox checked={state.consent} onChange={(v) => update({ consent: v })} label="(필수) 전화번호 인증을 위한 데이터 처리에 동의합니다.">
            <View className="flex-1 gap-3">
              <Txt>(필수) 전화번호 인증을 위한 Google 데이터 처리에 동의합니다.</Txt>
              <TextButton label="개인정보 처리방침 및 인증 데이터 처리 안내" tone="charcoal" onPress={() => toast('처리방침 화면은 다음 버전에서 열려요')} />
            </View>
          </Checkbox>
          <Button label="다음" disabled={!canNext} onPress={next} />
        </View>
      ) : (
        <View className="gap-10 p-5">
          <Txt v="h1">인증번호를 입력해 주세요</Txt>
          {/* 칸 다섯 개는 보여주기용이고, 실제 입력은 숨은 입력칸 하나로 받아요 */}
          <Pressable onPress={() => otpRef.current?.focus()} accessibilityLabel="인증번호 입력칸" className="flex-row justify-center gap-5">
            {Array.from({ length: OTP_LENGTH }, (_, i) => (
              <View key={i} className={`h-12 w-[41px] items-center justify-center rounded-lg border ${i === otp.length ? 'border-charcoal' : 'border-input'}`}>
                <Txt v="h1">{otp[i] ?? ''}</Txt>
              </View>
            ))}
            <TextInput
              ref={otpRef} value={otp} onChangeText={(v) => setForm('otp', v.replace(/\D/g, '').slice(0, OTP_LENGTH))}
              keyboardType="number-pad" textContentType="oneTimeCode" autoComplete="sms-otp" maxLength={OTP_LENGTH}
              accessibilityLabel="인증번호" className="absolute h-12 w-full opacity-0"
            />
          </Pressable>
          <View className="gap-3">
            <Button label="다음" disabled={otp.length < OTP_LENGTH} onPress={verify} />
            <Button label="재전송" variant="secondary" onPress={() => { setForm('otp', ''); toast('인증번호를 다시 보냈어요'); }} />
          </View>
        </View>
      )}
    </BottomSheet>
  );
}
