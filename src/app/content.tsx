// 14 홍보 콘텐츠 아이디어: 게시물 · 스토리 · 문구
import { Pressable, View } from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useApp, type ContentTab } from '@/state/AppContext';
import {
  COUPON_LINK,
  HASHTAG_OPTIONS,
  POST_CAPTIONS,
  POST_HASHTAGS,
  STORY_STEPS,
  STORY_TAGS,
  TONE_OPTIONS,
} from '@/data';
import { Button, Card, ChipGroup, CtaBar, Placeholder, Screen, Segmented, TitleRow, Txt } from '@/components/ui';
import { copyText } from '@/lib/nav';
import { C } from '@/lib/colors';

const TABS: readonly ContentTab[] = ['게시물', '스토리', '문구'];

function PostTab({ caption, onCopy }: { caption: string; onCopy: () => void }) {
  return (
    <>
      <Placeholder label="이미지 영역" height={160} />
      <Card gap={6}>
        <Txt v="bold">문구 초안</Txt>
        <View className="rounded-[10px] border border-hair p-2.5">
          <Txt>{caption}</Txt>
        </View>
        <Txt tone="sub">{POST_HASHTAGS}</Txt>
        <Button label="복사" variant="secondary" size="xs" onPress={onCopy} />
      </Card>
    </>
  );
}

function StoryTab() {
  const { state, update, toast } = useApp();
  return (
    <>
      <View className="items-center">
        <Placeholder label={'스토리 화면\n(9대16)'} width={216} height={385} />
      </View>
      <View className="gap-2">
        <Txt v="bold">스토리 구성</Txt>
        {STORY_STEPS.map(([t, d]) => (
          <View key={t} className="gap-0.5 rounded-lg border border-line p-3">
            <Txt v="bold">{t}</Txt>
            <Txt tone="sub">{d}</Txt>
          </View>
        ))}
      </View>
      <View className="gap-2">
        <Txt v="bold">해시태그 문구 추천</Txt>
        <ChipGroup options={STORY_TAGS} value={state.storyTag} onChange={(t) => update({ storyTag: t })} />
      </View>
      <View className="gap-2">
        <Txt v="bold">쿠폰 QR</Txt>
        <Pressable
          onPress={async () => {
            await copyText(COUPON_LINK);
            toast('쿠폰 링크를 복사했어요');
          }}
          accessibilityRole="button"
          accessibilityLabel="쿠폰 링크 복사"
          className="h-[46px] flex-row items-center justify-between rounded-lg border border-line px-3 active:opacity-70"
        >
          <Txt tone="sub">{COUPON_LINK}</Txt>
          <Ionicons name="copy-outline" size={20} color={C.sub} />
        </Pressable>
        <Txt tone="sub">쿠폰 QR은 링크 스티커로 붙일 수 있어요</Txt>
      </View>
    </>
  );
}

function CaptionTab({ onCopy }: { onCopy: () => void }) {
  const { state, store, update, toggle } = useApp();
  return (
    <>
      {TONE_OPTIONS.map((o, i) => (
        <Card key={o.tone} gap={4} border={state.tone === i ? 'brand' : 'line'} onPress={() => update({ tone: i })}>
          <TitleRow title={o.tone} aside={state.tone === i ? '선택됨' : null} />
          <Txt>{o.text(store)}</Txt>
        </Card>
      ))}
      <View className="gap-2">
        <Txt v="bold">해시태그 추천</Txt>
        <ChipGroup options={HASHTAG_OPTIONS} value={state.hashtags} onChange={(t) => toggle('hashtags', t)} />
      </View>
      <View className="flex-row gap-2">
        <View className="flex-1">
          <Button label="복사" variant="secondary" size="xs" onPress={onCopy} />
        </View>
        <View className="flex-1">
          <Button
            label="다시 쓰기"
            variant="ghost"
            onPress={() => update({ tone: (state.tone + 1) % TONE_OPTIONS.length })}
          />
        </View>
      </View>
    </>
  );
}

export default function PromoContent() {
  const { state, store, update, toast } = useApp();
  const tab = state.contentTab;
  const postCaption = POST_CAPTIONS[state.captionIdx % POST_CAPTIONS.length](store);
  const toneText = `${TONE_OPTIONS[state.tone].text(store)} ${state.hashtags.join(' ')}`;
  const copy = async (text: string) => {
    await copyText(text);
    toast('문구를 복사했어요');
  };

  // 탭마다 보조 버튼이 달라요
  const secondary = {
    게시물: { label: '문구만 복사하기', onPress: () => copy(postCaption) },
    스토리: { label: '이 구성 저장하기', onPress: () => toast('스토리 구성을 저장했어요') },
    문구: { label: '이 문구 복사하기', onPress: () => copy(toneText) },
  }[tab];

  return (
    <Screen
      title="홍보 콘텐츠 아이디어"
      gap={12}
      footer={
        <CtaBar
          primary={{ label: '협업 시작하기', onPress: () => router.push('/collab-detail') }}
          secondary={secondary}
        />
      }
    >
      <Segmented options={TABS} value={tab} onChange={(t) => update({ contentTab: t })} />
      {tab === '게시물' && <PostTab caption={postCaption} onCopy={() => copy(`${postCaption}\n${POST_HASHTAGS}`)} />}
      {tab === '스토리' && <StoryTab />}
      {tab === '문구' && <CaptionTab onCopy={() => copy(toneText)} />}
    </Screen>
  );
}
