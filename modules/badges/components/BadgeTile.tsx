import React from 'react';
import { View, Text } from 'react-native';
import { C } from '../../../shared/constants/colors';

interface Badge {
  name: string;
  emoji: string;
  color: string;
  when?: string;
}

interface BadgeTileProps {
  badge: Badge;
}

export function BadgeTile({ badge }: BadgeTileProps) {
  return (
    <View
      className="rounded-3xl p-3 bg-white items-center gap-1.5"
      style={{
        shadowColor: C.jungleDeep,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.06,
        shadowRadius: 8,
        elevation: 2,
      }}
    >
      <View
        className="w-14 h-14 rounded-xl items-center justify-center"
        style={{ backgroundColor: badge.color }}
      >
        <Text className="text-5xl">{badge.emoji}</Text>
      </View>
      <Text className="text-center font-bold text-ink" style={{ fontSize: 11.5, lineHeight: 15 }}>
        {badge.name}
      </Text>
      {badge.when && (
        <Text className="text-ink-2" style={{ fontSize: 10 }}>{badge.when}</Text>
      )}
    </View>
  );
}
