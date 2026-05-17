import React from 'react';
import { StyleSheet } from 'react-native';
import Leaf from '../../assets/leaf.svg';
import Leaf2 from '../../assets/leaf-2.svg';

interface LeafCornerProps {
  position?: 'tr' | 'bl' | 'br';
  kind?: 1 | 2;
  size?: number;
  opacity?: number;
}

const positionStyles = {
  tr: { top: -16, right: -14, transform: [{ rotate: '28deg' }] },
  bl: { bottom: -18, left: -16, transform: [{ rotate: '220deg' }] },
  br: { bottom: -18, right: -14, transform: [{ rotate: '140deg' }] },
};

export function LeafCorner({ position = 'tr', kind = 1, size = 90, opacity = 0.85 }: LeafCornerProps) {
  const pos = positionStyles[position];
  const SvgLeaf = kind === 2 ? Leaf2 : Leaf;
  return (
    <SvgLeaf
      width={size}
      height={size}
      style={[StyleSheet.absoluteFillObject, { width: size, height: size, opacity, ...pos }]}
    />
  );
}
