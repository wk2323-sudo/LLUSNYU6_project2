import '../global.css';
import { Platform, View } from 'react-native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { AppProvider } from '@/state/AppContext';
import { ToastHost } from '@/components/ui';

export default function RootLayout() {
  return (
    <AppProvider>
      {/* 웹으로 열었을 때는 휴대폰 폭으로 가운데에 보여줘요 */}
      <View
        className="flex-1 bg-white"
        style={Platform.OS === 'web' ? { width: '100%', maxWidth: 430, alignSelf: 'center' } : undefined}
      >
        <Stack screenOptions={{ headerShown: false }}>
          {/* 탭 화면에서는 뒤로 스와이프로 가입 화면에 돌아가지 않게 해요 */}
          <Stack.Screen name="(tabs)" options={{ gestureEnabled: false }} />
        </Stack>
        <ToastHost />
      </View>
      <StatusBar style="dark" />
    </AppProvider>
  );
}
