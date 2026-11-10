// 03 프로필 설정 1 (21 내 가게 > 프로필 수정에서도 같은 화면을 써요)
import { View } from 'react-native';
import { router } from 'expo-router';
import { useApp } from '@/state/AppContext';
import { AddChip, Chip, ChipGroup, CtaBar, FormField, Progress, Screen, TimeSelect, Txt } from '@/components/ui';

const CATEGORIES = ['카페', '꽃집', '공방', '서점', '식당', '패션', '라이프스타일'];
const AUDIENCE = ['직장인', '연인', '가족', '관광객', '학생'];
const DAYS = ['월', '화', '수', '목', '금', '토', '일'];
const HOUR_OPTIONS = ['예약제', '공휴일 휴무', '격주 휴무'];

export default function ProfileSetup() {
  const { state, update, toggle, toast } = useApp();
  const editing = state.editingProfile;

  const save = () => {
    update({ editingProfile: false });
    router.back();
    toast('프로필을 저장했어요');
  };

  return (
    <Screen
      title="가게 프로필 설정"
      footer={
        editing ? (
          <CtaBar primary={{ label: '저장하기', onPress: save }} />
        ) : (
          <CtaBar primary={{ label: '다음', onPress: () => router.push('/profile-setup-2') }} />
        )
      }
    >
      {!editing && <Progress step={2} />}
      <FormField name="storeName" label="가게 이름" placeholder="예: 성수 봄빵 베이커리" />

      <View className="gap-2">
        <Txt v="bold">업종</Txt>
        {/* '+'로 목록에 없는 업종을 직접 추가해요. 추가한 업종은 바로 선택돼요. */}
        <View className="flex-row flex-wrap gap-2">
          {[...CATEGORIES, ...state.customCats].map((c) => (
            <Chip key={c} label={c} on={state.cat === c} onPress={() => update({ cat: c })} />
          ))}
          <AddChip
            label="업종 직접 추가"
            onAdd={(v) =>
              update((s) => ({
                customCats: s.customCats.includes(v) || CATEGORIES.includes(v) ? s.customCats : [...s.customCats, v],
                cat: v,
              }))
            }
          />
        </View>
      </View>

      <View className="gap-2">
        <Txt v="bold">주요 고객층</Txt>
        <View className="flex-row flex-wrap gap-2">
          {[...AUDIENCE, ...state.customAudience].map((c) => (
            <Chip key={c} label={c} on={state.audience.includes(c)} onPress={() => toggle('audience', c)} />
          ))}
          <AddChip
            label="고객층 직접 추가"
            onAdd={(v) =>
              update((s) => ({
                customAudience:
                  s.customAudience.includes(v) || AUDIENCE.includes(v) ? s.customAudience : [...s.customAudience, v],
                audience: s.audience.includes(v) ? s.audience : [...s.audience, v],
              }))
            }
          />
        </View>
      </View>

      <View className="gap-2">
        <Txt v="bold">영업 시간대</Txt>
        <ChipGroup fill options={DAYS} value={state.days} onChange={(d) => toggle('days', d)} />
        <ChipGroup options={HOUR_OPTIONS} value={state.hourOpts} onChange={(o) => toggle('hourOpts', o)} />
      </View>
      <View className="flex-row gap-4">
        <TimeSelect label="시작 시간" value={state.start} onChange={(v) => update({ start: v })} />
        <TimeSelect label="종료 시간" value={state.end} onChange={(v) => update({ end: v })} />
      </View>
    </Screen>
  );
}
