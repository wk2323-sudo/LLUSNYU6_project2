// 공통 UI 컴포넌트 (Figma 'G 컴포넌트' 섹션 기준).
// 스타일은 NativeWind(className)로, 색상은 tailwind.config.js의 DURE 토큰을 써요.
import { useEffect, useState, type ComponentProps, type ReactNode } from 'react';
import {
  Animated, KeyboardAvoidingView, Modal, Platform, Pressable, ScrollView, Text, TextInput, View,
  type KeyboardTypeOptions, type StyleProp, type TextProps, type TextStyle, type ViewStyle,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useApp, type Form } from '@/state/AppContext';
import { C } from '@/lib/colors';
import { goBack } from '@/lib/nav';

export type IconName = ComponentProps<typeof Ionicons>['name'];
const NATIVE_DRIVER = Platform.OS !== 'web';

/* ---------- 글자 ---------- */

// Figma 글자 스타일: header 1 (24 Bold) · title (16 Bold) · body (15) · caption (12)
// 크기·굵기는 v, 색은 tone으로 고르고, className에는 여백·정렬만 넣어요.
const VARIANTS = {
  h1: 'text-2xl font-bold leading-8',
  title: 'text-base font-bold leading-6',
  body: 'text-[15px] leading-[22px]',
  bodyBold: 'text-[15px] font-bold leading-[22px]',
  caption: 'text-xs leading-[18px]',
  big: 'text-[32px] font-bold leading-10',
  tiny: 'text-[10px] leading-3',
} as const;
const TONES = {
  charcoal: 'text-charcoal',
  sub: 'text-sub',
  mid: 'text-mid',
  white: 'text-white',
  cream: 'text-cream',
} as const;

export type TxtProps = TextProps & { v?: keyof typeof VARIANTS; tone?: keyof typeof TONES; className?: string };

// 한국어 문장이 단어 중간에서 줄바꿈되지 않게 해요 (iOS: hangul-word, 웹: keep-all)
const KEEP_WORDS = Platform.OS === 'web' ? ({ wordBreak: 'keep-all' } as TextStyle) : undefined;

export function Txt({ v = 'body', tone = 'charcoal', className = '', style, ...props }: TxtProps) {
  return (
    <Text className={`${VARIANTS[v]} ${TONES[tone]} ${className}`} lineBreakStrategyIOS="hangul-word"
      style={[KEEP_WORDS, style]} {...props} />
  );
}

/* ---------- 화면 틀 ---------- */

/**
 * 상단 헤더.
 * - back + title: 상세 화면 (가운데 16 Bold 제목, 아래 구분선)
 * - big: 탭 화면 (왼쪽 24 Bold 제목)
 */
export function Header({ title, back = true, big = false, right, onBack, border }: {
  title?: string; back?: boolean; big?: boolean; right?: ReactNode; onBack?: () => void; border?: boolean;
}) {
  const showBorder = border ?? !big;
  return (
    <View className={`h-14 flex-row items-center gap-2 bg-white px-5 ${showBorder ? 'border-b border-line' : ''}`}>
      {back && (
        <Pressable onPress={onBack ?? goBack} hitSlop={12} accessibilityRole="button" accessibilityLabel="뒤로"
          className="h-7 w-7 items-center justify-center">
          <Ionicons name="chevron-back" size={24} color={C.charcoal} />
        </Pressable>
      )}
      {title ? (
        <Txt v={big ? 'h1' : 'title'} className={big && !back ? 'flex-1' : 'flex-1 text-center'} numberOfLines={1}>{title}</Txt>
      ) : <View className="flex-1" />}
      {right ?? (back ? <View className="h-7 w-7" /> : null)}
    </View>
  );
}

/**
 * 한 화면의 기본 틀: 상단 안전 영역 + 헤더 + 스크롤 본문 + (선택) 하단 버튼.
 * inTab=true면 하단 탭바가 아래 안전 영역을 맡아요.
 */
export function Screen({
  title, back = true, big = false, right, onBack, headerBorder, below, children, footer, gap = 20, inTab = false,
  bg = 'white', floating,
}: {
  title?: string; back?: boolean; big?: boolean; right?: ReactNode; onBack?: () => void; headerBorder?: boolean;
  below?: ReactNode; // 헤더 바로 아래 고정 영역 (예: 탐색 탭의 상단 탭)
  children: ReactNode; footer?: ReactNode; gap?: number; inTab?: boolean;
  bg?: 'white' | 'canvas';
  floating?: ReactNode; // 본문 위에 떠 있는 버튼 (예: 모집글 쓰기)
}) {
  const insets = useSafeAreaInsets();
  const bottomPad = footer || inTab ? 24 : 24 + insets.bottom;
  return (
    <View className={`flex-1 ${bg === 'canvas' ? 'bg-canvas' : 'bg-white'}`} style={{ paddingTop: insets.top }}>
      <Header title={title} back={back} big={big} right={right} onBack={onBack} border={headerBorder} />
      {below}
      <KeyboardAvoidingView className="flex-1" behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <ScrollView
          className="flex-1"
          contentContainerStyle={{ padding: 20, paddingBottom: bottomPad + (floating ? 64 : 0), gap }}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          {children}
        </ScrollView>
        {floating}
        {footer}
      </KeyboardAvoidingView>
    </View>
  );
}

export type Action = { label: string; onPress: () => void; disabled?: boolean };

/** 하단 고정 버튼 영역: 주요 버튼(차콜) + 보조 버튼(흰색) */
export function CtaBar({ primary, secondary, plain = false }: { primary?: Action; secondary?: Action; plain?: boolean }) {
  const insets = useSafeAreaInsets();
  return (
    <View className={`gap-3 bg-white px-5 pt-3 ${plain ? '' : 'border-t border-line'}`}
      style={{ paddingBottom: Math.max(insets.bottom, 12) }}>
      {primary && <Button label={primary.label} onPress={primary.onPress} disabled={primary.disabled} />}
      {secondary && <Button label={secondary.label} onPress={secondary.onPress} disabled={secondary.disabled} variant="secondary" />}
    </View>
  );
}

/* ---------- 버튼 ---------- */

type ButtonVariant = 'primary' | 'secondary';

/** button primary / button secondary (높이 52, 모서리 8) */
export function Button({ label, onPress, variant = 'primary', disabled = false, icon, className = '', compact = false }: {
  label: string; onPress: () => void; variant?: ButtonVariant; disabled?: boolean; icon?: IconName;
  className?: string; compact?: boolean;
}) {
  const primary = variant === 'primary';
  return (
    <Pressable
      accessibilityRole="button" accessibilityState={{ disabled }} disabled={disabled} onPress={onPress}
      className={`flex-row items-center justify-center gap-1 rounded-lg border ${compact ? 'h-11' : 'h-[52px]'} ${
        disabled ? 'border-line bg-line' : primary ? 'border-charcoal bg-charcoal active:bg-pressed' : 'border-cream bg-white active:bg-cream'
      } ${className}`}
    >
      {icon && <Ionicons name={icon} size={18} color={disabled ? C.mid : primary ? C.white : C.sub} />}
      <Txt v="title" tone={disabled ? 'mid' : primary ? 'white' : 'sub'}>{label}</Txt>
    </Pressable>
  );
}

/** 작은 알약 버튼 (직접 수정, AI에게 수정 요청, 저장, 취소 등) */
export function Pill({ label, onPress, dark = false, disabled = false, icon }: {
  label: string; onPress?: () => void; dark?: boolean; disabled?: boolean; icon?: IconName;
}) {
  return (
    <Pressable onPress={onPress} disabled={disabled || !onPress} accessibilityRole="button" accessibilityState={{ disabled }}
      className={`h-[37px] flex-row items-center gap-1 rounded-full px-3.5 ${dark ? 'bg-charcoal' : 'bg-sand'} ${disabled ? 'opacity-60' : 'active:opacity-80'}`}>
      {icon && <Ionicons name={icon} size={16} color={dark ? C.white : C.charcoal} />}
      <Txt tone={dark ? 'white' : 'charcoal'}>{label}</Txt>
    </Pressable>
  );
}

/** 글자만 있는 버튼 (전체 보기 →, 입력 정보 수정하기 등) */
export function TextButton({ label, onPress, tone = 'sub', icon, className = '' }: {
  label: string; onPress: () => void; tone?: 'sub' | 'charcoal'; icon?: IconName; className?: string;
}) {
  return (
    <Pressable onPress={onPress} hitSlop={8} accessibilityRole="button" className={`flex-row items-center gap-1.5 active:opacity-60 ${className}`}>
      {icon && <Ionicons name={icon} size={18} color={tone === 'sub' ? C.sub : C.charcoal} />}
      <Txt tone={tone}>{label}</Txt>
    </Pressable>
  );
}

/** 본문 위에 떠 있는 둥근 버튼 (모집글 쓰기, 협업 만들기) */
export function FloatingButton({ label, icon = 'add', onPress }: { label: string; icon?: IconName; onPress: () => void }) {
  return (
    <View pointerEvents="box-none" className="absolute bottom-4 right-5">
      <Pressable onPress={onPress} accessibilityRole="button"
        className="h-12 flex-row items-center gap-1 rounded-full bg-charcoal px-5 active:bg-pressed"
        style={{ shadowColor: '#000', shadowOpacity: 0.15, shadowRadius: 8, shadowOffset: { width: 0, height: 4 }, elevation: 4 }}>
        <Ionicons name={icon} size={22} color={C.white} />
        <Txt v="title" tone="white">{label}</Txt>
      </Pressable>
    </View>
  );
}

/* ---------- 칩과 태그 ---------- */

/** Selectable Chip: 기본은 흰 바탕 + 베이지 테두리, 선택되면 차콜 */
export function Chip({ label, on = false, fill = false, badge, onPress }: {
  label: string; on?: boolean; fill?: boolean; badge?: string; onPress?: () => void;
}) {
  const color = on ? 'border-charcoal bg-charcoal' : 'border-sand bg-white';
  const shape = fill ? 'flex-1 items-center px-1' : 'px-3.5';
  const body = (
    <>
      <Txt tone={on ? 'cream' : 'charcoal'} numberOfLines={1}>{label}</Txt>
      {badge && (
        <View className="absolute -right-1.5 -top-1.5 h-5 min-w-[20px] items-center justify-center rounded-full bg-charcoal px-1">
          <Txt v="caption" tone="white">{badge}</Txt>
        </View>
      )}
    </>
  );
  if (!onPress) return <View className={`h-[39px] justify-center rounded-[20px] border ${color} ${shape}`}>{body}</View>;
  return (
    <Pressable onPress={onPress} accessibilityRole="button" accessibilityState={{ selected: on }}
      className={`h-[39px] justify-center rounded-[20px] border ${color} ${shape} active:opacity-80`}>
      {body}
    </Pressable>
  );
}

/** 칩 묶음. value가 배열이면 여러 개 선택, 문자열이면 하나만 선택. scroll=true면 한 줄 가로 스크롤 */
export function ChipGroup<T extends string>({ options, value, onChange, fill = false, scroll = false }: {
  options: readonly T[]; value: T | T[]; onChange: (v: T) => void; fill?: boolean; scroll?: boolean;
}) {
  const isOn = (o: T) => (Array.isArray(value) ? value.includes(o) : value === o);
  const chips = options.map((o) => <Chip key={o} label={o} on={isOn(o)} fill={fill} onPress={() => onChange(o)} />);
  if (scroll) {
    return (
      <ScrollView horizontal showsHorizontalScrollIndicator={false} className="-mx-5" contentContainerStyle={{ gap: 8, paddingHorizontal: 20 }}>
        {chips}
      </ScrollView>
    );
  }
  return <View className={fill ? 'flex-row gap-2' : 'flex-row flex-wrap gap-2'}>{chips}</View>;
}

const TAG_TONES = {
  line: { box: 'bg-line', text: 'sub' as const },
  yellow: { box: 'bg-yellow-soft', text: 'charcoal' as const },
  dark: { box: 'bg-charcoal', text: 'cream' as const },
  sand: { box: 'bg-sand', text: 'charcoal' as const },
};

/** tag: 알약 모양 표시 (근거, 상태, 필수·선택 등) */
export function Tag({ label, tone = 'line', small = false }: { label: string; tone?: keyof typeof TAG_TONES; small?: boolean }) {
  const t = TAG_TONES[tone];
  return (
    <View className={`items-center justify-center self-start rounded-full ${t.box} ${small ? 'h-7 px-2.5' : 'h-[37px] px-3.5'}`}>
      <Txt v={small ? 'caption' : 'body'} tone={t.text}>{label}</Txt>
    </View>
  );
}

export function Tags({ items, tone = 'line' }: { items: string[]; tone?: keyof typeof TAG_TONES }) {
  return <View className="flex-row flex-wrap gap-2">{items.map((t) => <Tag key={t} label={t} tone={tone} />)}</View>;
}

/** 칩 끝의 '+'. 누르면 입력칸이 열리고, 완료하면 새 칩을 추가해요. 같은 이름이 있으면 그 칩을 선택해요. */
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
      <Pressable onPress={() => setOpen(true)} accessibilityRole="button" accessibilityLabel={label}
        className="h-[39px] w-[39px] items-center justify-center rounded-[20px] border border-sand bg-white active:opacity-80">
        <Ionicons name="add" size={20} color={C.charcoal} />
      </Pressable>
    );
  }
  return (
    <TextInput
      autoFocus value={text} onChangeText={setText} onSubmitEditing={submit} onBlur={submit}
      placeholder="직접 입력" placeholderTextColor={C.mid} accessibilityLabel={label} returnKeyType="done"
      className="h-[39px] w-32 rounded-[20px] border border-charcoal bg-white px-3.5 text-[15px] text-charcoal"
    />
  );
}

/* ---------- 입력 ---------- */

/** 라벨 오른쪽에 붙는 구분 태그 */
export type FieldBadge = '필수' | '선택' | '추후 협의' | '제안서에서 가져옴';
const BADGE_TONE: Record<FieldBadge, keyof typeof TAG_TONES> = {
  필수: 'dark', 선택: 'line', '추후 협의': 'line', '제안서에서 가져옴': 'yellow',
};

export function Label({ text, badge, ai = false, right }: { text: string; badge?: FieldBadge; ai?: boolean; right?: ReactNode }) {
  return (
    <View className="flex-row items-center gap-2">
      {ai && <Ionicons name="sparkles-outline" size={18} color={C.charcoal} />}
      <Txt v="title" className="flex-shrink">{text}</Txt>
      {badge && <Tag label={badge} tone={BADGE_TONE[badge]} small />}
      {right && <View className="ml-auto">{right}</View>}
    </View>
  );
}

export type FieldProps = {
  label?: string; value: string; onChangeText: (v: string) => void; placeholder?: string;
  secure?: boolean; multiline?: boolean; keyboardType?: KeyboardTypeOptions; badge?: FieldBadge; ai?: boolean;
  prefilled?: boolean; // 다른 곳에서 가져와 미리 채운 값 (테두리를 베이지로)
  maxLength?: number; helper?: string; right?: ReactNode; accessibilityLabel?: string;
};

export function Field({
  label, value, onChangeText, placeholder = '', secure = false, multiline = false, keyboardType, badge, ai,
  prefilled = false, maxLength, helper, right, accessibilityLabel,
}: FieldProps) {
  return (
    <View className="gap-1.5">
      {label && <Label text={label} badge={badge} ai={ai} />}
      <View className={`flex-row items-center rounded-lg border bg-white ${prefilled ? 'border-sand' : 'border-input'}`}>
        <TextInput
          value={value} onChangeText={onChangeText} placeholder={placeholder} placeholderTextColor={C.mid}
          secureTextEntry={secure} multiline={multiline} keyboardType={keyboardType} maxLength={maxLength}
          autoCapitalize="none" textAlignVertical={multiline ? 'top' : 'center'} accessibilityLabel={accessibilityLabel ?? label}
          className={`flex-1 px-3 text-[15px] text-charcoal ${multiline ? 'min-h-[100px] py-3' : 'h-12'}`}
        />
        {right && <View className="pr-3">{right}</View>}
      </View>
      {helper && <Txt tone="sub">{helper}</Txt>}
    </View>
  );
}

/** 앱 상태의 form[name]에 바로 연결된 입력칸 */
export function FormField({ name, format, ...props }: { name: keyof Form; format?: (v: string) => string } & Omit<FieldProps, 'value' | 'onChangeText'>) {
  const { state, setForm } = useApp();
  return (
    <Field value={String(state.form[name])} onChangeText={(v) => setForm(name, (format ? format(v) : v) as never)} {...props} />
  );
}

/** AI가 쓴 내용 아래에 붙는 안내 */
export function AiNote({ text = 'AI 작성 내용은 발송 전 검토·수정할 수 있어요.' }: { text?: string }) {
  return (
    <View className="flex-row items-center gap-1.5">
      <Ionicons name="information-circle-outline" size={16} color={C.sub} />
      <Txt tone="sub" className="flex-1">{text}</Txt>
    </View>
  );
}

export function Checkbox({ checked, onChange, label, children }: {
  checked: boolean; onChange: (v: boolean) => void; label?: string; children?: ReactNode;
}) {
  return (
    <Pressable onPress={() => onChange(!checked)} accessibilityRole="checkbox" accessibilityState={{ checked }} accessibilityLabel={label}
      className="flex-row items-start gap-3">
      <CheckBox checked={checked} />
      {children ?? <Txt className="flex-1">{label}</Txt>}
    </Pressable>
  );
}

/** 체크박스 네모만 (도구 선택 카드 등 안에서 사용) */
export function CheckBox({ checked }: { checked: boolean }) {
  return (
    <View className={`h-6 w-6 items-center justify-center rounded-md border ${checked ? 'border-charcoal bg-charcoal' : 'border-mid bg-white'}`}>
      {checked && <Ionicons name="checkmark" size={16} color={C.white} />}
    </View>
  );
}

export function Radio({ checked, onPress, label }: { checked: boolean; onPress: () => void; label: string }) {
  return (
    <Pressable onPress={onPress} accessibilityRole="radio" accessibilityState={{ checked }} className="min-h-11 flex-row items-center gap-3">
      <View className={`h-5 w-5 rounded-full ${checked ? 'border-[6px] border-charcoal' : 'border border-mid'}`} />
      <Txt v={checked ? 'bodyBold' : 'body'}>{label}</Txt>
    </Pressable>
  );
}

/* ---------- 보여주기 ---------- */

/** 동그란 가게 프로필 자리 */
export function Avatar({ size = 44, label }: { size?: number; label?: string }) {
  return (
    <View className="items-center justify-center rounded-full bg-sand" style={{ width: size, height: size }}>
      {label ? <Txt v="caption" tone="sub">{label}</Txt> : null}
    </View>
  );
}

/** 사진·대표 이미지 자리. 실제 이미지가 생기면 expo-image의 <Image>로 바꾸면 돼요. */
export function ImageSlot({ label, height, width, round = false, icon = true }: {
  label?: string; height: number; width?: number; round?: boolean; icon?: boolean;
}) {
  return (
    <View className={`items-center justify-center gap-2 bg-cream ${round ? 'rounded-full' : 'rounded-xl'} ${width === undefined ? 'self-stretch' : ''}`}
      style={{ width, height }}>
      {icon && <Ionicons name="image-outline" size={24} color={C.sub} />}
      {label ? <Txt tone="sub" className="text-center">{label}</Txt> : null}
    </View>
  );
}

export function InfoRow({ label, value, strong = false }: { label: string; value: string; strong?: boolean }) {
  return (
    <View className="flex-row justify-between gap-3">
      <Txt tone="sub">{label}</Txt>
      <Txt v={strong ? 'title' : 'body'} className="flex-shrink text-right">{value}</Txt>
    </View>
  );
}

/** info row: 라벨 · 내용 · 상태 태그 (확정 / 확인 필요) */
export function StatusRow({ label, value, status }: { label: string; value: string; status?: '확정' | '확인 필요' | string }) {
  return (
    <View className="flex-row items-center gap-3">
      <Txt tone="sub" className="w-[72px]">{label}</Txt>
      <Txt className="flex-1">{value}</Txt>
      {status && <Tag label={status} tone={status === '확정' ? 'line' : 'yellow'} />}
    </View>
  );
}

export function Divider() {
  return <View className="h-px bg-line" />;
}

const NOTICE = {
  cream: 'bg-cream border-line',
  sand: 'bg-sand border-sand',
  outline: 'bg-white border-charcoal',
};

/** notice: 아이콘 + 제목 + 설명 (AI 초안 안내, 확인 중, 공동 검토 등) */
export function Notice({ title, body, tone = 'cream', icon = 'information-circle-outline' }: {
  title: string; body?: string; tone?: keyof typeof NOTICE; icon?: IconName;
}) {
  return (
    <View className={`flex-row gap-3 rounded-xl border p-4 ${NOTICE[tone]}`}>
      <Ionicons name={icon} size={24} color={C.charcoal} />
      <View className="flex-1 gap-1">
        <Txt v="title">{title}</Txt>
        {body ? <Txt tone="sub">{body}</Txt> : null}
      </View>
    </View>
  );
}

/** 과정 탭: 가입 3단계 표시. 이전 단계는 눌러서 돌아갈 수 있어요. */
export function ProgressTabs({ step, onStep, total = 3 }: { step: number; onStep?: (i: number) => void; total?: number }) {
  return (
    <View className="flex-row gap-1.5" accessibilityRole="progressbar" accessibilityValue={{ min: 1, max: total, now: step }}>
      {Array.from({ length: total }, (_, i) => {
        const n = i + 1;
        const canGo = !!onStep && n < step;
        return (
          <Pressable key={i} disabled={!canGo} onPress={() => onStep?.(n)} hitSlop={10}
            accessibilityRole="button" accessibilityLabel={`${n}단계로 이동`} accessibilityState={{ disabled: !canGo }}
            className="flex-1 py-2">
            <View className={`h-1.5 rounded-full ${n <= step ? 'bg-charcoal' : 'bg-sand'}`} />
          </Pressable>
        );
      })}
    </View>
  );
}

/** segmented: 테두리 안에서 하나를 고르는 전환 (AI 추천 / 직접 설정 등) */
export function Segmented<T extends string>({ options, value, onChange }: { options: readonly T[]; value: T; onChange: (v: T) => void }) {
  return (
    <View className="h-11 flex-row rounded-lg border border-input" accessibilityRole="tablist">
      {options.map((o) => (
        <Pressable key={o} onPress={() => onChange(o)} accessibilityRole="tab" accessibilityState={{ selected: value === o }}
          className={`flex-1 items-center justify-center rounded-lg ${value === o ? 'bg-charcoal' : ''}`}>
          <Txt v={value === o ? 'title' : 'body'} tone={value === o ? 'white' : 'charcoal'}>{o}</Txt>
        </Pressable>
      ))}
    </View>
  );
}

/** 상단 탭: 밑줄로 선택을 보여주는 탭 (탐색의 맞춤 추천 / 모집 게시판) */
export function TopTabs<T extends string>({ options, value, onChange }: { options: readonly T[]; value: T; onChange: (v: T) => void }) {
  return (
    <View className="flex-row gap-7 px-5" accessibilityRole="tablist">
      {options.map((o) => {
        const on = value === o;
        return (
          <Pressable key={o} onPress={() => onChange(o)} accessibilityRole="tab" accessibilityState={{ selected: on }}
            className={`h-[46px] justify-center border-b-2 ${on ? 'border-charcoal' : 'border-transparent'}`}>
            <Txt v={on ? 'title' : 'body'} tone={on ? 'charcoal' : 'sub'}>{o}</Txt>
          </Pressable>
        );
      })}
    </View>
  );
}

/** 카드. onPress가 있으면 누를 수 있는 카드가 돼요. 간격은 gap(px)으로 정해요. */
export function Card({ children, onPress, onLongPress, pad = 'lg', gap = 8, selected = false, bg = 'white', border = 'line', row = false, radius = 12, style, accessibilityLabel }: {
  children: ReactNode; onPress?: () => void; onLongPress?: () => void; pad?: 'lg' | 'md' | 'none'; gap?: number; selected?: boolean;
  bg?: 'white' | 'cream' | 'yellow' | 'yellow-soft'; border?: 'line' | 'sand' | 'charcoal' | 'none'; row?: boolean; radius?: 12 | 16;
  style?: StyleProp<ViewStyle>; accessibilityLabel?: string;
}) {
  const borderCls = selected ? 'border-charcoal' : { line: 'border-line', sand: 'border-sand', charcoal: 'border-charcoal', none: 'border-transparent' }[border];
  const bgCls = selected && bg === 'white' ? 'bg-cream' : { white: 'bg-white', cream: 'bg-cream', yellow: 'bg-yellow', 'yellow-soft': 'bg-yellow-soft' }[bg];
  const padCls = { lg: 'p-4', md: 'p-3', none: '' }[pad];
  const cls = `border ${radius === 16 ? 'rounded-2xl' : 'rounded-xl'} ${borderCls} ${bgCls} ${padCls} ${row ? 'flex-row items-center' : ''}`;
  if (onPress || onLongPress) {
    return (
      <Pressable onPress={onPress} onLongPress={onLongPress} accessibilityRole="button" accessibilityState={{ selected }}
        accessibilityLabel={accessibilityLabel} className={`${cls} active:opacity-80`} style={[{ gap }, style]}>
        {children}
      </Pressable>
    );
  }
  return <View className={cls} style={[{ gap }, style]}>{children}</View>;
}

/** 카드 제목줄: 왼쪽 굵은 제목, 오른쪽 상태 글자 */
export function TitleRow({ title, aside, tone = 'charcoal' }: { title: string; aside?: ReactNode; tone?: 'charcoal' | 'white' }) {
  return (
    <View className="flex-row items-center justify-between gap-3">
      <Txt v="title" tone={tone} className="flex-shrink">{title}</Txt>
      {typeof aside === 'string' ? <Txt tone="sub">{aside}</Txt> : aside}
    </View>
  );
}

/** request item: 동그란 프로필 + 이름·설명 + 오른쪽 요소 */
export function ListItem({ title, sub, right, onPress }: { title: string; sub?: string; right?: ReactNode; onPress?: () => void }) {
  return (
    <Card row pad="md" gap={12} onPress={onPress} style={{ minHeight: 70 }} accessibilityLabel={title}>
      <Avatar />
      <View className="flex-1 gap-0.5">
        <Txt v="title" numberOfLines={1}>{title}</Txt>
        {sub ? <Txt tone="sub" numberOfLines={1}>{sub}</Txt> : null}
      </View>
      {right}
    </Card>
  );
}

/** 섹션 제목줄: 왼쪽 16 Bold, 오른쪽 보조 동작 */
export function SectionTitle({ title, action }: { title: string; action?: ReactNode }) {
  return (
    <View className="flex-row items-center justify-between">
      <Txt v="title">{title}</Txt>
      {action}
    </View>
  );
}

/* ---------- 겹쳐 뜨는 화면 ---------- */

function useAppear(visible: boolean) {
  const [anim] = useState(() => new Animated.Value(0));
  const [mounted, setMounted] = useState(visible);
  if (visible && !mounted) setMounted(true);
  useEffect(() => {
    Animated.timing(anim, { toValue: visible ? 1 : 0, duration: visible ? 300 : 200, useNativeDriver: NATIVE_DRIVER })
      .start(({ finished }) => { if (finished && !visible) setMounted(false); });
  }, [visible, anim]);
  return { anim, mounted };
}

/** 바텀 시트: 아래에서 위로 0.3초, 배경 딤 25% (Figma 오버레이 설정) */
export function BottomSheet({ visible, onClose, children, label }: { visible: boolean; onClose: () => void; children: ReactNode; label: string }) {
  const insets = useSafeAreaInsets();
  const { anim, mounted } = useAppear(visible);
  if (!mounted) return null;
  const translateY = anim.interpolate({ inputRange: [0, 1], outputRange: [400, 0] });
  return (
    <Modal visible transparent animationType="none" onRequestClose={onClose} statusBarTranslucent>
      <KeyboardAvoidingView className="flex-1" behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <Animated.View style={{ flex: 1, opacity: anim }}>
          <Pressable className="flex-1 bg-black/25" onPress={onClose} accessibilityLabel="닫기" />
        </Animated.View>
        {/* 배경색·모서리는 안쪽 View에 둬요 (Animated.View의 className은 웹에서 늦게 붙을 수 있어요) */}
        <Animated.View accessibilityViewIsModal accessibilityLabel={label} style={{ transform: [{ translateY }], maxHeight: '90%' }}>
          <View className="rounded-t-[20px] bg-white" style={{ paddingBottom: Math.max(insets.bottom, 12) }}>
            {children}
          </View>
        </Animated.View>
      </KeyboardAvoidingView>
    </Modal>
  );
}

/** 가운데 다이얼로그: 디졸브 0.2초, 배경 딤. 딤을 누르면 닫혀요. */
export function Dialog({ visible, onClose, children, label }: { visible: boolean; onClose: () => void; children: ReactNode; label: string }) {
  const { anim, mounted } = useAppear(visible);
  if (!mounted) return null;
  return (
    <Modal visible transparent animationType="none" onRequestClose={onClose} statusBarTranslucent>
      <Animated.View style={{ flex: 1, opacity: anim }}>
        <Pressable className="flex-1 items-center justify-center bg-black/40 px-5" onPress={onClose} accessibilityLabel="닫기">
          <Pressable className="w-full max-w-[362px] gap-5 rounded-[20px] bg-white p-5" onPress={() => {}}
            accessibilityViewIsModal accessibilityLabel={label}>
            {children}
          </Pressable>
        </Pressable>
      </Animated.View>
    </Modal>
  );
}

/** 확인 창 (로그아웃 확인 등) */
export function ConfirmModal({ visible, title, message, confirm, onConfirm, onCancel }: {
  visible: boolean; title: string; message: string; confirm: string; onConfirm: () => void; onCancel: () => void;
}) {
  return (
    <Dialog visible={visible} onClose={onCancel} label={title}>
      <View className="gap-2">
        <Txt v="h1" className="text-xl">{title}</Txt>
        <Txt tone="sub">{message}</Txt>
      </View>
      <View className="gap-3">
        <Button label={confirm} onPress={onConfirm} />
        <Button label="취소" variant="secondary" onPress={onCancel} />
      </View>
    </Dialog>
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
    Animated.timing(opacity, { toValue: 1, duration: 150, useNativeDriver: NATIVE_DRIVER }).start();
    const t = setTimeout(() => {
      Animated.timing(opacity, { toValue: 0, duration: 200, useNativeDriver: NATIVE_DRIVER }).start();
    }, 1800);
    return () => clearTimeout(t);
  }, [state.toast, opacity]);
  return (
    <Animated.View pointerEvents="none" accessibilityLiveRegion="polite"
      style={{ position: 'absolute', left: 0, right: 0, bottom: insets.bottom + 180, alignItems: 'center', opacity }}>
      {msg ? (
        <View className="rounded-full bg-charcoal px-4 py-2.5"><Txt tone="white">{msg}</Txt></View>
      ) : null}
    </Animated.View>
  );
}
