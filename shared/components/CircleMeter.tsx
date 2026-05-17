import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Svg, { Circle } from 'react-native-svg';

interface CircleMeterProps {
  value: number;
  size?: number;
  stroke?: number;
  color: string;
  bg?: string;
  sub?: string;
}

export function CircleMeter({ value, size = 96, stroke = 9, color, bg = 'rgba(22,56,40,0.10)', sub }: CircleMeterProps) {
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const clamped = Math.max(0, Math.min(100, value));
  const off = c * (1 - clamped / 100);

  return (
    <View style={{ width: size, height: size }}>
      <Svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        <Circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke={bg} strokeWidth={stroke} />
        <Circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke={color}
          strokeWidth={stroke}
          strokeDasharray={`${c}`}
          strokeDashoffset={off}
          strokeLinecap="round"
          rotation={-90}
          origin={`${size / 2}, ${size / 2}`}
        />
      </Svg>
      <View style={[StyleSheet.absoluteFill, { alignItems: 'center', justifyContent: 'center' }]}>
        <View style={{ flexDirection: 'row', alignItems: 'baseline' }}>
          <Text style={{ fontSize: size * 0.22, fontWeight: '700', letterSpacing: -0.02 * size * 0.22 }}>
            {value}
          </Text>
          <Text style={{ fontSize: size * 0.12, opacity: 0.6 }}>%</Text>
        </View>
        {sub && (
          <Text style={{ fontSize: 10, marginTop: 4, opacity: 0.65, fontWeight: '600', letterSpacing: 0.8, textTransform: 'uppercase' }}>
            {sub}
          </Text>
        )}
      </View>
    </View>
  );
}
