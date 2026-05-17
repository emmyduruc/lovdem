import React from 'react';
import { View, Text } from 'react-native';
import { C } from '../../../shared/constants/colors';
import { Chip } from '../../../shared/components/Chip';
import { Button } from '../../../shared/components/Button';

interface WishItemData {
  title: string;
  desc: string;
  price: string;
  emoji: string;
  bg: string;
  fg: string;
  claimed?: boolean;
  linked?: boolean;
}

interface WishItemProps {
  item: WishItemData;
  viewingPartner: boolean;
}

export function WishItem({ item, viewingPartner }: WishItemProps) {
  const hideClaimed = item.claimed && !viewingPartner;

  return (
    <View
      className="rounded-3xl p-3.5 bg-white flex-row gap-3"
      style={{
        opacity: hideClaimed ? 0 : 1,
        shadowColor: C.jungleDeep,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.06,
        shadowRadius: 10,
        elevation: 2,
      }}
    >
      <View
        className="w-[52px] h-[52px] rounded-lg items-center justify-center flex-shrink-0"
        style={{ backgroundColor: item.bg }}
      >
        <Text className="text-4xl">{item.emoji}</Text>
      </View>
      <View className="flex-1 min-w-0">
        <Text className="font-bold text-md text-ink">{item.title}</Text>
        <Text className="text-ink-2 mt-0.5" style={{ fontSize: 12.5 }}>{item.desc}</Text>
        <View className="mt-2 flex-row gap-1.5 flex-wrap">
          <Chip label={item.price} />
          {item.claimed && viewingPartner && <Chip label="Claimed by you" variant="terra" dot />}
          {item.linked && <Chip label="link" />}
        </View>
      </View>
      {viewingPartner && !item.claimed && (
        <View className="justify-center">
          <Button label="Claim" variant="outline" size="sm" />
        </View>
      )}
    </View>
  );
}
