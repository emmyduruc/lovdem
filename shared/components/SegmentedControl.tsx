import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { C } from '../constants/colors';

interface Segment {
  key: string;
  label: string;
}

interface SegmentedControlProps {
  segments: Segment[];
  active: string;
  onChange: (key: string) => void;
  dark?: boolean;
}

export function SegmentedControl({ segments, active, onChange, dark = false }: SegmentedControlProps) {
  return (
    <View
      className="rounded-lg p-1 flex-row gap-1"
      style={{ backgroundColor: dark ? 'rgba(255,255,255,0.10)' : 'rgba(22,56,40,0.06)' }}
    >
      {segments.map((seg) => {
        const isActive = active === seg.key;
        return (
          <Pressable
            key={seg.key}
            onPress={() => onChange(seg.key)}
            className="flex-1 h-9 rounded-[10px] items-center justify-center"
            style={{
              backgroundColor: isActive ? (dark ? C.cream : '#ffffff') : 'transparent',
            }}
          >
            <Text
              className="font-bold text-sm"
              style={{
                color: dark
                  ? isActive ? C.jungleDeep : 'rgba(255,255,255,0.7)'
                  : C.jungleDeep,
              }}
            >
              {seg.label}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}
