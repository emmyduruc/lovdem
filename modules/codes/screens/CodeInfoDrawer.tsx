import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { C } from '../../../shared/constants/colors';
import {
  codeByKey,
  LOVE_CODE_LOOKS_LIKE,
  LOVE_CODE_DOESNT_LOOK_LIKE,
  LOVE_CODE_DAILY_ACTIONS,
} from '../../../shared/constants/loveCodes';
import { Drawer } from '../../../shared/components/Drawer';
import { Button } from '../../../shared/components/Button';
import { Input } from '../../../shared/components/Input';

interface CodeInfoDrawerProps {
  codeKey: string | null;
  onClose: () => void;
}

export function CodeInfoDrawer({ codeKey, onClose }: CodeInfoDrawerProps) {
  if (!codeKey) return null;
  const code = codeByKey(codeKey);
  const looksLike = LOVE_CODE_LOOKS_LIKE[codeKey] || [];
  const doesntLookLike = LOVE_CODE_DOESNT_LOOK_LIKE[codeKey] || [];
  const dailyActions = LOVE_CODE_DAILY_ACTIONS[codeKey] || [];

  return (
    <Drawer open={!!codeKey} onClose={onClose}>
      <View className="gap-1">
        <View className="flex-row items-center gap-3">
          <View
            className="w-[52px] h-[52px] rounded-2xl"
            style={{ backgroundColor: code.color }}
          />
          <View>
            <Text className="text-3xl font-bold text-ink tracking-tight">
              {code.name}
            </Text>
            <Text className="font-semibold text-ink-2" style={{ fontSize: 12.5 }}>{code.full}</Text>
          </View>
        </View>

        <Text className="mt-4 text-md leading-lg text-ink-2">
          {code.blurb}
        </Text>

        <View className="mt-[18px] flex-row gap-2.5">
          <View className="flex-1 rounded-3xl p-3.5 bg-olive overflow-hidden">
            <Text className="text-2xs font-semibold tracking-widest uppercase text-jungle-deep opacity-70">
              Looks like
            </Text>
            {looksLike.map((t) => (
              <Text key={t} className="font-medium text-jungle-deep py-[3px]" style={{ fontSize: 12.5, lineHeight: 19 }}>
                {t}
              </Text>
            ))}
          </View>
          <View className="flex-1 rounded-3xl p-3.5 bg-blush overflow-hidden">
            <Text className="text-2xs font-semibold tracking-widest uppercase text-brown-red opacity-75">
              Doesn't look like
            </Text>
            {doesntLookLike.map((t) => (
              <Text key={t} className="font-medium text-brown-red py-[3px]" style={{ fontSize: 12.5, lineHeight: 19 }}>
                {t}
              </Text>
            ))}
          </View>
        </View>

        <Text className="mt-[18px] text-2xs font-semibold tracking-widest uppercase text-jungle-mid mb-2">
          Daily action examples
        </Text>
        <View className="gap-2">
          {dailyActions.map((t, i) => (
            <View
              key={i}
              className="rounded-3xl p-3.5 bg-white flex-row items-center gap-3"
              style={{
                shadowColor: C.jungleDeep,
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.05,
                shadowRadius: 8,
                elevation: 1,
              }}
            >
              <View className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: code.color }} />
              <Text className="text-ink flex-1" style={{ fontSize: 13.5 }}>{t}</Text>
            </View>
          ))}
        </View>

        <Text className="mt-[18px] text-2xs font-semibold tracking-widest uppercase text-jungle-mid mb-2">
          Your note
        </Text>
        <Input
          multiline
          numberOfLines={3}
          placeholder={`For me, ${code.name} looks like…`}
          style={{ fontSize: 14 }}
        />

        <View className="mt-4">
          <Button label="Save & close" onPress={onClose} fullWidth />
        </View>
      </View>
    </Drawer>
  );
}
