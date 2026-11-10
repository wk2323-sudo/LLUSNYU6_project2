// 01 스플래시
import { View } from 'react-native';
import { router } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { CtaBar, Placeholder, Txt } from '@/components/ui';

export default function Splash() {
  const insets = useSafeAreaInsets();
  return (
    <View className="flex-1 bg-white" style={{ paddingTop: insets.top }}>
      <View className="flex-1 items-center justify-center gap-5 px-5">
        <Placeholder label="로고" width={72} height={72} />
        <View className="items-center gap-2">
          <Txt v="h24" className="text-center">
            동네 가게끼리 협업을 찾아보세요
          </Txt>
          <Txt tone="sub" className="text-center">
            인증된 사업자만 협업을 주고받을 수 있어요
          </Txt>
        </View>
      </View>
      <CtaBar
        primary={{ label: '가입하고 계속하기', onPress: () => router.push('/signup') }}
        secondary={{ label: '이미 계정이 있어요 로그인', onPress: () => router.push('/login') }}
      />
    </View>
  );
}
