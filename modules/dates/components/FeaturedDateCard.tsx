import React from 'react';
import { View, Text } from 'react-native';
import { HeartSpots } from '../../../shared/components/HeartSpots';
import { LeafCorner } from '../../../shared/components/LeafCorner';
import { Icon } from '../../../shared/components/Icon';
import { Button } from '../../../shared/components/Button';
import { AppData } from '../../../shared/types';

interface FeaturedDateCardProps {
  data: AppData;
}

export function FeaturedDateCard({ data }: FeaturedDateCardProps) {
  return (
    <View className="rounded-3xl p-[22px] bg-terra overflow-hidden relative">
      <HeartSpots opacity={0.10} color="#fff5ef" />
      <LeafCorner position="tr" kind={2} size={120} opacity={0.5} />
      <View className="relative">
        <Text className="text-2xs font-semibold tracking-widest uppercase" style={{ color: 'rgba(255,255,255,0.7)' }}>
          Wed · 19:30 · in 4 days
        </Text>
        <View className="flex-row items-start gap-3 mt-1.5">
          <Icon name="lock" size={22} color="#fff5ef" />
          <View className="flex-1">
            <Text className="text-5xl font-bold tracking-tight" style={{ color: '#fff5ef' }}>
              A small mystery
            </Text>
            <Text className="opacity-90 mt-1 text-ink-2" style={{ fontSize: 13.5, lineHeight: 20, color: '#fff5ef' }}>
              {data.partner.firstName} chose privacy mode for this one. You'll see the details on the night, after they tap reveal.
            </Text>
          </View>
        </View>
        <View className="mt-4 flex-row gap-2.5">
          <Button label="Confirm I'm in" variant="olive" size="sm" />
          <Button label="Suggest a swap" size="sm" style={{ backgroundColor: 'rgba(255,255,255,0.16)' }} />
        </View>
      </View>
    </View>
  );
}
