import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { C } from '../../../shared/constants/colors';
import { AppData } from '../../../shared/types';

interface WhoToggleProps {
  who: 'me' | 'partner';
  data: AppData;
  onChange: (who: 'me' | 'partner') => void;
}

export function WhoToggle({ who, data, onChange }: WhoToggleProps) {
  return (
    <View
      className="bg-white rounded-xl p-1 flex-row gap-1 border-[1.5px]"
      style={{ borderColor: 'rgba(22,56,40,0.08)' }}
    >
      {(['me', 'partner'] as const).map((k) => {
        const isActive = who === k;
        const person = data[k];
        return (
          <Pressable
            key={k}
            onPress={() => onChange(k)}
            className="flex-1 h-[42px] rounded-lg flex-row items-center justify-center gap-2"
            style={{ backgroundColor: isActive ? C.jungleDeep : 'transparent' }}
          >
            <View
              className="w-[22px] h-[22px] rounded-full items-center justify-center"
              style={{ backgroundColor: k === 'partner' ? C.terra : C.gold }}
            >
              <Text className="text-[10px] font-bold text-white">{person.firstName.charAt(0)}</Text>
            </View>
            <Text className="font-bold text-base" style={{ color: isActive ? C.cream : C.jungleDeep }}>
              {person.firstName}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}
