import { View, Text, Pressable, ScrollView, Dimensions } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { C } from '../../../shared/constants/colors';
import { AppData, Overlay } from '../../../shared/types';
import { Icon } from '../../../shared/components/Icon';
import { HeroCard } from '../components/HeroCard';
import { LoveLevelCard } from '../components/LoveLevelCard';
import { NextDateCard } from '../components/NextDateCard';
import { RelationshipLevelCard } from '../components/RelationshipLevelCard';
import { LatestBadgeCard } from '../components/LatestBadgeCard';
import { MicroActionCard } from '../components/MicroActionCard';
import { NextMeetingCard } from '../components/NextMeetingCard';
import { WishListCard } from '../components/WishListCard';

const { width } = Dimensions.get('window');
const H_PAD = 16;
const GAP = 12;
const CARD_HALF = (width - H_PAD * 2 - GAP) / 2;

function levelColor(v: number) {
  if (v >= 70) return C.jungleMid;
  if (v >= 35) return C.amber;
  return C.terra;
}
function levelLabel(v: number) {
  if (v >= 70) return 'Green zone';
  if (v >= 35) return 'Steady';
  return 'Needs care';
}

interface HomeScreenProps {
  data: AppData;
  setOverlay: (o: Overlay | null) => void;
  onOpenCode: () => void;
  onOpenDates: () => void;
}

export function HomeScreen({ data, setOverlay, onOpenCode, onOpenDates }: HomeScreenProps) {
  const insets = useSafeAreaInsets();
  const { me, partner } = data;

  return (
    <ScrollView
      className="flex-1 bg-cream"
      contentContainerStyle={{ paddingBottom: 130 }}
      showsVerticalScrollIndicator={false}
    >
      {/* Header */}
      <View
        className="px-4 pb-2 flex-row items-center justify-between"
        style={{ paddingTop: insets.top + 14 }}
      >
        <View>
          <Text className="text-sm text-ink-2 font-medium">Saturday · May 16</Text>
          <Text className="text-3xl font-bold text-ink" style={{ letterSpacing: -0.22 }}>
            Hey, {me.firstName}.
          </Text>
        </View>
        <View className="flex-row gap-2">
          <Pressable
            className="w-[42px] h-[42px] rounded-lg items-center justify-center bg-jungle-deep/[0.07]"
          >
            <Icon name="bell" size={20} color={C.jungleDeep} />
          </Pressable>
          <Pressable
            className="w-[42px] h-[42px] rounded-lg items-center justify-center bg-jungle-deep/[0.07]"
          >
            <Icon name="cog" size={20} color={C.jungleDeep} />
          </Pressable>
        </View>
      </View>

      {/* Bento grid */}
      <View className="px-4 gap-3">
        <HeroCard data={data} onOpenBadges={() => setOverlay('badges')} />

        {/* Love level cards — side by side */}
        <View className="flex-row gap-3">
          <View style={{ width: CARD_HALF }}>
            <LoveLevelCard
              value={me.loveLevel}
              label="Your love level"
              color={levelColor(me.loveLevel)}
              statusLabel={levelLabel(me.loveLevel)}
              onPress={() => setOverlay('levelMe')}
            />
          </View>
          <View style={{ width: CARD_HALF }}>
            <LoveLevelCard
              value={partner.loveLevel}
              label={`${partner.firstName}'s level`}
              color={levelColor(partner.loveLevel)}
              statusLabel="Updated 3h ago"
              onPress={() => setOverlay('levelPartner')}
              variant="olive"
            />
          </View>
        </View>

        <NextDateCard data={data} onPress={onOpenDates} />

        {/* Relationship level + badge — side by side */}
        <View className="flex-row gap-3">
          <View style={{ width: CARD_HALF }}>
            <RelationshipLevelCard level={data.relationshipLevel} />
          </View>
          <View style={{ width: CARD_HALF }}>
            <LatestBadgeCard onPress={() => setOverlay('badges')} />
          </View>
        </View>

        <MicroActionCard data={data} onDoIt={() => setOverlay('appreciation')} />
        <NextMeetingCard onPress={() => setOverlay('meeting')} />
        <WishListCard data={data} onPress={() => setOverlay('wish')} />
      </View>
    </ScrollView>
  );
}
