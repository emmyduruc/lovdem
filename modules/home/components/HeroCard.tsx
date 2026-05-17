import { View, Text } from 'react-native';
import { RELATIONSHIP_LEVELS } from '../../../shared/constants/relationshipLevels';
import { AppData } from '../../../shared/types';
import { C } from '../../../shared/constants/colors';
import { Card } from '../../../shared/components/Card';
import { HeartSpots } from '../../../shared/components/HeartSpots';
import { LeafCorner } from '../../../shared/components/LeafCorner';
import { Avatar } from '../../../shared/components/Avatar';
import { Leo } from '../../../shared/components/Leo';
import { Button } from '../../../shared/components/Button';

interface HeroCardProps {
  data: AppData;
  onOpenBadges: () => void;
}

export function HeroCard({ data, onOpenBadges }: HeroCardProps) {
  const { me, partner, relationshipLevel } = data;
  const reLevel = RELATIONSHIP_LEVELS.find((l) => l.key === relationshipLevel) || RELATIONSHIP_LEVELS[1];
  const levelIdx = RELATIONSHIP_LEVELS.findIndex((l) => l.key === relationshipLevel);
  const bothLow = Math.min(me.loveLevel, partner.loveLevel) < 35;

  return (
    <Card variant="dark" padding={22} style={{ minHeight: 184 }}>
      <HeartSpots opacity={0.14} color={C.cream} />
      <LeafCorner position="tr" kind={1} size={140} opacity={0.5} />
      <View className="relative">
        <Text
          className="text-2xs font-semibold tracking-widest uppercase"
          style={{ color: `${C.white}99` }}
        >
          Together since Mar 2023
        </Text>
        <View className="flex-row items-center mt-2.5">
          <View className="flex-row">
            <Avatar initial={me.firstName.charAt(0)} variant="default" size="lg" />
            <Avatar initial={partner.firstName.charAt(0)} variant="alt" size="lg" style={{ marginLeft: -16 }} />
          </View>
          <View className="ml-3.5 flex-1">
            <Text className="text-2xl font-bold text-cream">
              {me.firstName} & {partner.firstName}
            </Text>
            <Text className="text-sm mt-0.5 text-cream" style={{ opacity: 0.7 }}>
              {reLevel.name} · Lv. {levelIdx + 1}/5
            </Text>
          </View>
        </View>
        <View className="mt-4 flex-row items-end gap-3">
          <Leo size={88} mood={bothLow ? 'concerned' : 'happy'} />
          <View className="flex-1 pb-2">
            <Text className="text-md leading-lg text-cream" style={{ opacity: 0.92 }}>
              {bothLow
                ? 'A quiet nudge: one of you is running low. Want to plan something small?'
                : "Today you're both in the green. Keep watering it."}
            </Text>
            <View className="mt-2.5">
              <Button label="See progress" onPress={onOpenBadges} variant="olive" size="sm" />
            </View>
          </View>
        </View>
      </View>
    </Card>
  );
}
