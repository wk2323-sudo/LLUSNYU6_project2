// 01 로그인
import { CtaBar, FormField, Screen } from '@/components/ui';
import { resetTo } from '@/lib/nav';

export default function Login() {
  // TODO: 로그인 API. 지금은 입력 없이도 홈으로 들어가요.
  return (
    <Screen
      title="로그인"
      back={false}
      big
      footer={<CtaBar primary={{ label: '다음', onPress: () => resetTo('/home') }} />}
    >
      <FormField name="email" label="이메일" placeholder="example@email.com" keyboardType="email-address" />
      <FormField name="pw" label="비밀번호" placeholder="8자 이상 입력" secure />
    </Screen>
  );
}
