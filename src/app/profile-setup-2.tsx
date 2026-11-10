// 04 프로필 설정 2
import { View } from 'react-native';
import { useApp } from '@/state/AppContext';
import { INTROS } from '@/data';
import { Button, Card, ChipGroup, CtaBar, FormField, Placeholder, Progress, Screen, Txt } from '@/components/ui';
import { resetTo } from '@/lib/nav';

const MOODS = ['아늑한', '모던함', '빈티지', '활기찬', '조용한', '감성적인'];

export default function ProfileSetup2() {
  const { state, update, toggle } = useApp();
  return (
    <Screen
      title="가게 프로필 설정"
      footer={<CtaBar primary={{ label: '프로필 완료하고 시작하기', onPress: () => resetTo('/home') }} />}
    >
      <Progress step={3} />
      <View className="gap-2">
        <Txt v="bold">가게 분위기</Txt>
        <ChipGroup options={MOODS} value={state.moods} onChange={(m) => toggle('moods', m)} />
      </View>

      <View className="gap-2">
        <Txt v="bold">가게 사진 (1장에서 3장)</Txt>
        {/* TODO: expo-image-picker로 실제 사진 고르기. 지금은 자리만 늘었다 줄었다 해요. */}
        <View className="flex-row gap-2.5">
          {Array.from({ length: state.photos }, (_, i) => (
            <Placeholder
              key={i}
              label="사진"
              width={88}
              height={88}
              accessibilityLabel={`사진 ${i + 1} 삭제`}
              onPress={() => update({ photos: state.photos - 1 })}
            />
          ))}
          {state.photos < 3 && (
            <Placeholder label="+ 추가" width={88} height={88} onPress={() => update({ photos: state.photos + 1 })} />
          )}
        </View>
        <Txt tone="sub">AI가 사진으로 가게 분위기를 읽어요</Txt>
      </View>

      <Card>
        <Txt v="bold">AI가 쓴 한 줄 소개</Txt>
        <View className="rounded border border-ink p-2.5">
          <Txt>{INTROS[state.introIdx]}</Txt>
        </View>
        <Button
          label="다시 만들기"
          variant="ghost"
          onPress={() => update({ introIdx: (state.introIdx + 1) % INTROS.length })}
        />
      </Card>
      <FormField name="insta" label="인스타그램 링크 (선택)" placeholder="instagram.com/내가게" keyboardType="url" />
    </Screen>
  );
}
