import React, { useState } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { C } from '../../../shared/constants/colors';
import { AppData } from '../../../shared/types';
import { Card } from '../../../shared/components/Card';
import { HeartSpots } from '../../../shared/components/HeartSpots';
import { LeafCorner } from '../../../shared/components/LeafCorner';
import { Button } from '../../../shared/components/Button';
import { Icon } from '../../../shared/components/Icon';
import { Chip } from '../../../shared/components/Chip';
import { Input } from '../../../shared/components/Input';

const PROMPTS = [
  { q: 'How did I make you feel this week?', tag: 'feelings' },
  { q: 'What did I do well?', tag: 'praise' },
  { q: 'What could I improve — without judgment?', tag: 'growth' },
  { q: "What's one small thing I can do next week that would mean a lot?", tag: 'next' },
];

interface MeetingsScreenProps {
  data: AppData;
}

export function MeetingsScreen({ data }: MeetingsScreenProps) {
  const [confirmed, setConfirmed] = useState(false);
  const insets = useSafeAreaInsets();

  return (
    <ScrollView
      className="flex-1 bg-cream"
      contentContainerStyle={{ paddingBottom: 130 }}
      showsVerticalScrollIndicator={false}
    >
      <View className="px-4" style={{ paddingTop: insets.top + 14 }}>
        <Text className="text-5xl font-bold text-ink tracking-tight">Meetings</Text>
        <Text className="text-base-plus leading-base text-ink-2 mt-1">
          A short, weekly check-in. No surprise topics.
        </Text>
      </View>

      <View className="px-4 pt-3.5">
        <Card variant="dark" padding={22}>
          <HeartSpots opacity={0.12} color={C.cream} />
          <LeafCorner position="tr" kind={1} size={110} opacity={0.5} />
          <View className="relative">
            <Text className="text-2xs font-semibold tracking-widest uppercase" style={{ color: 'rgba(255,255,255,0.6)' }}>
              Sunday · 10:30 · over coffee
            </Text>
            <Text className="text-3xl font-bold mt-1.5 text-cream">
              This week's meeting
            </Text>
            <Text className="opacity-[0.78] mt-1.5 text-cream" style={{ fontSize: 13.5, lineHeight: 20 }}>
              30 min · 4 rotating prompts · private notes per partner.
            </Text>
            <View className="mt-3.5 flex-row gap-2.5">
              <Button
                label={confirmed ? 'It happened' : 'Mark as done'}
                variant="olive"
                size="sm"
                onPress={() => setConfirmed(true)}
                leftIcon={<Icon name="check" size={14} color={C.jungleDeep} />}
              />
              <Button label="Reschedule" size="sm" style={{ backgroundColor: 'rgba(255,255,255,0.14)' }} />
            </View>
          </View>
        </Card>
      </View>

      <View className="px-4 pt-3.5">
        <Text className="text-2xs font-semibold tracking-widest uppercase text-jungle-mid mb-2">
          Prompts for Sunday
        </Text>
        <View className="gap-2">
          {PROMPTS.map((p, i) => (
            <Card key={i} padding={16}>
              <View className="flex-row items-center gap-3">
                <View className="w-7 h-7 rounded-lg items-center justify-center" style={{ backgroundColor: 'rgba(74,111,82,0.14)' }}>
                  <Text className="font-bold text-xs text-jungle-mid">{i + 1}</Text>
                </View>
                <Text className="flex-1 font-semibold text-ink" style={{ fontSize: 14.5 }}>{p.q}</Text>
                <Chip label={p.tag} style={{ height: 22, paddingHorizontal: 8 }} />
              </View>
            </Card>
          ))}
        </View>
      </View>

      <View className="px-4 pt-3.5">
        <Text className="text-2xs font-semibold tracking-widest uppercase text-jungle-mid mb-2">
          Your private notes
        </Text>
        <Card padding={12}>
          <Input
            multiline
            numberOfLines={5}
            placeholder="Just for you — what's sitting with you this week?"
            style={{ borderWidth: 0, fontSize: 14, padding: 8 }}
          />
          <View className="flex-row items-center justify-between px-2 pb-1">
            <View className="flex-row items-center gap-1.5">
              <Icon name="lock" size={12} color={C.ink2} />
              <Text className="text-2xs text-ink-2">Private to you</Text>
            </View>
            <Text className="text-2xs text-ink-2">Auto-saving</Text>
          </View>
        </Card>
      </View>
    </ScrollView>
  );
}
