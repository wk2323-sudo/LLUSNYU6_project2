// 07 가게 프로필 (다른 가게): 소개 · AI가 찾은 잘 맞는 이유 · 협업 요청 보내기
import { View } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useApp } from '@/state/AppContext';
import { STORES, proposalDraft, type StoreId } from '@/data';
import { Chip, CtaBar, Divider, ImageSlot, InfoRow, Notice, Screen, Tags, Txt } from '@/components/ui';
import { C } from '@/lib/colors';

export default function StoreProfile() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { state, update, setForms, toggle, toast } = useApp();
  const s = STORES[(id as StoreId)] ?? STORES.gyeol;
  const key = `store:${s.id}`;
  const saved = state.saved.includes(key);

  const request = () => {
    const d = proposalDraft(s);
    update({ storeId: s.id, purposes: d.purposes });
    setForms({ pTitle: d.title, pIdea: d.idea, pEffect: d.effect, pSchedule: d.schedule, pCondition: d.condition, pRequest: d.request });
    router.push('/proposal');
  };

  return (
    <Screen title="가게 프로필" headerBorder={false}
      footer={<CtaBar primary={{ label: '협업 요청 보내기', onPress: request }}
        secondary={{ label: saved ? '저장 취소' : '저장하기', onPress: () => { toggle('saved', key); toast(saved ? '저장을 취소했어요' : '내 가게 > 저장한 가게에 담았어요'); } }} />}>
      <ImageSlot height={180} label="가게가 직접 등록한 대표 이미지" />
      <View className="gap-2">
        <View className="flex-row items-center gap-2">
          <Txt v="h1" className="flex-shrink">{s.name}</Txt>
          <Txt tone="sub">{s.cat} · {s.area}</Txt>
        </View>
        <Txt>{s.desc}</Txt>
        <Tags items={s.moods} />
      </View>
      <View className="gap-3 rounded-xl bg-yellow-soft p-4">
        <View className="flex-row items-center gap-1.5">
          <Ionicons name="sparkles-outline" size={18} color={C.charcoal} />
          <Txt v="title">AI가 찾은 잘 맞는 이유</Txt>
        </View>
        {s.matches.map((m) => (
          <View key={m.title} className="gap-0.5">
            <Txt v="bodyBold">{m.title}</Txt>
            <Txt tone="sub">{m.desc}</Txt>
          </View>
        ))}
      </View>
      <Divider />
      <View className="gap-3">
        <Txt v="title">협업 관심 분야</Txt>
        <View className="flex-row flex-wrap gap-2">{s.interests.map((t) => <Chip key={t} label={t} />)}</View>
        <Txt tone="sub">{s.interestNote}</Txt>
      </View>
      <Divider />
      <View className="gap-3">
        <Txt v="title">가게 정보</Txt>
        <InfoRow label="업종" value={s.cat} />
        <InfoRow label="주요 고객층" value={s.target} />
        <InfoRow label="위치" value={`${s.location} · ${s.walk}`} />
      </View>
      <Divider />
      <View className="gap-3">
        <Txt v="title">협업 이력</Txt>
        {s.history ? <Txt>{s.history}</Txt> : <Txt tone="sub">등록된 협업 이력이 아직 없어요.</Txt>}
      </View>
      <Notice title="인증된 사업자예요" body="국세청 사업자 정보로 확인된 가게예요." icon="shield-checkmark-outline" />
    </Screen>
  );
}
