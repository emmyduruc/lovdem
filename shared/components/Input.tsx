import React, { useState } from 'react';
import { TextInput, TextInputProps, View, Text } from 'react-native';
import { C } from '../constants/colors';

interface InputProps extends TextInputProps {
  label?: string;
  multiline?: boolean;
  numberOfLines?: number;
}

export function Input({ label, style, multiline, numberOfLines, ...props }: InputProps) {
  const [focused, setFocused] = useState(false);

  return (
    <View>
      {label && (
        <Text className="text-xs font-semibold text-ink-2 mb-1.5" style={{ letterSpacing: 0.25 }}>
          {label}
        </Text>
      )}
      <TextInput
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        multiline={multiline}
        numberOfLines={numberOfLines}
        style={[
          {
            width: '100%',
            borderWidth: 1.5,
            borderColor: focused ? C.jungleMid : 'rgba(22,56,40,0.12)',
            backgroundColor: '#fff',
            borderRadius: 16,
            paddingHorizontal: 16,
            paddingVertical: 14,
            fontSize: 16,
            color: C.ink,
            fontFamily: 'PlusJakartaSans_400Regular',
          },
          multiline && { textAlignVertical: 'top', minHeight: numberOfLines ? numberOfLines * 22 + 28 : 80 },
          style,
        ]}
        placeholderTextColor="rgba(26,41,32,0.4)"
        {...props}
      />
    </View>
  );
}
