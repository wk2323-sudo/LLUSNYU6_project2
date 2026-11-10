// 공통 UI 컴포넌트. 스타일은 NativeWind(className)로, 색상은 tailwind.config.js의 토큰을 써요.
import { useEffect, useState, type ReactNode } from 'react';
import {
  Animated,
  KeyboardAvoidingView,
  Modal,
  Platform,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
  type KeyboardTypeOptions,
  type StyleProp,
  type TextProps,
  type TextStyle,
  type ViewStyle,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useApp, type Form } from '@/state/AppContext';
import { C } from '@/lib/colors';
import { goBack } from '@/lib/nav';
import { TIMES } from '@/data';

/* ---------- 글자 ---------- */

// 글자 크기·굵기는 v, 색은 tone으로 고르고, className에는 여백·정렬만 넣어요.
// (같은 속성을 className 두 군데서 정하면 어느 쪽이 이길지 알기 어려워서 나눴어요)
const VARIANTS = {
  body: 'text-base leading-6',
  bold: 'text-base font-bold leading-6',
  medium: 'text-base font-medium leading-6',
  sm: 'text-sm leading-5',
  xs: 'text-[13px] leading-5',
  tiny: 'text-[10px] leading-3',
  h18: 'text-lg font-bold leading-7',
  h20: 'text-xl font-bold leading-7',
  h22: 'text-[22px] font-bold leading-8',
  h24: 'text-2xl font-bold leading-8',
  h28: 'text-[28px] font-bold leading-9',
  big: 'text-5xl font-bold leading-[56px]',
} as const;
const TONES = {
  ink: 'text-ink',
  sub: 'text-sub',
  brand: 'text-brand',
  white: 'text-white',
  soft: 'text-brand-soft',
} as const;

export type TxtProps = TextProps & { v?: keyof typeof VARIANTS; tone?: keyof typeof TONES; className?: string };

// 한국어 문장이 단어 중간에서 줄바꿈되지 않게 해요 (iOS: hangul-word, 웹: keep-all)
const KEEP_WORDS = Platform.OS === 'web' ? ({ wordBreak: 'keep-all' } as TextStyle) : undefined;

export function Txt({ v = 'body', tone = 'ink', className = '', style, ...props }: TxtProps) {
  return (
    <Text
      className={`${VARIANTS[v]} ${TONES[tone]} ${className}`}
      lineBreakStrategyIOS="hangul-word"
      style={[KEEP_WORDS, style]}
      {...props}
    />
  );
}

/* ---------- 화면 틀 ---------- */

export function Header({
  title,
  back = true,
  big = false,
  right,
}: {
  title: string;
  back?: boolean;
  big?: boolean;
  right?: ReactNode;
}) {
  return (
    <View className="h-14 flex-row items-center gap-2 border-b border-hair bg-white px-5">
      {back && (
        <Pressable
          onPress={goBack}
          hitSlop={12}
          accessibilityRole="button"
          accessibilityLabel="뒤로"
          className="h-7 w-7 items-center justify-center"
        >
          <Ionicons name="arrow-back" size={22} color={C.ink} />
        </Pressable>
      )}
      <Txt v={big ? 'h22' : 'h18'} className={big ? 'flex-1' : 'flex-1 text-center'} numberOfLines={1}>
        {title}
      </Txt>
      {right ?? (back ? <View className="h-7 w-7" /> : null)}
    </View>
  );
}

/**
 * 한 화면의 기본 틀: 상단 안전 영역 + 헤더 + 스크롤 본문 + (선택) 하단 버튼.
 * inTab=true면 하단 탭바가 아래 안전 영역을 맡아요.
 */
export function Screen({
  title,
  back = true,
  big = false,
  right,
  below,
  children,
  footer,
  gap = 16,
  inTab = false,
}: {
  title: string;
  back?: boolean;
  big?: boolean;
  right?: ReactNode;
  below?: ReactNode; // 헤더 바로 아래 고정 영역 (예: 탐색 탭의 세그먼트)
  children: ReactNode;
  footer?: ReactNode;
  gap?: number;
  inTab?: boolean;
}) {
  const insets = useSafeAreaInsets();
  const bottomPad = footer || inTab ? 20 : 20 + insets.bottom;
  return (
    <View className="flex-1 bg-white" style={{ paddingTop: insets.top }}>
      <Header title={title} back={back} big={big} right={right} />
      {below}
      <KeyboardAvoidingView className="flex-1" behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <ScrollView
          className="flex-1"
          contentContainerStyle={{ padding: 20, paddingBottom: bottomPad, gap }}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          {children}
        </ScrollView>
        {footer}
      </KeyboardAvoidingView>
    </View>
  );
}

type Action = { label: string; onPress: () => void; disabled?: boolean; variant?: ButtonVariant };

/** 하단 고정 버튼 영역 */
export function CtaBar({ primary, secondary }: { primary: Action; secondary?: Action }) {
  const insets = useSafeAreaInsets();
  return (
    <View
      className="gap-2 border-t border-hair bg-white px-5 pt-3"
      style={{ paddingBottom: Math.max(insets.bottom, 12) }}
    >
      <Button
        label={primary.label}
        onPress={primary.onPress}
        disabled={primary.disabled}
        variant={primary.variant ?? 'primary'}
      />
      {secondary && (
        <Button label={secondary.label} onPress={secondary.onPress} variant={secondary.variant ?? 'secondary'} />
      )}
    </View>
  );
}

/* ---------- 버튼 ---------- */

type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'dark';
const BTN: Record<ButtonVariant, string> = {
  primary: 'bg-brand border-brand',
  secondary: 'bg-white border-ink',
  ghost: 'bg-white border-line',
  dark: 'bg-ink border-ink',
};
const BTN_SIZE = { lg: 'h-[52px]', md: 'h-12', sm: 'h-11', xs: 'h-10' } as const;

export function Button({
  label,
  onPress,
  variant = 'primary',
  size,
  disabled = false,
  className = '',
}: {
  label: string;
  onPress: () => void;
  variant?: ButtonVariant;
  size?: keyof typeof BTN_SIZE;
  disabled?: boolean;
  className?: string;
}) {
  const filled = variant === 'primary' || variant === 'dark';
  const h = BTN_SIZE[size ?? (variant === 'ghost' ? 'xs' : 'lg')];
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={{ disabled }}
      disabled={disabled}
      onPress={onPress}
      className={`items-center justify-center rounded-lg border ${BTN[variant]} ${h} ${disabled ? 'opacity-40' : 'active:opacity-80'} ${className}`}
    >
      <Txt v={filled ? 'bold' : 'body'} tone={filled ? 'white' : 'ink'}>
        {label}
      </Txt>
    </Pressable>
  );
}

/* ---------- 칩 ---------- */

export function Chip({
  label,
  on = false,
  dark = false,
  fill = false,
  badge,
  onPress,
}: {
  label: string;
  on?: boolean;
  dark?: boolean;
  fill?: boolean; // 한 줄을 똑같이 나눠 채울 때 (요일)
  badge?: string;
  onPress?: () => void;
}) {
  const color = on ? (dark ? 'border-ink bg-ink' : 'border-brand bg-brand') : 'border-line bg-white';
  const shape = fill ? 'flex-1 items-center' : 'px-3.5';
  const body = (
    <>
      <Txt tone={on ? 'white' : 'ink'}>{label}</Txt>
      {badge && (
        <View className="absolute -right-1.5 -top-1.5 h-[18px] min-w-[18px] items-center justify-center rounded-full bg-brand px-1">
          <Txt v="tiny" tone="white">
            {badge}
          </Txt>
        </View>
      )}
    </>
  );
  if (!onPress) return <View className={`h-10 justify-center rounded-full border ${color} ${shape}`}>{body}</View>;
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityState={{ selected: on }}
      className={`h-10 justify-center rounded-full border ${color} ${shape} active:opacity-80`}
    >
      {body}
    </Pressable>
  );
}

/** 칩 묶음. value가 배열이면 여러 개 선택, 문자열이면 하나만 선택 */
export function ChipGroup({
  options,
  value,
  onChange,
  dark = false,
  fill = false,
}: {
  options: string[];
  value: string | string[];
  onChange: (v: string) => void;
  dark?: boolean;
  fill?: boolean;
}) {
  const isOn = (o: string) => (Array.isArray(value) ? value.includes(o) : value === o);
  return (
    <View className={fill ? 'flex-row gap-[5px]' : 'flex-row flex-wrap gap-2'}>
      {options.map((o) => (
        <Chip key={o} label={o} on={isOn(o)} dark={dark} fill={fill} onPress={() => onChange(o)} />
      ))}
    </View>
  );
}

export function StaticChips({ items }: { items: string[] }) {
  return (
    <View className="flex-row flex-wrap gap-2">
      {items.map((t) => (
        <Chip key={t} label={t} />
      ))}
    </View>
  );
}

/** 칩 끝의 '+'. 누르면 입력칸이 열리고, 입력을 마치면 새 칩을 추가해요. */
export function AddChip({ onAdd, label }: { onAdd: (v: string) => void; label: string }) {
  const [open, setOpen] = useState(false);
  const [text, setText] = useState('');
  const submit = () => {
    const v = text.trim();
    if (v) onAdd(v);
    setText('');
    setOpen(false);
  };
  if (!open) {
    return (
      <Pressable
        onPress={() => setOpen(true)}
        accessibilityRole="button"
        accessibilityLabel={label}
        className="h-10 w-10 items-center justify-center rounded-full border border-line bg-white active:opacity-80"
      >
        <Ionicons name="add" size={20} color={C.ink} />
      </Pressable>
    );
  }
  return (
    <TextInput
      autoFocus
      value={text}
      onChangeText={setText}
      onSubmitEditing={submit}
      onBlur={submit}
      placeholder="직접 입력"
      placeholderTextColor={C.sub}
      accessibilityLabel={label}
      returnKeyType="done"
      className="h-10 w-32 rounded-full border border-ink bg-white px-3.5 text-base text-ink"
    />
  );
}

/* ---------- 입력 ---------- */

export function Field({
  label,
  value,
  onChangeText,
  placeholder = '',
  secure = false,
  multiline = false,
  keyboardType,
}: {
  label: string;
  value: string;
  onChangeText: (v: string) => void;
  placeholder?: string;
  secure?: boolean;
  multiline?: boolean;
  keyboardType?: KeyboardTypeOptions;
}) {
  return (
    <View className="gap-1.5">
      <Txt v="bold">{label}</Txt>
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={C.sub}
        secureTextEntry={secure}
        multiline={multiline}
        keyboardType={keyboardType}
        autoCapitalize="none"
        textAlignVertical={multiline ? 'top' : 'center'}
        className={`rounded-lg border border-line bg-white px-3 text-base text-ink ${multiline ? 'h-[116px] py-3' : 'h-12'}`}
      />
    </View>
  );
}

/** 앱 상태의 form[name]에 바로 연결된 입력칸 */
export function FormField({
  name,
  ...props
}: { name: keyof Form } & Omit<Parameters<typeof Field>[0], 'value' | 'onChangeText'>) {
  const { state, setForm } = useApp();
  return <Field value={String(state.form[name])} onChangeText={(v) => setForm(name, v as never)} {...props} />;
}

/** 시간 고르기. 누르면 아래에서 시간 목록이 올라와요. */
export function TimeSelect({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const insets = useSafeAreaInsets();
  return (
    <>
      <Pressable
        onPress={() => setOpen(true)}
        accessibilityRole="button"
        accessibilityLabel={label}
        className="h-12 flex-1 flex-row items-center justify-between rounded-lg border border-line bg-white px-3"
      >
        <Txt tone={value ? 'ink' : 'sub'}>{value || label}</Txt>
        <Ionicons name="chevron-down" size={20} color={C.ink} />
      </Pressable>
      <Modal visible={open} transparent animationType="slide" onRequestClose={() => setOpen(false)}>
        <Pressable className="flex-1 bg-black/30" onPress={() => setOpen(false)} />
        <View className="max-h-[50%] rounded-t-2xl bg-white" style={{ paddingBottom: insets.bottom }}>
          <View className="h-14 items-center justify-center border-b border-hair">
            <Txt v="h18">{label}</Txt>
          </View>
          <ScrollView>
            {TIMES.map((t) => (
              <Pressable
                key={t}
                onPress={() => {
                  onChange(t);
                  setOpen(false);
                }}
                className={`h-12 justify-center px-5 ${t === value ? 'bg-fill' : ''}`}
              >
                <Txt v={t === value ? 'bold' : 'body'}>{t}</Txt>
              </Pressable>
            ))}
          </ScrollView>
        </View>
      </Modal>
    </>
  );
}

export function Checkbox({
  checked,
  onChange,
  label,
}: {
  checked: boolean;
  onChange: (v: boolean) => void;
  label: string;
}) {
  return (
    <Pressable
      onPress={() => onChange(!checked)}
      accessibilityRole="checkbox"
      accessibilityState={{ checked }}
      className="flex-row items-center gap-2.5"
    >
      <View
        className={`h-6 w-6 items-center justify-center rounded border border-ink ${checked ? 'bg-ink' : 'bg-white'}`}
      >
        {checked && <Ionicons name="checkmark" size={16} color={C.white} />}
      </View>
      <Txt className="flex-1">{label}</Txt>
    </Pressable>
  );
}

export function Radio({ checked, onPress, label }: { checked: boolean; onPress: () => void; label: string }) {
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="radio"
      accessibilityState={{ checked }}
      className="min-h-11 flex-row items-center gap-3"
    >
      <View className={`h-5 w-5 rounded-full ${checked ? 'border-[6px] border-brand' : 'border border-line'}`} />
      <Txt v={checked ? 'bold' : 'body'}>{label}</Txt>
    </Pressable>
  );
}

/* ---------- 보여주기 ---------- */

/** 사진·로고 자리. 실제 이미지가 생기면 expo-image의 <Image>로 바꾸면 돼요. */
export function Placeholder({
  label,
  width,
  height,
  round = false,
  onPress,
  accessibilityLabel,
}: {
  label: string;
  width?: number;
  height: number;
  round?: boolean;
  onPress?: () => void;
  accessibilityLabel?: string;
}) {
  const cls = `items-center justify-center border border-line bg-fill ${round ? 'rounded-full' : 'rounded-lg'} ${width === undefined ? 'self-stretch' : ''}`;
  const style = { width, height };
  const body = (
    <Txt tone="sub" className="text-center">
      {label}
    </Txt>
  );
  if (onPress) {
    return (
      <Pressable
        onPress={onPress}
        accessibilityRole="button"
        accessibilityLabel={accessibilityLabel ?? label}
        className={cls}
        style={style}
      >
        {body}
      </Pressable>
    );
  }
  return (
    <View className={cls} style={style}>
      {body}
    </View>
  );
}

export function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <View className="flex-row justify-between gap-3">
      <Txt tone="sub">{label}</Txt>
      <Txt v="bold" className="flex-shrink text-right">
        {value}
      </Txt>
    </View>
  );
}

export function Progress({ step, total = 3 }: { step: number; total?: number }) {
  return (
    <View
      className="flex-row gap-1.5"
      accessibilityRole="progressbar"
      accessibilityValue={{ min: 1, max: total, now: step }}
    >
      {Array.from({ length: total }, (_, i) => (
        <View key={i} className={`h-1.5 flex-1 rounded-full ${i < step ? 'bg-ink' : 'bg-hair'}`} />
      ))}
    </View>
  );
}

export function Segmented<T extends string>({
  options,
  value,
  onChange,
}: {
  options: readonly T[];
  value: T;
  onChange: (v: T) => void;
}) {
  return (
    <View className="h-11 flex-row rounded-lg border border-line" accessibilityRole="tablist">
      {options.map((o) => (
        <Pressable
          key={o}
          onPress={() => onChange(o)}
          accessibilityRole="tab"
          accessibilityState={{ selected: value === o }}
          className={`flex-1 items-center justify-center rounded-lg ${value === o ? 'bg-brand' : ''}`}
        >
          <Txt v={value === o ? 'bold' : 'body'} tone={value === o ? 'white' : 'ink'}>
            {o}
          </Txt>
        </Pressable>
      ))}
    </View>
  );
}

const CARD_PAD = { lg: 'p-4', md: 'p-3', row: 'px-4 py-3' } as const;

/** 카드. onPress가 있으면 누를 수 있는 카드가 돼요. 간격은 gap(px)으로 정해요. */
export function Card({
  children,
  onPress,
  pad = 'lg',
  gap = 8,
  selected = false,
  border = 'line',
  bg = 'white',
  row = false,
  style,
  accessibilityLabel,
}: {
  children: ReactNode;
  onPress?: () => void;
  pad?: keyof typeof CARD_PAD;
  gap?: number;
  selected?: boolean;
  border?: 'line' | 'brand' | 'hair';
  bg?: 'white' | 'fill' | 'brand';
  row?: boolean;
  style?: StyleProp<ViewStyle>;
  accessibilityLabel?: string;
}) {
  const borderCls = selected
    ? 'border-ink'
    : { line: 'border-line', brand: 'border-brand', hair: 'border-hair' }[border];
  const bgCls = { white: 'bg-white', fill: 'bg-fill', brand: 'bg-brand' }[bg];
  const cls = `rounded-xl border ${borderCls} ${bgCls} ${CARD_PAD[pad]} ${row ? 'flex-row items-center' : ''}`;
  if (onPress) {
    return (
      <Pressable
        onPress={onPress}
        accessibilityRole="button"
        accessibilityState={{ selected }}
        accessibilityLabel={accessibilityLabel}
        className={`${cls} active:opacity-80`}
        style={[{ gap }, style]}
      >
        {children}
      </Pressable>
    );
  }
  return (
    <View className={cls} style={[{ gap }, style]}>
      {children}
    </View>
  );
}

/** 카드 제목줄: 왼쪽 굵은 제목, 오른쪽 상태 글자 */
export function TitleRow({
  title,
  aside,
  asideTone = 'sub',
  tone = 'ink',
}: {
  title: string;
  aside?: string | null;
  asideTone?: 'sub' | 'brand';
  tone?: 'ink' | 'white';
}) {
  return (
    <View className="flex-row items-center justify-between gap-3">
      <Txt v="bold" tone={tone} className="flex-shrink">
        {title}
      </Txt>
      {aside ? (
        <Txt v={asideTone === 'brand' ? 'bold' : 'body'} tone={asideTone}>
          {aside}
        </Txt>
      ) : null}
    </View>
  );
}

/** 왼쪽 동그란 로고 + 이름·설명 */
export function StoreHead({
  name,
  sub,
  size = 56,
  title = 'h20',
}: {
  name: string;
  sub: string;
  size?: number;
  title?: 'h20' | 'bold';
}) {
  return (
    <View className="flex-row items-center gap-3">
      <Placeholder label="로고" width={size} height={size} round />
      <View className="flex-1">
        <Txt v={title}>{name}</Txt>
        <Txt tone="sub">{sub}</Txt>
      </View>
    </View>
  );
}

/** 가운데 확인 창 (로그아웃 확인 등) */
export function ConfirmModal({
  visible,
  title,
  message,
  confirm,
  onConfirm,
  onCancel,
}: {
  visible: boolean;
  title: string;
  message: string;
  confirm: string;
  onConfirm: () => void;
  onCancel: () => void;
}) {
  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onCancel}>
      <Pressable className="flex-1 items-center justify-center bg-black/40 px-10" onPress={onCancel}>
        <Pressable
          className="w-full max-w-[322px] gap-3 rounded-2xl bg-white p-5"
          onPress={() => {}}
          accessibilityViewIsModal
        >
          <Txt v="h20">{title}</Txt>
          <Txt tone="sub">{message}</Txt>
          <View className="gap-2">
            <Button label={confirm} variant="dark" onPress={onConfirm} />
            <Button label="취소" variant="secondary" onPress={onCancel} />
          </View>
        </Pressable>
      </Pressable>
    </Modal>
  );
}

/** 화면 아래쪽에 잠깐 떴다 사라지는 안내 문구. 루트 레이아웃에 한 번만 둬요. */
export function ToastHost() {
  const { state } = useApp();
  const insets = useSafeAreaInsets();
  const [opacity] = useState(() => new Animated.Value(0));
  const msg = state.toast?.msg ?? '';
  useEffect(() => {
    if (!state.toast) return;
    Animated.timing(opacity, { toValue: 1, duration: 150, useNativeDriver: Platform.OS !== 'web' }).start();
    const t = setTimeout(() => {
      Animated.timing(opacity, { toValue: 0, duration: 200, useNativeDriver: Platform.OS !== 'web' }).start();
    }, 1800);
    return () => clearTimeout(t);
  }, [state.toast, opacity]);
  return (
    <Animated.View
      pointerEvents="none"
      accessibilityLiveRegion="polite"
      style={{ position: 'absolute', left: 0, right: 0, bottom: insets.bottom + 180, alignItems: 'center', opacity }}
    >
      {msg ? (
        <View className="rounded-full bg-ink px-4 py-2.5">
          <Txt v="sm" tone="white">
            {msg}
          </Txt>
        </View>
      ) : null}
    </Animated.View>
  );
}
