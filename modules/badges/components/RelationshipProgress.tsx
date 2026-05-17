import React from 'react';
import { View, Text } from 'react-native';
import { C } from '../../../shared/constants/colors';
import { RELATIONSHIP_LEVELS, levelByKey } from '../../../shared/constants/relationshipLevels';
import { LevelBadge } from '../../../shared/components/LevelBadge';
import { LeafCorner } from '../../../shared/components/LeafCorner';
import { ProgressBar } from '../../../shared/components/ProgressBar';

interface RelationshipProgressProps {
  level: string;
}

export function RelationshipProgress({ level }: RelationshipProgressProps) {
  const curIdx = RELATIONSHIP_LEVELS.findIndex((l) => l.key === level);
  const lvl = levelByKey(level);
  const nextLvl = RELATIONSHIP_LEVELS[curIdx + 1];

  return (
    <View className="rounded-3xl p-[18px] overflow-hidden relative" style={{ backgroundColor: '#f1d99a' }}>
      <LeafCorner position="tr" kind={2} size={100} opacity={0.5} />
      <View className="relative">
        <Text className="text-2xs font-semibold tracking-widest uppercase text-brown-red">
          Relationship level
        </Text>
        <View className="flex-row items-center gap-3.5 mt-2">
          <LevelBadge level={level} size={88} />
          <View className="flex-1">
            <Text className="text-2xl font-bold text-jungle-deep">{lvl.name}</Text>
            {nextLvl && (
              <>
                <Text className="text-ink-2 mt-0.5" style={{ fontSize: 12.5 }}>62% to {nextLvl.name}</Text>
                <View className="mt-2">
                  <ProgressBar value={62} color={C.jungleDeep} bg="rgba(22,56,40,0.14)" />
                </View>
              </>
            )}
          </View>
        </View>
        <View className="flex-row justify-between mt-3">
          {RELATIONSHIP_LEVELS.map((l, i) => {
            const active = i <= curIdx;
            return (
              <View key={l.key} className="items-center gap-1" style={{ opacity: active ? 1 : 0.45 }}>
                <Text className="text-3xl">{l.glyph}</Text>
                <Text className="font-bold text-jungle-deep" style={{ fontSize: 10.5, letterSpacing: 0.3 }}>{l.name}</Text>
              </View>
            );
          })}
        </View>
      </View>
    </View>
  );
}
