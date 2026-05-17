import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { C } from '../../../shared/constants/colors';
import { AppData } from '../../../shared/types';
import { BadgeTile } from '../components/BadgeTile';
import { RelationshipProgress } from '../components/RelationshipProgress';

const BADGES = [
  { key: 'spark',   name: 'First Spark',        desc: 'You both completed the Love Code quiz.',      emoji: '✨', color: C.gold,        earned: true,  when: '2 days ago' },
  { key: 'date3',   name: 'Date Keepers',        desc: 'Three dates, none cancelled.',                emoji: '📅', color: C.terra,       earned: true,  when: 'last week' },
  { key: 'heart',   name: 'Heart to Heart',      desc: 'Your first relationship meeting.',             emoji: '💬', color: C.jungleMid,  earned: true,  when: '3 weeks ago' },
  { key: 'green',   name: 'Green Zone',          desc: 'Both Love Levels above 70% for 7 days.',       emoji: '🌱', color: C.yellowGreen, earned: false, progress: '5 / 7 days' },
  { key: 'reader',  name: 'Mind Reader',         desc: 'Guess a wish list item correctly.',            emoji: '🎯', color: C.gold,        earned: false, progress: '0 / 1' },
  { key: 'codes',   name: 'Code Breakers',       desc: "Both read each other's full Love Codes.",     emoji: '🔓', color: C.jungleDeep,  earned: false, progress: 'You: ✓  Sam: 4/5' },
  { key: 'words',   name: 'Words Unlocked',      desc: 'Send your first appreciation message.',         emoji: '💌', color: C.terra,       earned: false },
  { key: 'monthly', name: 'Monthly Ritualists',  desc: 'A month of consistent check-ins.',             emoji: '🗓', color: C.amber,       earned: false, progress: '21 / 30 days' },
  { key: 'levelup', name: 'Level Up',            desc: 'Reach a new relationship level together.',     emoji: '✨', color: C.yellowGreen, earned: false, progress: 'Budding → Blooming · 62%' },
];

interface BadgesScreenProps {
  data: AppData;
}

export function BadgesScreen({ data }: BadgesScreenProps) {
  const insets = useSafeAreaInsets();
  const earned = BADGES.filter((b) => b.earned);
  const inProgress = BADGES.filter((b) => !b.earned);

  return (
    <ScrollView
      className="flex-1 bg-cream"
      contentContainerStyle={{ paddingBottom: 130 }}
      showsVerticalScrollIndicator={false}
    >
      <View className="px-4" style={{ paddingTop: insets.top + 14 }}>
        <Text className="text-5xl font-bold text-ink tracking-tight">
          Badges & growth
        </Text>
        <Text className="text-base-plus leading-base text-ink-2 mt-1">
          Earned together — never against each other.
        </Text>
      </View>

      <View className="px-4 pt-3.5">
        <RelationshipProgress level={data.relationshipLevel} />
      </View>

      <View className="px-4 pt-[18px]">
        <Text className="text-2xs font-semibold tracking-widest uppercase text-jungle-mid mb-2">
          Earned · {earned.length}
        </Text>
        <View className="flex-row flex-wrap gap-2.5">
          {earned.map((b) => (
            <View key={b.key} style={{ width: '30%' }}>
              <BadgeTile badge={b} />
            </View>
          ))}
        </View>
      </View>

      <View className="px-4 pt-[18px] gap-2.5">
        <Text className="text-2xs font-semibold tracking-widest uppercase text-jungle-mid mb-0.5">
          In progress · {inProgress.length}
        </Text>
        {inProgress.map((b) => (
          <View
            key={b.key}
            className="rounded-3xl p-3.5 bg-white flex-row gap-3"
            style={{
              shadowColor: C.jungleDeep,
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.05,
              shadowRadius: 8,
              elevation: 1,
            }}
          >
            <View
              className="w-[50px] h-[50px] rounded-lg items-center justify-center flex-shrink-0 opacity-50"
              style={{ backgroundColor: 'rgba(22,56,40,0.06)' }}
            >
              <Text className="text-4xl">{b.emoji}</Text>
            </View>
            <View className="flex-1 min-w-0">
              <Text className="font-bold text-ink" style={{ fontSize: 14.5 }}>{b.name}</Text>
              <Text className="text-ink-2 mt-0.5" style={{ fontSize: 12.5 }}>{b.desc}</Text>
              {b.progress && (
                <Text className="mt-1.5 font-bold" style={{ fontSize: 11.5, color: b.color }}>
                  {b.progress}
                </Text>
              )}
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}
