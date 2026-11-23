// 13 협업 쿠폰 QR
import { View } from 'react-native';
import { router } from 'expo-router';
import QRCode from 'react-native-qrcode-svg';
import { useApp } from '@/state/AppContext';
import { COUPON } from '@/data';
import { Card, CtaBar, Divider, InfoRow, Screen, Txt } from '@/components/ui';
import { copyText } from '@/lib/nav';
import { C } from '@/lib/colors';

export default function Coupon() {
  const { toast } = useApp();
  return (
    <Screen title="협업 쿠폰"
      footer={<CtaBar primary={{ label: '링크 복사', onPress: async () => { await copyText(COUPON.link); toast('쿠폰 링크를 복사했어요'); } }}
        secondary={{ label: '홍보물 만들러 가기', onPress: () => router.push('/content') }} />}>
      {/* TODO: 쿠폰 발급 API (코드·링크·유효 기간) */}
      <Card bg="yellow" border="none" radius={16} gap={16} style={{ alignItems: 'center', paddingVertical: 28 }}>
        <Txt v="h1" className="text-center">{COUPON.title}</Txt>
        <View className="rounded-xl bg-white p-4" accessibilityLabel="쿠폰 QR 코드">
          <QRCode value={COUPON.link} size={168} color={C.charcoal} backgroundColor={C.white} />
        </View>
        <Txt v="title" onPress={async () => { await copyText(COUPON.code); toast('쿠폰 코드를 복사했어요'); }}>쿠폰 코드 {COUPON.code}</Txt>
      </Card>
      <View className="gap-3">
        <InfoRow label="유효 기간" value={COUPON.period} strong />
        <Divider />
        <InfoRow label="사용처" value={COUPON.where} strong />
      </View>
    </Screen>
  );
}
