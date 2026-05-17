import React from 'react';
import { StyleSheet } from 'react-native';
import Svg, { G, Path } from 'react-native-svg';

interface HeartSpotsProps {
  opacity?: number;
  color?: string;
}

const spots = Array.from({ length: 24 }, (_, i) => ({
  cx: (i * 53) % 320 + (i % 3) * 11,
  cy: ((i * 71) % 480) + ((i % 4) * 7),
  r: 8 + ((i * 13) % 7),
  rot: (i * 37) % 360,
}));

export function HeartSpots({ opacity = 0.1, color = '#163828' }: HeartSpotsProps) {
  return (
    <Svg
      style={[StyleSheet.absoluteFill, { opacity }]}
      viewBox="0 0 320 480"
      preserveAspectRatio="xMidYMid slice"
      pointerEvents="none"
    >
      {spots.map(({ cx, cy, r, rot }, i) => (
        <G key={i} transform={`translate(${cx},${cy}) rotate(${rot}) scale(${r / 8})`}>
          <Path
            d="M0 1 C 0 -3 -6 -4 -6 1 C -6 5 0 9 0 9 C 0 9 6 5 6 1 C 6 -4 0 -3 0 1 Z"
            fill={color}
          />
        </G>
      ))}
    </Svg>
  );
}
