// 09 요청 완료 (협업 요청과 러브콜이 모두 여기로 와요)
import { View } from 'react-native';
import { useApp } from '@/state/AppContext';
import { STORES } from '@/data';
import { Card, CtaBar, InfoRow, Placeholder, Screen, Txt } from '@/components/ui';
import { goTab } from '@/lib/nav';

export default function RequestSent() {
  const { state, update } = useApp();
  const last = state.sentList.at(-1) ?? {
    storeId: 'gyeol' as const,
    type: '한정 상품',
    when: '4월 첫째 주',
    via: 'request' as const,
  };
  return (
    <Screen
      title="요청 완료"
      back={false}
      big
      footer={
        <CtaBar
          primary={{
            label: '협업 탭에서 보기',
            onPress: () => {
              update({ collabFilter: 'sent' });
              goTab('collab');
            },
          }}
          secondary={{
            label: '추천 더 보기',
            onPress: () => {
              update({ exploreMode: 'AI 추천' });
              goTab('explore');
            },
          }}
        />
      }
    >
      <View className="items-center gap-2">
        <Placeholder label="완료" width={96} height={96} round />
        <Txt v="h24" className="mt-2">
          {last.via === 'lovecall' ? '러브콜을 보냈어요' : '요청을 보냈어요'}
        </Txt>
        <Txt tone="sub">상대가 수락하면 알림으로 알려드려요</Txt>
      </View>
      <Card gap={10}>
        <InfoRow label="받는 가게" value={STORES[last.storeId].name} />
        <InfoRow label="협업 유형" value={last.type} />
        <InfoRow label="희망 시기" value={last.when || '미정'} />
        <InfoRow label="상태" value="수락 대기 중" />
      </Card>
    </Screen>
  );
}
