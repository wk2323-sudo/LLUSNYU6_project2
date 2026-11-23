// 03 프로필 설정 4: 가게를 더 알려주세요 (분위기, 고객층, 방문 시간·이유, 원하는 협업, 사진)
import { View } from 'react-native';
import { router } from 'expo-router';
import { useApp } from '@/state/AppContext';
import { MOODS, PHOTO_SLOTS } from '@/data';
import { AddChip, Chip, CtaBar, FormField, Label, Screen, TextButton, Txt } from '@/components/ui';
import { PhotoSlot } from '@/components/PhotoSlot';
import { resetTo } from '@/lib/nav';

export default function ProfileDetails() {
  const { state, update, toggle, toast } = useApp();
  const editing = state.editingProfile;
  const allMoods = [...MOODS, ...state.customMoods];

  const finish = () => {
    
    if (editing) {
      update({ editingProfile: false });
      router.dismissTo('/my-profile');
      toast('프로필을 저장했어요');
    } else {
      resetTo('/home');
    }
  };

  return (
    <Screen headerBorder={false}
      right={editing ? undefined : <TextButton label="다음에" onPress={() => resetTo('/home')} />}
      footer={<CtaBar plain primary={{ label: editing ? '저장하기' : '프로필 완성', onPress: finish }} />}>
      <View className="gap-2.5">
        <Txt v="h1">가게를 더 알려주세요</Txt>
        <Txt tone="sub">{'더 자세한 정보를 알려주시면\nAI가 우리 가게에 꼭 맞는 캠페인을 추천해드려요'}</Txt>
      </View>

      <View className="gap-1.5">
        <Label text="가게가 가진 분위기는 어떤가요?" />
        <View className="flex-row flex-wrap gap-1.5">
          {allMoods.map((m) => <Chip key={m} label={m} on={state.moods.includes(m)} onPress={() => toggle('moods', m)} />)}
          {/* + 칩: 입력한 분위기로 선택된 칩을 만들고, 같은 이름이 있으면 그 칩을 선택해요 */}
          <AddChip label="분위기 직접 추가" onAdd={(v) => update((s) => ({
            customMoods: allMoods.includes(v) ? s.customMoods : [...s.customMoods, v],
            moods: s.moods.includes(v) ? s.moods : [...s.moods, v],
          }))} />
        </View>
      </View>

      <FormField name="target" label="주요 고객층은 누구인가요?" placeholder="20~30대 여성" />
      <FormField name="visitTime" label="주로 언제 방문하나요?" placeholder="평일 오후, 주말 오전" />
      <FormField name="visitReason" label="고객들의 주된 방문 이유는 무엇인가요?" placeholder="선물이나 데이트를 위해 방문해요" />
      <FormField name="wantedCollab" label="어떤 협업을 원하시나요?" placeholder="시즌 한정 상품" />

      <View className="gap-4">
        <View className="flex-row gap-1">
          <Txt v="title">사진을 업로드해주세요</Txt>
          <Txt v="title" tone="sub">(최대 3장)</Txt>
        </View>
        <View className="flex-row gap-7">
          {PHOTO_SLOTS.map((p) => (
            <PhotoSlot key={p.key} label={p.label} uri={state.photos[p.key]}
              onChange={(uri) => update((s) => ({ photos: { ...s.photos, [p.key]: uri } }))}
              onDenied={() => toast('설정에서 사진 접근을 허용해 주세요')} />
          ))}
        </View>
      </View>
    </Screen>
  );
}
