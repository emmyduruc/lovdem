import React from 'react';
import { View, Text } from 'react-native';
import { C } from '../../../shared/constants/colors';
import { Icon } from '../../../shared/components/Icon';
import { Chip } from '../../../shared/components/Chip';

interface DateItem {
  title: string;
  month: string;
  day: string;
  time: string;
  where: string;
  planner: string;
  confirmed?: boolean;
  completed?: boolean;
  bg: string;
  fg: string;
}

interface DateListItemProps {
  item: DateItem;
}

export function DateListItem({ item }: DateListItemProps) {
  return (
    <View
      className="rounded-3xl p-4 bg-white flex-row gap-3.5"
      style={{
        shadowColor: C.jungleDeep,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.06,
        shadowRadius: 12,
        elevation: 2,
      }}
    >
      <View
        className="w-14 h-16 rounded-lg items-center justify-center flex-shrink-0"
        style={{ backgroundColor: item.bg }}
      >
        <Text className="text-[10px] opacity-70 font-bold tracking-wider" style={{ color: item.fg }}>
          {item.month}
        </Text>
        <Text className="text-3xl font-extrabold leading-[26px]" style={{ color: item.fg }}>{item.day}</Text>
      </View>
      <View className="flex-1 min-w-0">
        <Text className="font-bold text-lg text-ink">{item.title}</Text>
        <View className="flex-row gap-2 mt-0.5 flex-wrap">
          <View className="flex-row items-center gap-1">
            <Icon name="clock" size={12} color={C.ink2} />
            <Text className="text-ink-2" style={{ fontSize: 12.5 }}>{item.time}</Text>
          </View>
          <View className="flex-row items-center gap-1">
            <Icon name="pin" size={12} color={C.ink2} />
            <Text className="text-ink-2" style={{ fontSize: 12.5 }}>{item.where}</Text>
          </View>
        </View>
        <View className="mt-2 flex-row gap-1.5 flex-wrap">
          <Chip label={`${item.planner} planning`} />
          {item.confirmed && <Chip label="Confirmed" variant="green" dot />}
          {item.completed && <Chip label="Completed" variant="green" />}
        </View>
      </View>
    </View>
  );
}
