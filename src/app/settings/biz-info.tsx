// 25 사업자 인증 정보
import { View } from 'react-native';
import { router } from 'expo-router';
import { useApp } from '@/state/AppContext';
import { Card, CtaBar, InfoRow, Screen, Tag, Txt } from '@/components/ui';

export default function BizInfo() {
  const { state, update } = useApp();
  const { me } = useApp();
  const { bizNo, owner, openDate } = state.form;
  const digits = bizNo.replace(/\D/g, '');
  const masked = digits ? `${digits.slice(0, 3)} ${digits.slice(3, 5)} *****` : '123 45 *****';

  return (
    <Screen
      title="사업자 인증 정보"
      footer={
        <CtaBar
          primary={{
            label: '다시 인증하기',
                        onPress: () => {
              update({ reverify: true });
              router.push('/biz-verify');
            },
          }}
        />
      }
    >
      <Card gap={12}>
        <View className="flex-row items-center justify-between">
          <Txt v="title">인증 상태</Txt>
          <Tag label="인증 완료" tone="dark" small />
        </View>
        <InfoRow label="사업자 등록번호" value={masked} />
        <InfoRow label="대표자명" value={owner || '홍길동'} />
        <InfoRow label="개업일자" value={openDate || '2024년 1월 1일'} />
        <InfoRow label="업종" value={me.cat} />
      </Card>
      <Txt tone="sub">사업자 정보가 바뀌었다면 다시 인증해 주세요</Txt>
    </Screen>
  );
}
