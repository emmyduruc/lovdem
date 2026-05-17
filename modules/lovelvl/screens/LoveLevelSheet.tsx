import React, { useState, useEffect } from 'react';
import { View, Text, Pressable } from 'react-native';
import Slider from '@react-native-community/slider';
import { C } from '../../../shared/constants/colors';
import { AppData } from '../../../shared/types';
import { Drawer } from '../../../shared/components/Drawer';
import { CircleMeter } from '../../../shared/components/CircleMeter';
import { Button } from '../../../shared/components/Button';

const PRESETS = [
  { v: 25, label: 'Running low' },
  { v: 55, label: 'Holding steady' },
  { v: 85, label: 'Full & soft' },
];

interface LoveLevelSheetProps {
  open: boolean;
  who: 'me' | 'partner';
  data: AppData;
  setData: React.Dispatch<React.SetStateAction<AppData>>;
  onClose: () => void;
}

export function LoveLevelSheet({ open, who, data, setData, onClose }: LoveLevelSheetProps) {
  const target = data[who];
  const [value, setValue] = useState(target.loveLevel);

  useEffect(() => {
    if (open) setValue(target.loveLevel);
  }, [open]);

  const color = value >= 70 ? C.jungleMid : value >= 35 ? C.amber : C.terra;
  const label = value >= 70
    ? 'Green zone — keep watering it'
    : value >= 35
    ? 'Steady — small moves matter'
    : 'Low — Leo will give your partner a gentle heads up';

  const save = () => {
    setData((d) => ({ ...d, [who]: { ...d[who], loveLevel: value } }));
    onClose();
  };

  return (
    <Drawer open={open} onClose={onClose}>
      <Text className="text-2xs font-semibold tracking-widest uppercase" style={{ color }}>
        Update {who === 'me' ? 'your' : `${data[who].firstName}'s`} love level
      </Text>
      <Text className="text-5xl font-bold text-ink mt-2" style={{ letterSpacing: -0.26 }}>
        How full does your tank feel today?
      </Text>
      <Text className="text-base-plus leading-base text-ink-2 mt-2">
        Only you can update your own level. {data.partner.firstName} sees this in real time.
      </Text>

      <View className="items-center mt-5">
        <CircleMeter value={value} size={180} stroke={14} color={color} />
      </View>
      <Text className="text-center mt-2.5 text-sm text-ink-2">{label}</Text>

      <View className="mt-[18px] -mx-1">
        <Slider
          minimumValue={0}
          maximumValue={100}
          step={5}
          value={value}
          onValueChange={(v: number) => setValue(Math.round(v))}
          minimumTrackTintColor={color}
          maximumTrackTintColor="rgba(22,56,40,0.12)"
          thumbTintColor={color}
        />
      </View>

      <View className="mt-1 flex-row gap-2">
        {PRESETS.map((p) => (
          <Pressable
            key={p.v}
            onPress={() => setValue(p.v)}
            className="flex-1 rounded-lg p-2.5 items-center border-[1.5px]"
            style={{
              backgroundColor: value === p.v ? C.jungleDeep : '#ffffff',
              borderColor: 'rgba(22,56,40,0.10)',
            }}
          >
            <Text className="text-xs font-semibold" style={{ color: value === p.v ? C.cream : C.jungleDeep }}>
              {p.label}
            </Text>
          </Pressable>
        ))}
      </View>

      <View className="mt-[18px]">
        <Button label="Save level" onPress={save} fullWidth />
      </View>
    </Drawer>
  );
}
