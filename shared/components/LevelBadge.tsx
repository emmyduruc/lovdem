import React from 'react';
import { View, Text } from 'react-native';
import { C } from '../constants/colors';
import { levelByKey } from '../constants/relationshipLevels';

interface LevelBadgeProps {
  level: string;
  size?: number;
}

export function LevelBadge({ level, size = 88 }: LevelBadgeProps) {
  const lvl = levelByKey(level);
  return (
    <View
      style={{
        width: size,
        height: size,
        borderRadius: size / 2,
        backgroundColor: lvl.bg,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: lvl.color,
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 1,
        shadowRadius: 0,
        borderWidth: 4,
        borderColor: C.cream,
      }}
    >
      <Text style={{ fontSize: size * 0.42, lineHeight: size * 0.46 }}>{lvl.glyph}</Text>
    </View>
  );
}
