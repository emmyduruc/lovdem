import React, { useState } from 'react';
import { View, Pressable } from 'react-native';
import { C } from '../../../shared/constants/colors';
import { Icon } from '../../../shared/components/Icon';
import { AppText } from '../../../shared/components/AppText';

interface SettingsRowProps {
  iconName: string;
  title: string;
  value?: string;
  toggle?: boolean;
  onPress?: () => void;
  danger?: boolean;
  last?: boolean;
}

export function SettingsRow({
  iconName,
  title,
  value,
  toggle,
  onPress,
  danger,
  last,
}: SettingsRowProps) {
  const [on, setOn] = useState(true);
  const interactive = Boolean(onPress) || Boolean(toggle);

  const rowClassName = [
    'flex-row items-center min-h-14 py-3 px-4 gap-3',
    !last && 'border-b border-jungle-deep/10',
  ]
    .filter(Boolean)
    .join(' ');

  const content = (
    <>
      <View
        className={[
          'w-10 h-10 rounded-lg items-center justify-center shrink-0 border',
          danger ? 'bg-terra/10 border-terra/20' : 'bg-yellow-green/35 border-jungle-deep/10',
        ].join(' ')}
      >
        <Icon
          name={iconName}
          size={18}
          color={danger ? C.terra : C.jungleDeep}
        />
      </View>

      <AppText
        variant="bodyLg"
        color={danger ? C.terra : C.ink}
        style={{ flex: 1, flexShrink: 1, fontWeight: '600' }}
        numberOfLines={2}
      >
        {title}
      </AppText>

      {value ? (
        <View className="shrink-0 px-2.5 py-1.5 rounded-md bg-jungle-deep/[0.06] border border-jungle-deep/[0.08]">
          <AppText variant="caption" color={C.jungleMid} style={{ fontWeight: '600' }}>
            {value}
          </AppText>
        </View>
      ) : null}

      {toggle ? (
        <Pressable
          onPress={() => setOn((prev) => !prev)}
          accessibilityRole="switch"
          accessibilityState={{ checked: on }}
          className={[
            'w-12 h-7 rounded-full justify-center shrink-0',
            on ? 'bg-jungle-mid' : 'bg-jungle-deep/15',
          ].join(' ')}
        >
          <View
            className={[
              'w-[22px] h-[22px] rounded-full bg-white shadow-sm',
              on ? 'self-end mr-0.5' : 'self-start ml-0.5',
            ].join(' ')}
          />
        </Pressable>
      ) : null}

      {!toggle && !value && onPress ? (
        <Icon name="fwd" size={16} color={C.muted} />
      ) : null}
    </>
  );

  if (interactive && !toggle) {
    return (
      <Pressable
        onPress={onPress}
        className={rowClassName}
        style={({ pressed }) => (pressed ? { backgroundColor: 'rgba(22, 56, 40, 0.04)' } : undefined)}
      >
        {content}
      </Pressable>
    );
  }

  return <View className={rowClassName}>{content}</View>;
}
