// 16 협업 성과 결과 
import { useEffect, useState } from 'react';
import { Animated, Easing, View } from 'react-native';
import Svg, { Circle } from 'react-native-svg';
import { Ionicons } from '@expo/vector-icons';
import { RESULTS } from '@/data';
import { Card, Screen, Txt } from '@/components/ui';
import { C } from '@/lib/colors';


/** 0에서 목표값까지 숫자가 올라가요 */
function useCountUp(target: number, ms = 900) {
  const [v, setV] = useState(0);
  useEffect(() => {
    const start = Date.now();
    const id = setInterval(() => {
      const p = Math.min(1, (Date.now() - start) / ms);
      setV(Math.round(target * (1 - Math.pow(1 - p, 3))));
      if (p === 1) clearInterval(id);
    }, 16);
    return () => clearInterval(id);
  }, [target, ms]);
  return v;
}

function useGrow(delay = 0) {
  const [a] = useState(() => new Animated.Value(0));
  useEffect(() => {
    Animated.timing(a, { toValue: 1, duration: 700, delay, easing: Easing.out(Easing.cubic), useNativeDriver: false }).start();
  }, [a, delay]);
  return a;
}

function Marker({ n }: { n: number }) {
  return (
    <View className="h-6 w-6 items-center justify-center rounded-full border border-charcoal bg-white">
      <Txt v="caption" className="font-bold">{n}</Txt>
    </View>
  );
}

function Compare() {
  const { before, during } = RESULTS;
  const growth = Math.round(((during - before) / before) * 100);
  const g = useGrow();
  const shown = useCountUp(growth);
  const bar = (value: number, label: string, on: boolean) => (
    <View className="flex-1 items-center gap-2">
      <Txt v="title">{value}명</Txt>
      <View className="h-[140px] w-16 justify-end">
        <Animated.View
          style={{ width: 64, borderTopLeftRadius: 8, borderTopRightRadius: 8, backgroundColor: on ? C.charcoal : C.sand, height: g.interpolate({ inputRange: [0, 1], outputRange: [0, (value / during) * 140] }) }} />
      </View>
      <Txt tone="sub">{label}</Txt>
    </View>
  );
  return (
    <Card gap={14} radius={16}>
      <Txt v="title">협업 전후 비교</Txt>
      <View className="flex-row items-end gap-2">
        <Txt v="big">+{shown}%</Txt>
        <Txt tone="sub" className="pb-1">{during - before}명 늘었어요</Txt>
      </View>
      <View className="flex-row px-6">{bar(before, '협업 전', false)}{bar(during, '협업 중', true)}</View>
      <Txt v="caption" tone="sub">협업 전 2주와 협업 중 2주의 방문 고객</Txt>
    </Card>
  );
}

function Daily() {
  const { daily, markers, dailyInsight } = RESULTS;
  const max = Math.max(...daily);
  const peak = daily.indexOf(max);
  const g = useGrow(200);
  return (
    <Card gap={14} radius={16}>
      <Txt v="title">일별 추이</Txt>
      <View className="h-[150px] flex-row items-end gap-1">
        {daily.map((d, i) => {
          const mk = markers.find((m) => m.day === i + 1);
          return (
            <View key={i} className="flex-1 items-center justify-end gap-1">
              {i === peak && <Txt v="tiny" className="font-bold">{d}</Txt>}
              {mk && <Marker n={mk.n} />}
              {/* Animated.View에는 className 대신 style로 색을 줘요 (웹에서 className이 빠지는 경우가 있어요) */}
              <Animated.View
                style={{ width: '100%', borderTopLeftRadius: 4, borderTopRightRadius: 4, backgroundColor: i === peak ? C.yellow : i + 1 >= 5 ? C.charcoal : C.sand, height: g.interpolate({ inputRange: [0, 1], outputRange: [0, (d / max) * 100] }) }} />
            </View>
          );
        })}
      </View>
      <View className="flex-row justify-between"><Txt v="caption" tone="sub">1일</Txt><Txt v="caption" tone="sub">7일</Txt><Txt v="caption" tone="sub">14일</Txt></View>
      <View className="gap-1.5">
        {markers.map((m) => (
          <View key={m.n} className="flex-row items-center gap-2"><Marker n={m.n} /><Txt className="flex-1">{m.label}</Txt><Txt tone="sub">{m.day}일</Txt></View>
        ))}
      </View>
      <Insight text={dailyInsight} />
    </Card>
  );
}

function Insight({ text }: { text: string }) {
  return (
    <View className="flex-row items-center gap-2 rounded-lg bg-yellow-soft p-3">
      <Ionicons name="sparkles-outline" size={16} color={C.charcoal} />
      <Txt className="flex-1">{text}</Txt>
    </View>
  );
}

function Sources() {
  const { sources, sourceInsight } = RESULTS;
  const total = sources.reduce((a, s) => a + s.count, 0);
  const shown = useCountUp(total);
  const g = useGrow(300);
  const [p, setP] = useState(0);
  useEffect(() => {
    const id = g.addListener(({ value }) => setP(value));
    return () => g.removeListener(id);
  }, [g]);
  const R = 70, W = 22, CIRC = 2 * Math.PI * R;
  const starts = sources.map((_, i) => sources.slice(0, i).reduce((a, x) => a + (x.count / total) * CIRC, 0));
  return (
    <Card gap={14} radius={16}>
      <Txt v="title">신규 고객 출처</Txt>
      <View className="items-center justify-center">
        <Svg width={180} height={180} viewBox="0 0 180 180">
          <Circle cx={90} cy={90} r={R} stroke={C.line} strokeWidth={W} fill="none" />
          {sources.map((s, i) => {
            const len = (s.count / total) * CIRC * p;
            const off = -starts[i] * p;
            return (
              <Circle key={s.label} cx={90} cy={90} r={R} stroke={s.color} strokeWidth={W} fill="none"
                strokeDasharray={`${len} ${CIRC}`} strokeDashoffset={off} transform="rotate(-90 90 90)" />
            );
          })}
        </Svg>
        <View className="absolute items-center">
          <Txt v="h1">{shown}명</Txt>
          <Txt v="caption" tone="sub">신규 고객 합계</Txt>
        </View>
      </View>
      <View className="gap-2">
        {sources.map((s) => (
          <View key={s.label} className="flex-row items-center gap-2">
            <View className="h-3 w-3 rounded-full" style={{ backgroundColor: s.color }} />
            <Txt className="flex-1">{s.label}</Txt>
            <Txt v="bodyBold">{s.count}명 · {s.pct}%</Txt>
          </View>
        ))}
      </View>
      <Insight text={sourceInsight} />
    </Card>
  );
}

export default function Results() {
  const { summary, tiles } = RESULTS;
  return (
    <Screen title="협업 성과" bg="canvas" gap={14}>
      <Card bg="yellow" border="none" radius={16} gap={6}>
        <View className="flex-row items-center gap-1.5">
          <Ionicons name="sparkles-outline" size={18} color={C.charcoal} />
          <Txt v="title">AI 요약</Txt>
        </View>
        <Txt>{summary}</Txt>
      </Card>
      <Compare />
      <Daily />
      <View className="flex-row gap-2">
        {tiles.map(([l, v]) => (
          <View key={l} className="flex-1">
            <Card gap={4} radius={16}><Txt tone="sub">{l}</Txt><Txt v="h1">{v}</Txt></Card>
          </View>
        ))}
      </View>
      <Sources />
    </Screen>
  );
}
