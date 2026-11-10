// 15 협업 상세 (앱 밖에서 실행)
import { Pressable, View } from 'react-native';
import { router } from 'expo-router';
import { useApp } from '@/state/AppContext';
import { Card, Chip, CtaBar, InfoRow, Screen, StoreHead, Txt } from '@/components/ui';

const DONE = ['쿠폰 발행', '홍보 콘텐츠 준비', '아이디어 선택', '매치 완료'];

export default function CollabDetail() {
  const { collab } = useApp();
  return (
    <Screen
      title="협업 상세"
      gap={14}
      footer={
        <CtaBar
          primary={{ label: '성과 보기', onPress: () => router.push('/results') }}
          secondary={{ label: '쿠폰 다시 보기', onPress: () => router.push('/coupon') }}
        />
      }
    >
      <StoreHead name={collab.name} sub={collab.title} />
      <View className="flex-row">
        <Chip label="협업 실행 중" on />
      </View>
      <Card>
        <Txt v="bold">진행 상태</Txt>
        {/* 지금 단계가 맨 위, 끝난 단계는 파랗게 채워져요 */}
        <View className="flex-row items-center gap-2.5">
          <View className="h-5 w-5 rounded-full border border-brand" />
          <Txt v="bold" tone="sub">
            협업 실행
          </Txt>
        </View>
        {DONE.map((t) => (
          <View key={t} className="flex-row items-center gap-2.5">
            <View className="h-5 w-5 rounded-full bg-brand" />
            <Txt tone="sub">{t}</Txt>
          </View>
        ))}
      </Card>
      <Card>
        <Txt v="bold">쿠폰 현황</Txt>
        <InfoRow label="QR 스캔" value="31회" />
        <InfoRow label="쿠폰 사용" value="12회" />
      </Card>
      <Pressable onPress={() => router.push('/results')} hitSlop={8} className="self-end">
        <Txt tone="sub">성과 자세히 보기 →</Txt>
      </Pressable>
    </Screen>
  );
}
