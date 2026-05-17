import React from 'react';
import { View } from 'react-native';

interface ProgressBarProps {
  value: number;
  color: string;
  bg?: string;
  height?: number;
}

export function ProgressBar({ value, color, bg = 'rgba(22,56,40,0.08)', height = 10 }: ProgressBarProps) {
  const pct = Math.max(0, Math.min(100, value));
  return (
    <View className="rounded-full overflow-hidden" style={{ height, backgroundColor: bg }}>
      <View className="h-full rounded-full" style={{ width: `${pct}%`, backgroundColor: color }} />
    </View>
  );
}
