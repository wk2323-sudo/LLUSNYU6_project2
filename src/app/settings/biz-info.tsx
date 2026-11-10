// 25 사업자 인증 정보
import { View } from 'react-native';
import { router } from 'expo-router';
import { useApp } from '@/state/AppContext';
import { Card, Chip, CtaBar, InfoRow, Screen, Txt } from '@/components/ui';

export default function BizInfo() {
  const { state, update } = useApp();
  const { biz, owner, openDate } = state.form;
  const digits = biz.replace(/\D/g, '');
  const masked = digits ? `${digits.slice(0, 3)} ${digits.slice(3, 5)} *****` : '123 45 *****';

  return (
    <Screen
      title="사업자 인증 정보"
      footer={
        <CtaBar
          primary={{
            label: '다시 인증하기',
            variant: 'dark',
            onPress: () => {
              update({ reverify: true, verified: false });
              router.push('/biz-verify');
            },
          }}
        />
      }
    >
      <Card gap={12}>
        <View className="flex-row items-center justify-between">
          <Txt v="bold">인증 상태</Txt>
          <Chip label="인증 완료" />
        </View>
        <InfoRow label="사업자 등록번호" value={masked} />
        <InfoRow label="대표자명" value={owner || '홍길동'} />
        <InfoRow label="개업일자" value={openDate || '2024년 1월 1일'} />
        <InfoRow label="업종" value={state.cat || '베이커리'} />
      </Card>
      <Txt tone="sub">사업자 정보가 바뀌었다면 다시 인증해 주세요</Txt>
    </Screen>
  );
}
