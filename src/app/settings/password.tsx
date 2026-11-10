// 24 비밀번호 변경
import { router } from 'expo-router';
import { useApp } from '@/state/AppContext';
import { CtaBar, FormField, Screen, Txt } from '@/components/ui';

export default function ChangePassword() {
  const { state, update, toast } = useApp();
  const { curPw, newPw, newPw2 } = state.form;
  const mismatch = newPw2.length > 0 && newPw !== newPw2;
  const ok = curPw.length > 0 && newPw.length >= 8 && /[a-zA-Z]/.test(newPw) && /\d/.test(newPw) && newPw === newPw2;

  const done = () => {
    // TODO: 비밀번호 변경 API
    update((s) => ({ form: { ...s.form, curPw: '', newPw: '', newPw2: '' } }));
    router.back();
    toast('비밀번호를 변경했어요');
  };

  return (
    <Screen
      title="비밀번호 변경"
      footer={<CtaBar primary={{ label: '비밀번호 변경하기', variant: 'dark', disabled: !ok, onPress: done }} />}
    >
      <FormField name="curPw" label="현재 비밀번호" placeholder="현재 비밀번호 입력" secure />
      <FormField name="newPw" label="새 비밀번호" placeholder="8자 이상 입력" secure />
      <FormField name="newPw2" label="새 비밀번호 확인" placeholder="한 번 더 입력" secure />
      <Txt tone="sub">{mismatch ? '새 비밀번호가 서로 달라요' : '8자 이상, 영문과 숫자를 함께 써주세요'}</Txt>
    </Screen>
  );
}
