// 13 협업 쿠폰 QR
import { View } from 'react-native';
import { router } from 'expo-router';
import { useApp } from '@/state/AppContext';
import { Button, Card, CtaBar, InfoRow, Placeholder, Screen, Txt } from '@/components/ui';

export default function Coupon() {
  const { state, update, toast } = useApp();
  const next = () => {
    // TODO: 쿠폰 발급 API
    if (!state.couponIssued) {
      update({ couponIssued: true });
      toast('쿠폰을 발행했어요');
    }
    update({ captionIdx: 0 });
    router.push('/content');
  };
  return (
    <Screen title="협업 쿠폰" gap={12} footer={<CtaBar primary={{ label: '홍보물 만들러 가기', onPress: next }} />}>
      <Card gap={10}>
        <Txt v="h20">봄 협업 세트 10% 할인</Txt>
        <InfoRow label="유효 기간" value="4월 1일 ~ 4월 30일" />
        <InfoRow label="사용처" value="두 가게 모두" />
        {/* TODO: react-native-qrcode-svg 등으로 실제 QR 그리기 */}
        <View className="items-center py-1">
          <Placeholder label="QR 코드" width={150} height={150} />
        </View>
        <Txt tone="sub" className="text-center">
          쿠폰 코드 BOM2026
        </Txt>
      </Card>
      <Button
        label="쿠폰 이미지 저장"
        variant="secondary"
        size="sm"
        onPress={() => toast('쿠폰 이미지를 저장했어요')}
      />
    </Screen>
  );
}
