import { View, Text } from 'react-native';
import { C } from '../../../shared/constants/colors';
import { RELATIONSHIP_LEVELS } from '../../../shared/constants/relationshipLevels';
import { LevelBadge } from '../../../shared/components/LevelBadge';

interface RelationshipLevelCardProps {
  level: string;
}

export function RelationshipLevelCard({ level }: RelationshipLevelCardProps) {
  const curIdx = RELATIONSHIP_LEVELS.findIndex((l) => l.key === level);
  const lvl = RELATIONSHIP_LEVELS[curIdx] || RELATIONSHIP_LEVELS[1];

  return (
    <View
      className="bg-amber-light rounded-3xl p-4 items-center gap-2.5"
      style={{
        shadowColor: C.jungleDeep,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.06,
        shadowRadius: 12,
        elevation: 2,
      }}
    >
      <Text className="text-2xs font-semibold tracking-widest uppercase text-brown-red">
        Relationship level
      </Text>
      <LevelBadge level={level} size={96} />
      <Text className="font-bold text-jungle-deep">{lvl.name}</Text>
      <View className="flex-row gap-1">
        {RELATIONSHIP_LEVELS.map((l, i) => (
          <View
            key={l.key}
            className="w-[7px] h-[7px] rounded-full"
            style={{ backgroundColor: i <= curIdx ? C.jungleDeep : `${C.jungleDeep}2E` }}
          />
        ))}
      </View>
    </View>
  );
}
