import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { C } from '../../../shared/constants/colors';
import { AppData } from '../../../shared/types';
import { Card } from '../../../shared/components/Card';
import { HeartSpots } from '../../../shared/components/HeartSpots';
import { LeafCorner } from '../../../shared/components/LeafCorner';
import { Avatar } from '../../../shared/components/Avatar';
import { Button } from '../../../shared/components/Button';
import { Icon } from '../../../shared/components/Icon';
import { SettingsRow } from '../components/SettingsRow';

interface ProfileScreenProps {
  data: AppData;
  onSignOut: () => void;
}

export function ProfileScreen({ data, onSignOut }: ProfileScreenProps) {
  const insets = useSafeAreaInsets();
  const freqLabel = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

  return (
    <ScrollView
      className="flex-1 bg-cream"
      contentContainerStyle={{ paddingBottom: 130 }}
      showsVerticalScrollIndicator={false}
    >
      <View className="px-4" style={{ paddingTop: insets.top + 14 }}>
        <Card variant="dark" padding={22}>
          <HeartSpots opacity={0.13} color={C.cream} />
          <LeafCorner position="tr" kind={1} size={100} opacity={0.5} />
          <View className="relative flex-row items-center gap-3.5">
            <Avatar initial={data.me.firstName.charAt(0)} size="lg" />
            <View className="flex-1">
              <Text className="text-2xl font-bold text-cream">
                {data.me.firstName} Rivers
              </Text>
              <Text className="opacity-75 text-cream mt-0.5" style={{ fontSize: 12.5 }}>
                Connected with {data.partner.firstName} · 14 months
              </Text>
            </View>
            <Button label="Edit" variant="olive" size="sm" />
          </View>
        </Card>
      </View>

      <View className="px-4 pt-3.5">
        <Text className="text-2xs font-semibold tracking-widest uppercase text-jungle-mid mb-2">
          Rhythm
        </Text>
        <Card padding={4}>
          <SettingsRow icon={<Icon name="bell" size={18} color={C.jungleDeep} />} title="Check-in frequency" value={freqLabel(data.checkIn)} />
          <SettingsRow icon={<Icon name="cal" size={18} color={C.jungleDeep} />} title="Date frequency" value={freqLabel(data.dateFreq)} />
          <SettingsRow icon={<Icon name="eyeoff" size={18} color={C.jungleDeep} />} title="Date privacy default" value="On" last />
        </Card>
      </View>

      <View className="px-4 pt-3.5">
        <Text className="text-2xs font-semibold tracking-widest uppercase text-jungle-mid mb-2">
          Notifications
        </Text>
        <Card padding={4}>
          <SettingsRow icon={<Icon name="heart" size={18} color={C.jungleDeep} />} title="Partner updated their level" toggle />
          <SettingsRow icon={<Icon name="clock" size={18} color={C.jungleDeep} />} title="Date reminders" toggle />
          <SettingsRow icon={<Icon name="msg" size={18} color={C.jungleDeep} />} title="Weekly meeting nudge" toggle />
          <SettingsRow icon={<Icon name="flame" size={18} color={C.jungleDeep} />} title="Low-level Leo nudge" toggle last />
        </Card>
      </View>

      <View className="px-4 pt-3.5">
        <Text className="text-2xs font-semibold tracking-widest uppercase text-jungle-mid mb-2">
          Partner
        </Text>
        <Card padding={4}>
          <SettingsRow icon={<Icon name="user" size={18} color={C.jungleDeep} />} title="Manage partner connection" onPress={() => {}} />
          <SettingsRow icon={<Icon name="lock" size={18} color={C.jungleDeep} />} title="Privacy & data" onPress={() => {}} />
          <SettingsRow icon={<Icon name="logout" size={18} color={C.terra} />} title="Sign out" onPress={onSignOut} danger last />
        </Card>
      </View>

      <View className="h-[130px] items-center justify-end pb-6">
        <Text className="text-ink-2 text-xs">Love · Grow · Track</Text>
      </View>
    </ScrollView>
  );
}
