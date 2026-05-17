import React, { useState } from 'react';
import { View, Text, Pressable } from 'react-native';
import { C } from '../../../shared/constants/colors';
import { Icon } from '../../../shared/components/Icon';

interface SettingsRowProps {
  icon: React.ReactNode;
  title: string;
  value?: string;
  toggle?: boolean;
  onPress?: () => void;
  danger?: boolean;
  last?: boolean;
}

export function SettingsRow({ icon, title, value, toggle, onPress, danger, last }: SettingsRowProps) {
  const [on, setOn] = useState(true);

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => ({
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
        padding: 14,
        borderBottomWidth: last ? 0 : 1,
        borderBottomColor: 'rgba(22,56,40,0.06)',
        opacity: pressed && onPress ? 0.8 : 1,
      })}
    >
      <View
        className="w-[34px] h-[34px] rounded-md items-center justify-center"
        style={{ backgroundColor: danger ? 'rgba(231,88,56,0.12)' : 'rgba(22,56,40,0.06)' }}
      >
        {icon}
      </View>

      <Text
        className="flex-1 font-semibold"
        style={{ fontSize: 14.5, color: danger ? C.terra : C.jungleDeep }}
      >
        {title}
      </Text>

      {value && (
        <Text className="text-sm text-ink-2">{value}</Text>
      )}

      {toggle && (
        <Pressable
          onPress={(e) => { e.stopPropagation?.(); setOn(!on); }}
          className="w-11 h-[26px] rounded-full justify-center"
          style={{ backgroundColor: on ? C.jungleMid : 'rgba(22,56,40,0.18)' }}
        >
          <View
            className="w-5 h-5 rounded-full bg-white absolute"
            style={{
              left: on ? 21 : 3,
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 1 },
              shadowOpacity: 0.2,
              shadowRadius: 1,
              elevation: 2,
            }}
          />
        </Pressable>
      )}

      {!toggle && !value && onPress && (
        <Icon name="fwd" size={16} color={C.ink2} />
      )}
    </Pressable>
  );
}
