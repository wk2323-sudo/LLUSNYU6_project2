// 01 사업자 인증 대기: 3초 뒤 자동으로 다음 단계 (실제로는 국세청 조회 결과를 받으면 이동)
import { useEffect } from 'react';
import { View } from 'react-native';
import { router } from 'expo-router';
import { useApp } from '@/state/AppContext';
import { CtaBar, Notice, Screen, TextButton, Txt } from '@/components/ui';

export default function BizPending() {
  const { state, update, toast } = useApp();
  const reverify = state.reverify;

  useEffect(() => {
    // TODO: 국세청 사업자 상태조회 API 응답을 받으면 이동
    const t = setTimeout(() => {
      if (reverify) {
        update({ reverify: false });
        router.dismissTo('/settings/biz-info');
        toast('사업자 정보를 다시 확인했어요');
      } else {
        router.replace('/profile-setup');
      }
    }, 3000);
    return () => clearTimeout(t);
  }, [reverify, update, toast]);

  return (
    <Screen headerBorder={false} footer={<CtaBar plain primary={{ label: '확인 중이에요', disabled: true, onPress: () => {} }} />}>
      <Txt v="h1">사업자 정보를 확인하고 있어요</Txt>
      <Txt tone="sub">{'국세청 등록정보와 일치하는지 확인 중이에요.\n확인이 끝나면 자동으로 다음 단계로 넘어가요.'}</Txt>
      <Notice tone="sand" icon="sparkles-outline" title="확인 중이에요" body="보통 몇 초 안에 끝나요. 이 화면을 닫지 않아도 돼요." />
      <View className="items-start">
        <TextButton label="입력 정보 수정하기" icon="create-outline" onPress={() => router.back()} />
      </View>
    </Screen>
  );
}
