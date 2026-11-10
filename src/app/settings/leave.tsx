// 27 회원 탈퇴
import { View } from 'react-native';
import { router } from 'expo-router';
import { useApp } from '@/state/AppContext';
import { LEAVE_REASONS } from '@/data';
import { Card, Checkbox, CtaBar, Radio, Screen, Txt } from '@/components/ui';
import { resetTo } from '@/lib/nav';

export default function LeaveAccount() {
  const { state, update, toast, resetAll } = useApp();

  const leave = () => {
    // TODO: 회원 탈퇴 API (state.leaveReason을 함께 보내요)
    resetAll();
    resetTo('/signup');
    toast('탈퇴했어요');
  };

  return (
    <Screen
      title="회원 탈퇴"
      footer={
        <CtaBar
          primary={{ label: '탈퇴하기', variant: 'dark', disabled: !state.leaveConfirm, onPress: leave }}
          secondary={{ label: '취소', onPress: () => router.back() }}
        />
      }
    >
      <Txt v="h22">정말 탈퇴하시겠어요?</Txt>
      <Card gap={6}>
        <Txt v="bold">탈퇴하기 전에 확인해 주세요</Txt>
        <Txt>프로필과 협업 이력이 모두 삭제돼요</Txt>
        <Txt>발행한 협업 쿠폰은 사용할 수 없게 돼요</Txt>
        <Txt>진행 중인 협업이 있다면 먼저 마무리해 주세요</Txt>
      </Card>
      <View accessibilityRole="radiogroup" accessibilityLabel="탈퇴하는 이유">
        <Txt v="bold" className="mb-1">
          탈퇴하는 이유
        </Txt>
        {LEAVE_REASONS.map((r, i) => (
          <Radio key={r} label={r} checked={state.leaveReason === i} onPress={() => update({ leaveReason: i })} />
        ))}
      </View>
      <Checkbox
        checked={state.leaveConfirm}
        onChange={(v) => update({ leaveConfirm: v })}
        label="위 내용을 확인했어요"
      />
    </Screen>
  );
}
