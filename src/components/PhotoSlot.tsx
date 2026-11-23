
import { Image, Pressable, View } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Ionicons } from '@expo/vector-icons';
import { C } from '@/lib/colors';
import { Txt } from './ui';

export function PhotoSlot({ uri, label, onChange, onDenied }: {
  uri: string | null; label: string; onChange: (uri: string | null) => void; onDenied: () => void;
}) {
  const pick = async () => {
    
    const perm = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!perm.granted) return onDenied();
    const res = await ImagePicker.launchImageLibraryAsync({ mediaTypes: ['images'], allowsEditing: true, aspect: [1, 1], quality: 0.7 });
    if (!res.canceled && res.assets[0]) onChange(res.assets[0].uri);
  };
  return (
    <View className="items-center gap-2.5">
      {uri ? (
        <View className="h-[88px] w-[88px] overflow-hidden rounded-lg border border-sand">
          <Image source={{ uri }} style={{ width: 88, height: 88 }} accessibilityLabel={`${label} 사진`} />
          <Pressable onPress={() => onChange(null)} hitSlop={8} accessibilityRole="button" accessibilityLabel={`${label} 사진 지우기`}
            className="absolute right-1 top-1 h-5 w-5 items-center justify-center rounded-full bg-black">
            <Ionicons name="close" size={14} color={C.white} />
          </Pressable>
        </View>
      ) : (
        <Pressable onPress={pick} accessibilityRole="button" accessibilityLabel={`${label} 사진 추가`}
          className="h-[88px] w-[88px] items-center justify-center rounded-lg border border-sand bg-cream active:opacity-70">
          <Txt tone="sub">+ 추가</Txt>
        </Pressable>
      )}
      <Txt v="title">{label}</Txt>
    </View>
  );
}
