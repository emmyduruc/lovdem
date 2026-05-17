import { View, Text, Pressable } from 'react-native';
import { C } from '../../../shared/constants/colors';
import { Icon } from '../../../shared/components/Icon';
import { AppData } from '../../../shared/types';

interface WishListCardProps {
  data: AppData;
  onPress: () => void;
}

export function WishListCard({ data, onPress }: WishListCardProps) {
  return (
    <Pressable
      onPress={onPress}
      className="bg-white rounded-3xl p-[18px] flex-row items-center gap-3"
      style={({ pressed }) => ({
        opacity: pressed ? 0.9 : 1,
        shadowColor: C.jungleDeep,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.08,
        shadowRadius: 16,
        elevation: 3,
      })}
    >
      <View
        className="w-11 h-11 rounded-lg items-center justify-center"
        style={{ backgroundColor: `${C.terra}1F` }}
      >
        <Icon name="gift" size={20} color={C.terra} />
      </View>
      <View className="flex-1">
        <Text className="font-bold text-ink">{data.partner.firstName}'s wish list</Text>
        <Text className="text-ink-2 mt-0.5" style={{ fontSize: 12.5 }}>
          3 unclaimed · 1 you've secretly claimed
        </Text>
      </View>
      <Icon name="fwd" size={18} color={C.ink2} />
    </Pressable>
  );
}
