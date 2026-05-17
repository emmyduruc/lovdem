import { View, Text, Pressable } from 'react-native';
import { C } from '../../../shared/constants/colors';
import { Icon } from '../../../shared/components/Icon';

interface NextMeetingCardProps {
  onPress: () => void;
}

export function NextMeetingCard({ onPress }: NextMeetingCardProps) {
  return (
    <Pressable
      onPress={onPress}
      className="bg-olive rounded-3xl p-[18px]"
      style={({ pressed }) => ({
        opacity: pressed ? 0.9 : 1,
        shadowColor: C.jungleDeep,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.06,
        shadowRadius: 12,
        elevation: 2,
      })}
    >
      <View className="flex-row items-center gap-3.5">
        <View className="w-14 h-14 rounded-2xl bg-jungle-deep items-center justify-center">
          <Text className="text-[10px] opacity-70 font-semibold tracking-wider text-cream">SUN</Text>
          <Text className="text-3xl font-extrabold text-cream" style={{ lineHeight: 26 }}>18</Text>
        </View>
        <View className="flex-1">
          <Text
            className="text-2xs font-semibold tracking-widest uppercase text-jungle-deep"
            style={{ opacity: 0.65 }}
          >
            Next relationship meeting
          </Text>
          <Text className="font-bold text-jungle-deep text-lg mt-0.5">
            Sunday · 10:30 over coffee
          </Text>
          <Text className="text-ink-2 mt-0.5" style={{ fontSize: 12.5 }}>
            4 prompts ready · weekly cadence
          </Text>
        </View>
        <Icon name="fwd" size={18} color={C.jungleDeep} />
      </View>
    </Pressable>
  );
}
