import React from 'react';
import { View, ViewStyle } from 'react-native';
import { C } from '../constants/colors';

interface CardProps {
  children: React.ReactNode;
  variant?: 'default' | 'dark' | 'olive' | 'amber' | 'blush' | 'terra' | 'gold';
  style?: ViewStyle;
  padding?: number;
}

const variantBg: Record<string, string> = {
  default: '#ffffff',
  dark:    C.jungleDeep,
  olive:   '#e5e6a6',
  amber:   C.amber,
  blush:   C.blush,
  terra:   C.terra,
  gold:    C.gold,
};

export function Card({ children, variant = 'default', style, padding = 20 }: CardProps) {
  return (
    <View
      className="rounded-3xl overflow-hidden relative shadow"
      style={[
        {
          padding,
          backgroundColor: variantBg[variant],
          shadowColor: C.jungleDeep,
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.08,
          shadowRadius: 16,
          elevation: 3,
        },
        style,
      ]}
    >
      {children}
    </View>
  );
}
