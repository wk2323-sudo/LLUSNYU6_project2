// 03 프로필 설정 1 (가게 정보 불러오기) + 03 프로필 설정 3 (이 가게가 맞나요? 시트)
import { useState } from 'react';
import { View } from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useApp } from '@/state/AppContext';
import { PLACE_RESULT } from '@/data';
import { BottomSheet, Button, CtaBar, FormField, ProgressTabs, Screen, Txt } from '@/components/ui';
import { C } from '@/lib/colors';

export default function ProfileSetup() {
  const { state, setForms } = useApp();
  const [confirm, setConfirm] = useState(false);
  const editing = state.editingProfile;

  const search = () => {
    // TODO: 네이버 지역 검색 API (가게 이름, 업종, 도로명 주소, 가게 설명, 상세정보 URL)
    if (!editing) setForms({ storeName: PLACE_RESULT.name, storeCat: PLACE_RESULT.cat, storeAddress: PLACE_RESULT.address });
    setConfirm(true);
  };
  const check = <Ionicons name="checkmark" size={22} color={C.charcoal} />;

  return (
    <Screen headerBorder={false} footer={<CtaBar plain primary={{ label: '다음', onPress: search }} />}>
      {!editing && (
        <ProgressTabs step={3} onStep={(n) => router.dismissTo(n === 1 ? '/signup' : '/biz-verify')} />
      )}
      <View className="gap-2.5">
        <Txt v="h1">{editing ? '가게 정보를 다시 불러올까요?' : '가게 정보를\n불러올까요?'}</Txt>
        <Txt tone="sub">{'네이버 플레이스 링크를 붙여넣거나,\n상호명 또는 주소를 검색해 보세요.'}</Txt>
      </View>
      <FormField name="placeQuery" label="상호명 / 주소로 검색" placeholder="서울 성동구 성수이로 00" />

      <BottomSheet visible={confirm} onClose={() => setConfirm(false)} label="이 가게가 맞나요?">
        <View className="gap-5 p-5">
          <View className="gap-2.5">
            <Txt v="h1">이 가게가 맞나요?</Txt>
            <Txt tone="sub">아래 정보가 정확한지 확인해주세요.</Txt>
          </View>
          <View className="gap-3">
            <FormField name="storeName" label="가게 이름" prefilled right={check} />
            <FormField name="storeCat" label="업종" prefilled right={check} />
            <FormField name="storeAddress" label="주소" prefilled right={check} />
          </View>
          <Button label="확인" onPress={() => { setConfirm(false); router.push('/profile-details'); }} />
        </View>
      </BottomSheet>
    </Screen>
  );
}
