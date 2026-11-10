// 16 협업 성과 결과
import { View } from 'react-native';
import { useApp } from '@/state/AppContext';
import { RESULTS } from '@/data';
import { Card, Screen, StoreHead, Txt } from '@/components/ui';

/** 둥근 숫자 표시 (그래프 위 사건 표시와 범례에 함께 써요) */
function Marker({ n }: { n: number }) {
  return (
    <View className="h-6 w-6 items-center justify-center rounded-full border border-ink bg-white">
      <Txt v="sm" className="font-bold">
        {n}
      </Txt>
    </View>
  );
}

function Panel({ children }: { children: React.ReactNode }) {
  return <View className="gap-4 rounded-2xl border border-hair p-6">{children}</View>;
}

export default function Results() {
  const { collab } = useApp();
  const { before, during, tiles, sources, daily, markers } = RESULTS;
  const growth = Math.round(((during - before) / before) * 100);
  const max = Math.max(...daily);
  const peak = daily.indexOf(max);

  return (
    <Screen title="협업 성과" gap={14}>
      <StoreHead name={collab.name} sub={collab.title} />
      <Card gap={4}>
        <Txt v="bold">AI 요약</Txt>
        <Txt>베이커리와 공방 조합은 반응이 좋아요. 다음 협업 후보로 꽃집을 추천해요</Txt>
      </Card>

      <Panel>
        <View>
          <Txt v="h18">협업 전후 비교</Txt>
          <Txt v="big" tone="brand">
            +{growth}%
          </Txt>
          <Txt tone="sub">{during - before}명 늘었어요</Txt>
        </View>
        <View
          className="flex-row items-end justify-center gap-6"
          accessible
          accessibilityLabel={`방문 고객 협업 전 ${before}명, 협업 중 ${during}명`}
        >
          {(
            [
              ['협업 전', before, 'bg-line'],
              ['협업 중', during, 'bg-brand'],
            ] as const
          ).map(([label, v, color]) => (
            <View key={label} className="w-[102px] items-center gap-1.5">
              <Txt v="h22">{v}명</Txt>
              <View className={`w-[74px] ${color}`} style={{ height: (v / during) * 110 }} />
              <Txt tone="sub">{label}</Txt>
            </View>
          ))}
        </View>
        <Txt tone="sub" className="text-center">
          협업 전 2주와 협업 중 2주의 방문 고객
        </Txt>
      </Panel>

      <View className="flex-row gap-2.5">
        {tiles.map(([k, v]) => (
          <View key={k} className="flex-1">
            <Card pad="md" gap={2}>
              <Txt tone="sub">{k}</Txt>
              <Txt v="h20">{v}</Txt>
            </Card>
          </View>
        ))}
      </View>

      <Panel>
        <Txt v="h20">신규 고객 출처</Txt>
        <View
          className="h-9 flex-row overflow-hidden rounded-lg"
          accessible
          accessibilityLabel={sources.map((s) => `${s.label} ${s.pct}%`).join(', ')}
        >
          {sources.map((s) => (
            <View key={s.label} className={s.color} style={{ flex: s.pct }} />
          ))}
        </View>
        <View className="gap-3">
          {sources.map((s) => (
            <View key={s.label} className="flex-row items-center gap-2.5">
              <View className={`h-4 w-4 rounded ${s.color}`} />
              <Txt v={s.strong ? 'bold' : 'body'} className="flex-1">
                {s.label}
              </Txt>
              <Txt v={s.strong ? 'bold' : 'body'} tone={s.strong ? 'ink' : 'sub'}>
                {s.count}명 · {s.pct}%
              </Txt>
            </View>
          ))}
        </View>
        <View className="rounded-lg bg-fill p-4">
          <Txt v="medium">신규 고객 3명 중 1명은 상대 가게에서 왔어요</Txt>
        </View>
      </Panel>

      <Panel>
        <Txt v="h20">일별 추이</Txt>
        <View
          className="h-[142px] flex-row items-end gap-1.5 border-b border-line"
          accessible
          accessibilityLabel={`14일간 일별 쿠폰 사용, 가장 많았던 날 ${peak + 1}일 ${max}회`}
        >
          {daily.map((v, i) => {
            const m = markers.find((x) => x.day === i + 1);
            return (
              <View key={i} className="h-full flex-1 items-center justify-end">
                {m && <View className="absolute bottom-0 top-6 w-0.5 bg-ink" />}
                {m && (
                  <View className="absolute top-0">
                    <Marker n={m.n} />
                  </View>
                )}
                {i === peak && (
                  <Txt v="bold" tone="brand" className="absolute top-[34px]">
                    {v}
                  </Txt>
                )}
                <View className="w-full max-w-[14px] bg-brand" style={{ height: (v / max) * 80 }} />
              </View>
            );
          })}
        </View>
        <View className="-mt-2 flex-row justify-between">
          <Txt v="sm" tone="sub">
            1일
          </Txt>
          <Txt v="sm" tone="sub">
            7일
          </Txt>
          <Txt v="sm" tone="sub">
            14일
          </Txt>
        </View>
        <View className="gap-2">
          {markers.map((m) => (
            <View key={m.n} className="flex-row items-center gap-2.5">
              <Marker n={m.n} />
              <Txt className="flex-1">{m.label}</Txt>
              <Txt tone="sub">{m.day}일</Txt>
            </View>
          ))}
        </View>
        <View className="rounded-lg bg-fill p-4">
          <Txt v="medium">스토리를 올린 날부터 쿠폰 사용이 늘기 시작했어요</Txt>
        </View>
      </Panel>
      <Txt tone="sub">화면 구성을 위한 예시 숫자예요</Txt>
    </Screen>
  );
}
