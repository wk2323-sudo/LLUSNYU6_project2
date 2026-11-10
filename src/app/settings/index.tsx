// 22 설정 · 26 로그아웃 확인
import { useState } from 'react';
import { Pressable, View } from 'react-native';
import { router, type Href } from 'expo-router';
import { useApp } from '@/state/AppContext';
import { ConfirmModal, Screen, Txt } from '@/components/ui';
import { resetTo } from '@/lib/nav';

function Section({ label }: { label: string }) {
  return (
    <Txt v="bold" tone="sub" className="pb-2 pt-5">
      {label}
    </Txt>
  );
}

function Row({
  label,
  value = '›',
  muted = false,
  onPress,
}: {
  label: string;
  value?: string | null;
  muted?: boolean;
  onPress?: () => void;
}) {
  const body = (
    <>
      <Txt tone={muted ? 'sub' : 'ink'}>{label}</Txt>
      {value !== null && <Txt tone="sub">{value}</Txt>}
    </>
  );
  const cls = 'min-h-[52px] flex-row items-center justify-between border-b border-hair';
  if (!onPress) return <View className={cls}>{body}</View>;
  return (
    <Pressable onPress={onPress} accessibilityRole="button" className={`${cls} active:opacity-60`}>
      {body}
    </Pressable>
  );
}

export default function Settings() {
  const { update, toast, resetAll } = useApp();
  const [logoutOpen, setLogoutOpen] = useState(false);
  const go = (href: Href) => () => router.push(href);
  const soon = (what: string) => () => toast(`${what}은 다음 버전에서 열려요`);

  const logout = () => {
    // TODO: 로그아웃 API
    setLogoutOpen(false);
    resetAll();
    resetTo('/signup');
    toast('로그아웃했어요');
  };

  return (
    <Screen title="설정" gap={0}>
      <Section label="계정" />
      <Row
        label="프로필 수정"
        onPress={() => {
          update({ editingProfile: true });
          router.push('/profile-setup');
        }}
      />
      <Row label="사업자 인증 정보" onPress={go('/settings/biz-info')} />
      <Row label="비밀번호 변경" onPress={go('/settings/password')} />
      <Section label="알림" />
      <Row label="알림 설정" onPress={go('/settings/notifications')} />
      <Section label="정보" />
      <Row label="이용약관" onPress={soon('이용약관')} />
      <Row label="개인정보 처리방침" onPress={soon('개인정보 처리방침')} />
      <Row label="앱 버전" value="1.0.0" />
      <Section label="기타" />
      <Row label="로그아웃" value={null} onPress={() => setLogoutOpen(true)} />
      <Row
        label="회원 탈퇴"
        value={null}
        muted
        onPress={() => {
          update({ leaveReason: 0, leaveConfirm: false });
          router.push('/settings/leave');
        }}
      />

      <ConfirmModal
        visible={logoutOpen}
        title="로그아웃 하시겠어요?"
        message="다시 로그인하면 이어서 사용할 수 있어요"
        confirm="로그아웃"
        onConfirm={logout}
        onCancel={() => setLogoutOpen(false)}
      />
    </Screen>
  );
}
