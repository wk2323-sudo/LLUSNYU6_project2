// 14 홍보 콘텐츠: 게시물 · 스토리 · 문구
import { useState } from 'react';
import { TextInput, View } from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useApp, type ContentTab } from '@/state/AppContext';
import {
  HASHTAG_OPTIONS, POST_CAPTIONS, STICKER_OPTIONS, STORY_STEPS, STYLE_OPTIONS, TONE_OPTIONS,
} from '@/data';
import { Card, Chip, CtaBar, FormField, Label, ListItem, Notice, Screen, Tag, Tags, TextButton, TopTabs, Txt } from '@/components/ui';
import { C } from '@/lib/colors';
import { copyText } from '@/lib/nav';

const TABS: readonly ContentTab[] = ['게시물', '스토리', '문구'];

export default function Content() {
  const { state, update, toggle, toast } = useApp();
  const [editing, setEditing] = useState(false);
  const [caption, setCaption] = useState<string | null>(null);
  const shownCaption = caption ?? POST_CAPTIONS[state.captionIdx % POST_CAPTIONS.length];
  const tab = state.contentTab;

  const currentText = tab === '게시물' ? `${shownCaption}\n${state.hashtags.join(' ')}`
    : tab === '스토리' ? STICKER_OPTIONS[state.sticker] : `${TONE_OPTIONS[state.tone].text}\n${state.hashtags.join(' ')}`;

  return (
    <Screen title="홍보 콘텐츠"
      below={<TopTabs options={TABS} value={tab} onChange={(t) => update({ contentTab: t })} />}
      footer={<CtaBar primary={{ label: '파트너에게 공유', onPress: () => toast('파트너에게 공유했어요') }}
        secondary={{ label: '문구 복사하기', onPress: async () => { await copyText(currentText); toast('문구를 복사했어요'); } }} />}>
      <Notice tone="sand" icon="sparkles-outline" title="AI 초안이에요" body="생성된 홍보 문구를 확인하고 직접 고쳐서 쓸 수 있어요. 올리는 일은 앱 밖에서 해 주세요." />
      <FormField name="refLink" label="참고 자료 (선택)" placeholder="참고할 영상이나 게시물 링크를 붙여넣어요"
        helper="참고 자료를 올리면 AI가 분석해서 아이디어를 만들어 줘요" />
      <View className="gap-2">
        <Label text="스타일 옵션 (선택)" />
        <View className="flex-row gap-2">
          {STYLE_OPTIONS.map((o) => <Chip key={o} label={o} on={state.styleOpts.includes(o)} onPress={() => toggle('styleOpts', o)} />)}
        </View>
        <Txt tone="sub">요즘 유행하는 음성이나 챌린지를 먼저 골라도 돼요</Txt>
      </View>

      {tab === '게시물' && (
        <Card gap={12}>
          <View className="aspect-square items-center justify-center rounded-lg bg-cream">
            <Ionicons name="image-outline" size={32} color={C.sub} />
          </View>
          {editing ? (
            <TextInput value={shownCaption} onChangeText={setCaption} multiline autoFocus accessibilityLabel="게시물 문구"
              className="min-h-[80px] rounded-lg border border-charcoal p-3 text-[15px] text-charcoal" textAlignVertical="top" />
          ) : <Txt>{shownCaption}</Txt>}
          <Tags items={state.hashtags} />
          <View className="flex-row gap-4">
            <TextButton label={editing ? '수정 완료' : '직접 수정'} icon="create-outline" onPress={() => setEditing(!editing)} />
            <TextButton label="문구 다시 만들기" icon="refresh" onPress={() => { setCaption(null); setEditing(false); update((s) => ({ captionIdx: s.captionIdx + 1 })); }} />
          </View>
        </Card>
      )}

      {tab === '스토리' && (
        <>
          <View className="gap-2">
            <Label text="스토리 구성" />
            <View className="flex-row gap-2">
              {STORY_STEPS.map(([t, d]) => (
                <View key={t} className="flex-1">
                  <Card pad="md" gap={4} bg="cream" border="none" style={{ aspectRatio: 9 / 14, justifyContent: 'flex-end' }}>
                    <Txt v="bodyBold">{t}</Txt>
                    <Txt v="caption" tone="sub">{d}</Txt>
                  </Card>
                </View>
              ))}
            </View>
          </View>
          <View className="gap-2">
            <Label text="스티커 문구 추천" />
            {STICKER_OPTIONS.map((s, i) => (
              <Card key={s} pad="md" selected={state.sticker === i} onPress={() => update({ sticker: i })}><Txt>{s}</Txt></Card>
            ))}
          </View>
          <View className="gap-2">
            <ListItem title="쿠폰 QR" sub="링크" right={<Ionicons name="qr-code-outline" size={24} color={C.charcoal} />}
              onPress={() => router.push('/coupon')} />
            <Txt tone="sub">쿠폰 QR은 링크 스티커로 붙일 수 있어요</Txt>
          </View>
        </>
      )}

      {tab === '문구' && (
        <>
          <View className="gap-2">
            {TONE_OPTIONS.map((t, i) => (
              <Card key={t.tone} gap={6} selected={state.tone === i} onPress={() => update({ tone: i })}>
                <View className="flex-row items-center justify-between">
                  <Txt v="title">{t.tone}</Txt>
                  {state.tone === i && <Tag label="선택됨" tone="dark" small />}
                </View>
                <Txt>{t.text}</Txt>
              </Card>
            ))}
          </View>
          <View className="gap-2">
            <Label text="해시태그 추천" />
            <View className="flex-row flex-wrap gap-2">
              {HASHTAG_OPTIONS.map((h) => <Chip key={h} label={h} on={state.hashtags.includes(h)} onPress={() => toggle('hashtags', h)} />)}
            </View>
          </View>
        </>
      )}
    </Screen>
  );
}
