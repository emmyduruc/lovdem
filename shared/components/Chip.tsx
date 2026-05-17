import React from 'react';
import { View, Text, ViewStyle } from 'react-native';
import { C } from '../constants/colors';

interface ChipProps {
  label: string;
  variant?: 'default' | 'dark' | 'terra' | 'gold' | 'green';
  dot?: boolean;
  style?: ViewStyle;
}

const variants = {
  default: { bg: 'rgba(22,56,40,0.07)', color: C.jungleDeep },
  dark:    { bg: 'rgba(255,255,255,0.12)', color: '#f6f5d8' },
  terra:   { bg: 'rgba(231,88,56,0.14)', color: C.terra },
  gold:    { bg: 'rgba(194,141,29,0.14)', color: C.gold },
  green:   { bg: 'rgba(74,111,82,0.14)', color: C.jungleMid },
};

export function Chip({ label, variant = 'default', dot = false, style }: ChipProps) {
  const v = variants[variant];
  return (
    <View
      className="flex-row items-center rounded-full"
      style={[{ gap: 6, height: 28, paddingHorizontal: 12, backgroundColor: v.bg }, style]}
    >
      {dot && (
        <View style={{ width: 6, height: 6, borderRadius: 3, backgroundColor: v.color }} />
      )}
      <Text className="text-xs font-semibold tracking-wide" style={{ color: v.color }}>
        {label}
      </Text>
    </View>
  );
}
