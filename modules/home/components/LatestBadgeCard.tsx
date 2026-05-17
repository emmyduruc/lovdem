import { View, Text, Pressable } from 'react-native';
import { C } from '../../../shared/constants/colors';
import { HeartSpots } from '../../../shared/components/HeartSpots';

interface LatestBadgeCardProps {
  onPress: () => void;
}

export function LatestBadgeCard({ onPress }: LatestBadgeCardProps) {
  return (
    <Pressable
      onPress={onPress}
      className="bg-jungle-deep rounded-3xl p-4 overflow-hidden"
      style={({ pressed }) => ({
        opacity: pressed ? 0.88 : 1,
        shadowColor: C.jungleDeep,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 12,
        elevation: 4,
      })}
    >
      <HeartSpots opacity={0.10} color={C.cream} />
      <View className="relative">
        <Text
          className="text-2xs font-semibold tracking-widest uppercase"
          style={{ color: `${C.white}99` }}
        >
          Latest badge
        </Text>
        <View
          className="w-16 h-16 rounded-xl mt-2.5 items-center justify-center"
          style={{
            backgroundColor: `${C.white}1A`,
            borderWidth: 1.5,
            borderColor: `${C.yellowGreen}80`,
          }}
        >
          <Text style={{ fontSize: 28 }}>✨</Text>
        </View>
        <Text className="mt-2.5 font-bold text-cream">First Spark</Text>
        <Text className="text-xs mt-0.5 text-cream" style={{ opacity: 0.7 }}>2 days ago</Text>
      </View>
    </Pressable>
  );
}
