// 21_1 내 프로필: 다른 사업자에게 공개되는 정보
import { Pressable, View } from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useApp } from '@/state/AppContext';
import { Chip, CtaBar, Divider, ImageSlot, InfoRow, Screen, Tags, TextButton, Txt } from '@/components/ui';
import { C } from '@/lib/colors';

export default function MyProfile() {
  const { me, update } = useApp();
  const edit = () => { update({ editingProfile: true }); router.push('/profile-setup'); };
  return (
    <Screen title="내 프로필" headerBorder={false}
      right={(
        <Pressable onPress={() => router.push('/settings')} hitSlop={12} accessibilityRole="button" accessibilityLabel="설정">
          <Ionicons name="settings-outline" size={24} color={C.charcoal} />
        </Pressable>
      )}
      footer={<CtaBar primary={{ label: '프로필 수정하기', onPress: edit }} />}>
      <ImageSlot height={180} label="가게가 직접 등록한 대표 이미지" />
      <View className="gap-2">
        <View className="flex-row items-center gap-2">
          <Txt v="h1" className="flex-shrink">{me.name}</Txt>
          <Txt tone="sub">{me.cat} · {me.area}</Txt>
        </View>
        <Txt>{me.intro}</Txt>
        <Tags items={me.moods} />
      </View>
      <View className="gap-2">
        <Txt v="title">프로필 관리</Txt>
        <Txt tone="sub">다른 사업자에게 공개되는 정보를 확인하고 수정할 수 있어요.</Txt>
        <TextButton label="브랜드 소개 수정하기" tone="charcoal" icon="create-outline" onPress={edit} />
      </View>
      <Divider />
      <View className="gap-3">
        <Txt v="title">협업 관심 분야</Txt>
        <View className="flex-row flex-wrap gap-2">{me.interests.map((t) => <Chip key={t} label={t} />)}</View>
        <Txt tone="sub">{me.interestNote}</Txt>
      </View>
      <Divider />
      <View className="gap-3">
        <Txt v="title">가게 정보</Txt>
        <InfoRow label="업종" value={me.cat} />
        <InfoRow label="주요 고객층" value={me.target} />
        <InfoRow label="위치" value={me.location} />
      </View>
      <Divider />
      <View className="gap-3">
        <Txt v="title">협업 이력</Txt>
        <Txt tone="sub">등록된 협업 이력이 아직 없어요.</Txt>
      </View>
    </Screen>
  );
}
