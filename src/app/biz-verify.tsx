// 01 사업자 인증 (가입 2단계)
import { View } from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useApp } from '@/state/AppContext';
import { formatBizNo, formatDate } from '@/data';
import { CtaBar, FormField, ProgressTabs, Screen, Txt } from '@/components/ui';
import { C } from '@/lib/colors';

export default function BizVerify() {
  const { state } = useApp();
  const { bizNo, owner, openDate } = state.form;
  const ready = bizNo.replace(/\D/g, '').length === 10 && owner.trim().length > 0 && openDate.replace(/\D/g, '').length === 8;
  return (
    <Screen headerBorder={false}
      footer={<CtaBar plain primary={{ label: '사업자 정보 확인하기', disabled: !ready, onPress: () => router.push('/biz-pending') }} />}>
      {!state.reverify && <ProgressTabs step={2} onStep={() => router.dismissTo('/signup')} />}
      <Txt v="h1">사업자 정보를 확인해 주세요</Txt>
      <Txt tone="sub">안전한 사업자 간 협업을 위해 국세청 등록정보와 일치하는지 확인합니다.</Txt>
      <FormField name="bizNo" label="사업자 등록번호" placeholder="000 00 00000" keyboardType="number-pad" format={formatBizNo} />
      <FormField name="owner" label="대표자명" placeholder="사업자등록증에 기재된 이름" />
      <FormField name="openDate" label="개업일자" placeholder="YYYY MM DD" keyboardType="number-pad" format={formatDate} />
      <View className="gap-2">
        <View className="flex-row items-center gap-1">
          <Ionicons name="information-circle-outline" size={18} color={C.charcoal} />
          <Txt v="caption">정보 조회 안내</Txt>
        </View>
        <Txt v="caption" tone="sub">입력하신 정보는 국세청 사업자등록정보와 대조하는 데 사용됩니다. 개인정보 처리에 관한 자세한 내용은 처리방침에서 확인할 수 있습니다.</Txt>
      </View>
    </Screen>
  );
}
