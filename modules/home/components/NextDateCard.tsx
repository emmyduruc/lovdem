import { View, Text, Pressable } from 'react-native';
import { C } from '../../../shared/constants/colors';
import { Icon } from '../../../shared/components/Icon';
import { AppData } from '../../../shared/types';

interface NextDateCardProps {
  data: AppData;
  onPress: () => void;
}

export function NextDateCard({ data, onPress }: NextDateCardProps) {
  return (
    <Pressable
      onPress={onPress}
      className="bg-white rounded-3xl p-[18px] flex-row items-center gap-3.5"
      style={({ pressed }) => ({
        opacity: pressed ? 0.9 : 1,
        shadowColor: C.jungleDeep,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.08,
        shadowRadius: 16,
        elevation: 3,
      })}
    >
      {/* Icon container — blush core with amber border to approximate the gradient */}
      <View
        className="w-16 h-16 rounded-xl items-center justify-center"
        style={{
          backgroundColor: C.blush,
          borderWidth: 2,
          borderColor: `${C.amber}60`,
        }}
      >
        <Icon name="cal" size={26} color={C.brownRed} stroke={1.8} />
      </View>

      <View className="flex-1 min-w-0">
        <Text className="text-2xs font-semibold tracking-widest uppercase text-brown-red">
          Next date · Wed 19:30
        </Text>
        <View className="flex-row items-center gap-1.5 mt-1">
          <Icon name="lock" size={14} color={C.brownRed} />
          <Text className="font-bold text-xl text-ink">A small mystery</Text>
        </View>
        <Text className="text-sm text-ink-2 mt-0.5">
          {data.partner.firstName} is planning. Hidden until confirmed.
        </Text>
      </View>
      <Icon name="fwd" size={18} color={C.ink2} />
    </Pressable>
  );
}
