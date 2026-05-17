import { Pressable, Text, View } from 'react-native';
import { C } from '../../../shared/constants/colors';
import { CircleMeter } from '../../../shared/components/CircleMeter';

interface LoveLevelCardProps {
  value: number;
  label: string;
  color: string;
  statusLabel: string;
  onPress: () => void;
  variant?: 'default' | 'olive';
}

export function LoveLevelCard({ value, label, color, statusLabel, onPress, variant = 'default' }: LoveLevelCardProps) {
  const isOlive = variant === 'olive';

  return (
    <Pressable
      onPress={onPress}
      className={isOlive ? 'bg-olive rounded-3xl p-4' : 'bg-white rounded-3xl p-4'}
      style={({ pressed }) => ({
        opacity: pressed ? 0.9 : 1,
        shadowColor: C.jungleDeep,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.08,
        shadowRadius: 16,
        elevation: 3,
      })}
    >
      <Text
        className="text-2xs font-semibold tracking-widest uppercase"
        style={{
          color: isOlive ? C.jungleDeep : color,
          opacity: isOlive ? 0.7 : 1,
        }}
      >
        {label}
      </Text>
      <View className="items-center mt-1.5">
        <CircleMeter
          value={value}
          size={104}
          stroke={10}
          color={color}
          bg={isOlive ? `${C.jungleDeep}26` : undefined}
        />
      </View>
      <Text
        className="mt-2 text-center text-xs font-semibold"
        style={{ color: isOlive ? C.jungleDeep : C.ink2 }}
      >
        {statusLabel}
      </Text>
    </Pressable>
  );
}
