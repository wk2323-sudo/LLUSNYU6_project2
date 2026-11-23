// 01 스플래시 + 전화번호로 로그인 시트
import { useState } from 'react';
import { ImageBackground, View, type ImageSourcePropType } from 'react-native';
import { router } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Button, Txt } from '@/components/ui';
import { DureMark } from '@/components/brand';
import { PhoneAuthSheet } from '@/components/PhoneAuthSheet';
import { StatusBar } from 'expo-status-bar';
import { resetTo } from '@/lib/nav';

// Figma 스플래시의 매장 사진을 쓰려면: Figma에서 '01 Splash screen'의 사진을 내보내
// assets/images/splash.jpg로 저장하고, 아래 null을 require('../../assets/images/splash.jpg')로 바꿔요.
const SPLASH_PHOTO: ImageSourcePropType | null = null;

export default function Splash() {
  const insets = useSafeAreaInsets();
  const [login, setLogin] = useState(false);
  const body = (
    <View className="flex-1 bg-black/45" style={{ paddingTop: insets.top, paddingBottom: Math.max(insets.bottom, 16) }}>
      <View className="flex-1 items-center justify-center gap-5 px-5">
        <DureMark size={80} />
        <View className="items-center gap-2">
          <Txt v="h1" tone="white" className="text-center">동네 가게끼리 협업을 찾아보세요</Txt>
          <Txt v="title" tone="cream" className="text-center">인증된 사업자만 협업을 주고받을 수 있어요</Txt>
        </View>
      </View>
      <View className="gap-3 px-5">
        <Button label="가입하기" onPress={() => router.push('/signup')} className={SPLASH_PHOTO ? '' : 'border-sand/40'} />
        <Button label="전화번호로 로그인하기" variant="secondary" onPress={() => setLogin(true)} />
      </View>
      <StatusBar style="light" />
      <PhoneAuthSheet visible={login} mode="login" onClose={() => setLogin(false)}
        onVerified={() => { setLogin(false); resetTo('/home'); }} />
    </View>
  );
  if (SPLASH_PHOTO) {
    return <ImageBackground source={SPLASH_PHOTO} resizeMode="cover" className="flex-1">{body}</ImageBackground>;
  }
  return <View className="flex-1 bg-pressed">{body}</View>;
}
