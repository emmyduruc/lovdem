import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { C } from '../constants/colors';
import { Icon } from './Icon';

interface AppBarProps {
  title?: string;
  onBack?: () => void;
  right?: React.ReactNode;
  dark?: boolean;
}

export function AppBar({ title, onBack, right, dark = false }: AppBarProps) {
  const insets = useSafeAreaInsets();
  const color = dark ? '#ffffff' : C.jungleDeep;

  return (
    <View
      className="flex-row items-center justify-between px-4 pb-1.5"
      style={{ paddingTop: insets.top + 12 }}
    >
      <View className="w-10 h-10 items-center justify-center">
        {onBack && (
          <Pressable
            onPress={onBack}
            style={({ pressed }) => ({
              width: 40,
              height: 40,
              borderRadius: 14,
              backgroundColor: dark ? 'rgba(56, 56, 56, 0.1)' : 'rgba(22,56,40,0.07)',
              alignItems: 'center',
              justifyContent: 'center',
              opacity: pressed ? 0.7 : 1,
            })}
          >
            <Icon name="back" size={20} color={color} />
          </Pressable>
        )}
      </View>
      <Text className="text-lg font-bold" style={{ letterSpacing: -0.16, color }}>
        {title}
      </Text>
      <View className="w-10 h-10 items-end justify-center">
        {right}
      </View>
    </View>
  );
}
