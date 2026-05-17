import React from 'react';
import { View, Text, ScrollView, Pressable } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { C } from '../../../shared/constants/colors';
import { AppData } from '../../../shared/types';
import { HeartSpots } from '../../../shared/components/HeartSpots';
import { LeafCorner } from '../../../shared/components/LeafCorner';
import { Icon } from '../../../shared/components/Icon';
import { Chip } from '../../../shared/components/Chip';
import { Button } from '../../../shared/components/Button';
import { Card } from '../../../shared/components/Card';

interface PlayScreenProps {
  data: AppData;
}

export function PlayScreen({ data }: PlayScreenProps) {
  const insets = useSafeAreaInsets();

  return (
    <ScrollView
      className="flex-1 bg-cream"
      contentContainerStyle={{ paddingBottom: 130 }}
      showsVerticalScrollIndicator={false}
    >
      <View className="px-4" style={{ paddingTop: insets.top + 14 }}>
        <Text className="text-5xl font-bold text-ink tracking-tight">Play</Text>
        <Text className="text-base-plus leading-base text-ink-2 mt-1">
          Gentle games. Short. Never competitive.
        </Text>
      </View>

      <View className="px-4 pt-3.5 gap-3">
        <Pressable
          style={({ pressed }) => ({
            borderRadius: 26,
            padding: 22,
            backgroundColor: C.terra,
            overflow: 'hidden',
            opacity: pressed ? 0.9 : 1,
          })}
        >
          <HeartSpots opacity={0.10} color="#fff5ef" />
          <LeafCorner position="tr" kind={2} size={110} opacity={0.45} />
          <View className="relative">
            <Text className="text-2xs font-semibold tracking-widest uppercase" style={{ color: 'rgba(255,255,255,0.7)' }}>
              This week's play
            </Text>
            <Text className="text-4xl font-bold mt-1.5" style={{ color: '#fff5ef' }}>
              How well do you know me?
            </Text>
            <Text className="opacity-[0.92] mt-1.5" style={{ fontSize: 13.5, color: '#fff5ef' }}>
              5 questions, answered privately. Match score revealed at the end.
            </Text>
            <View className="mt-3.5">
              <Button label="Play now" variant="olive" size="sm" />
            </View>
          </View>
        </Pressable>

        <Card padding={18}>
          <View className="flex-row gap-3.5">
            <View className="w-14 h-14 rounded-2xl items-center justify-center flex-shrink-0" style={{ backgroundColor: 'rgba(74,111,82,0.16)' }}>
              <Icon name="cards" size={24} color={C.jungleMid} />
            </View>
            <View className="flex-1">
              <Text className="font-bold text-lg text-ink">
                This or That — Date edition
              </Text>
              <Text className="text-sm text-ink-2 mt-0.5">
                Swipe independently. Overlaps become your shortlist.
              </Text>
              <View className="mt-2.5 flex-row gap-1.5">
                <Chip label="12 overlaps" variant="green" dot />
                <Chip label="5 min" />
              </View>
            </View>
          </View>
        </Card>

        <View className="rounded-3xl p-[18px] bg-olive overflow-hidden">
          <View className="flex-row gap-3.5">
            <View className="w-14 h-14 rounded-2xl items-center justify-center flex-shrink-0" style={{ backgroundColor: 'rgba(22,56,40,0.10)' }}>
              <Icon name="msg" size={24} color={C.jungleDeep} />
            </View>
            <View className="flex-1">
              <Text className="font-bold text-lg text-jungle-deep">
                Appreciation Drop
              </Text>
              <Text className="text-sm text-ink-2 mt-0.5">
                Tied to {data.partner.firstName}'s primary Love Code · Warmth.
              </Text>
              <View className="mt-2.5">
                <Button label="Send this week's drop" size="sm" />
              </View>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}
