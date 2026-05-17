import React from 'react';
import { View, ScrollView } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { C } from '../../../shared/constants/colors';
import { AppData } from '../../../shared/types';
import { Card } from '../../../shared/components/Card';
import { HeartSpots } from '../../../shared/components/HeartSpots';
import { LeafCorner } from '../../../shared/components/LeafCorner';
import { Avatar } from '../../../shared/components/Avatar';
import { Button } from '../../../shared/components/Button';
import { AppText } from '../../../shared/components/AppText';
import { SettingsRow } from '../components/SettingsRow';

interface ProfileScreenProps {
  data: AppData;
  onSignOut: () => void;
}

function SettingsSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <View className="mt-5">
      <View className="mb-2 ml-1">
        <AppText variant="eyebrow">{title}</AppText>
      </View>
      <Card padding={0} style={{ overflow: 'hidden' }}>
        {children}
      </Card>
    </View>
  );
}

export function ProfileScreen({ data, onSignOut }: ProfileScreenProps) {
  const insets = useSafeAreaInsets();
  const freqLabel = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

  return (
    <ScrollView
      className="flex-1 bg-cream"
      contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 130 }}
      showsVerticalScrollIndicator={false}
    >
      <View style={{ paddingTop: insets.top + 12 }} className="mb-1">
        <Card variant="dark" padding={20}>
          <HeartSpots opacity={0.13} color={C.cream} />
          <LeafCorner position="tr" kind={1} size={100} opacity={0.5} />
          <View className="relative flex-row items-center gap-3.5 z-10">
            <Avatar initial={data.me.firstName.charAt(0)} size="lg" />
            <View className="flex-1 min-w-0">
              <AppText variant="subtitle" color={C.cream} style={{ fontSize: 22, letterSpacing: -0.4 }}>
                {data.me.firstName} Rivers
              </AppText>
              <AppText variant="caption" color="rgba(252, 253, 222, 0.78)" style={{ marginTop: 2 }}>
                Connected with {data.partner.firstName} · 14 months
              </AppText>
            </View>
            <Button label="Edit" variant="olive" size="sm" />
          </View>
        </Card>
      </View>

      <SettingsSection title="Rhythm">
        <SettingsRow iconName="bell" title="Check-in frequency" value={freqLabel(data.checkIn)} />
        <SettingsRow iconName="cal" title="Date frequency" value={freqLabel(data.dateFreq)} />
        <SettingsRow iconName="eyeoff" title="Date privacy default" value="On" last />
      </SettingsSection>

      <SettingsSection title="Notifications">
        <SettingsRow iconName="heart" title="Partner updated their level" toggle />
        <SettingsRow iconName="clock" title="Date reminders" toggle />
        <SettingsRow iconName="msg" title="Weekly meeting nudge" toggle />
        <SettingsRow iconName="flame" title="Low-level Leo nudge" toggle last />
      </SettingsSection>

      <SettingsSection title="Partner">
        <SettingsRow iconName="user" title="Manage partner connection" onPress={() => {}} />
        <SettingsRow iconName="lock" title="Privacy & data" onPress={() => {}} />
        <SettingsRow iconName="logout" title="Sign out" onPress={onSignOut} danger last />
      </SettingsSection>

      <View className="h-[100px] items-center justify-end pb-6">
        <AppText variant="caption">Love · Grow · Track</AppText>
      </View>
    </ScrollView>
  );
}
