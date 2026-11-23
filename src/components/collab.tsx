// 제안서·러브콜에서 함께 쓰는 조각
import { View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Avatar, Label, Txt } from './ui';
import { C } from '@/lib/colors';

export function PairHeader({ left, right }: { left: [string, string]; right: [string, string] }) {
  const side = ([name, cat]: [string, string]) => (
    <View className="flex-1 items-center gap-1.5">
      <Avatar size={48} />
      <Txt v="title" numberOfLines={1}>{name}</Txt>
      <Txt v="caption" tone="sub">{cat}</Txt>
    </View>
  );
  return (
    <View className="flex-row items-center rounded-xl border border-line p-4">
      {side(left)}
      <Ionicons name="swap-horizontal" size={22} color={C.mid} />
      {side(right)}
    </View>
  );
}

export function Reasons({ items }: { items: string[] }) {
  return (
    <View className="gap-2 rounded-xl bg-yellow-soft p-4">
      <Label text="왜 잘 어울릴까요?" ai />
      {items.map((r) => <Txt key={r}>· {r}</Txt>)}
    </View>
  );
}

