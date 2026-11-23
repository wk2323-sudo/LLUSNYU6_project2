// 15_3 생성 중 / 생성 실패
import { useEffect, useState } from 'react';
import { ActivityIndicator, View } from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useApp } from '@/state/AppContext';
import { CtaBar, Screen, Txt } from '@/components/ui';
import { C } from '@/lib/colors';

/** 생성 실패 화면을 보고 싶으면 true로 바꿔요 */
const SIMULATE_FAILURE = false;

export default function Generating() {
  const { update } = useApp();
  const [failed, setFailed] = useState(false);
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    // TODO: AI 도구 생성 API. 완료되면 생성된 도구로 이동해요.
    const t = setTimeout(() => {
      if (SIMULATE_FAILURE && attempt === 0) setFailed(true);
      else {
        update((s) => ({ toolStatus: { ...s.toolStatus, plan: '초안' }, priceHold: 'none' }));
        router.replace('/tools/plan');
      }
    }, 2500);
    return () => clearTimeout(t);
  }, [attempt, update]);

  return (
    <Screen title="공동 상품 기획서"
      footer={failed
        ? <CtaBar primary={{ label: '다시 시도', onPress: () => { setFailed(false); setAttempt((a) => a + 1); } }}
            secondary={{ label: '입력 내용 수정하기', onPress: () => router.back() }} />
        : <CtaBar secondary={{ label: '나중에 보기', onPress: () => router.replace('/tools/box') }} />}>
      <View className="items-center gap-4 py-24">
        {failed ? <Ionicons name="alert-circle-outline" size={48} color={C.charcoal} /> : <ActivityIndicator size="large" color={C.charcoal} />}
        <Txt v="h1">{failed ? '만들지 못했어요' : 'AI가 만들고 있어요'}</Txt>
        <Txt tone="sub" className="text-center">
          {failed ? '입력한 내용은 저장되어 있어요. 다시 시도해 주세요.' : '잠시 다른 화면을 봐도 돼요. 만들어진 도구는 보관함에서 다시 볼 수 있어요.'}
        </Txt>
      </View>
    </Screen>
  );
}
