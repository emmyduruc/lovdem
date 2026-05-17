import React, { useState } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { C } from '../../../shared/constants/colors';
import { AppData } from '../../../shared/types';
import { Button } from '../../../shared/components/Button';
import { Icon } from '../../../shared/components/Icon';
import { SegmentedControl } from '../../../shared/components/SegmentedControl';
import { FeaturedDateCard } from '../components/FeaturedDateCard';
import { DateListItem } from '../components/DateListItem';

const UPCOMING = [
  { title: 'A small mystery', month: 'MAY', day: '20', time: '19:30', where: 'Hidden', planner: 'Sam', confirmed: false, bg: 'rgba(231,88,56,0.15)', fg: C.terra },
  { title: 'Sunset hike at Linden Ridge', month: 'MAY', day: '31', time: '17:00', where: 'Linden Ridge trail', planner: 'Jordan', confirmed: true, bg: 'rgba(74,111,82,0.16)', fg: C.jungleMid },
  { title: 'Pottery night', month: 'JUN', day: '08', time: '19:00', where: 'Studio K', planner: 'Sam', confirmed: false, bg: 'rgba(194,141,29,0.16)', fg: C.gold },
];

const PAST = [
  { title: 'Ramen + bookstore', month: 'MAY', day: '02', time: '19:00', where: 'Mejiro st.', planner: 'Sam', completed: true, bg: 'rgba(22,56,40,0.10)', fg: C.jungleDeep },
  { title: 'Sunday slow morning', month: 'APR', day: '21', time: '10:00', where: 'Home', planner: 'Jordan', completed: true, bg: 'rgba(206,208,95,0.30)', fg: C.jungleDeep },
];

interface DatesScreenProps {
  data: AppData;
}

export function DatesScreen({ data }: DatesScreenProps) {
  const [view, setView] = useState('upcoming');
  const insets = useSafeAreaInsets();
  const dateFreqLabel = data.dateFreq.charAt(0).toUpperCase() + data.dateFreq.slice(1);

  return (
    <ScrollView
      className="flex-1 bg-cream"
      contentContainerStyle={{ paddingBottom: 130 }}
      showsVerticalScrollIndicator={false}
    >
      <View className="px-4" style={{ paddingTop: insets.top + 14 }}>
        <View className="flex-row items-end justify-between">
          <View>
            <Text className="text-5xl font-bold text-ink tracking-tight">Dates</Text>
            <Text className="text-base-plus leading-base text-ink-2 mt-1">
              {dateFreqLabel} cadence · Sam plans this one
            </Text>
          </View>
          <Button label="Plan" variant="olive" size="sm" leftIcon={<Icon name="plus" size={16} color={C.jungleDeep} />} />
        </View>
      </View>

      <View className="px-4 pt-3.5">
        <FeaturedDateCard data={data} />
      </View>

      <View className="px-4 pt-3.5">
        <SegmentedControl
          segments={[{ key: 'upcoming', label: 'Upcoming' }, { key: 'past', label: 'Past' }]}
          active={view}
          onChange={setView}
        />
      </View>

      <View className="px-4 pt-3.5 gap-2.5">
        {(view === 'upcoming' ? UPCOMING : PAST).map((d) => (
          <DateListItem key={d.title} item={d} />
        ))}
      </View>
    </ScrollView>
  );
}
