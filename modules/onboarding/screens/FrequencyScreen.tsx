import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { C } from '../../../shared/constants/colors';
import { AppBar } from '../../../shared/components/AppBar';
import { Button } from '../../../shared/components/Button';
import { StepDots } from '../components/StepDots';
import { FrequencyOption } from '../components/FrequencyOption';
import { useOnboardingContext } from '../../../shared/context/OnboardingContext';

const CHECK_IN_OPTS = [
  { v: 'daily',  label: 'Daily',      sub: 'A tiny ritual.' },
  { v: '3x',     label: '3× a week',  sub: 'A steady rhythm.' },
  { v: 'weekly', label: 'Weekly',     sub: 'A quiet pulse.' },
];

const DATE_OPTS = [
  { v: 'weekly',    label: 'Weekly',     sub: 'Sacred time, weekly.' },
  { v: 'biweekly',  label: 'Bi-weekly',  sub: 'Steady cadence.' },
  { v: 'monthly',   label: 'Monthly',    sub: 'Bigger moments.' },
  { v: 'quarterly', label: 'Quarterly',  sub: 'Seasonal anchors.' },
];

interface FrequencyScreenProps {
  onBack: () => void;
  onNext: () => void;
}

export function FrequencyScreen({ onBack, onNext }: FrequencyScreenProps) {
  const { form, updateForm } = useOnboardingContext();

  return (
    <View className="flex-1 bg-cream">
      <AppBar onBack={onBack} title="Your rhythm" />
      <ScrollView
        contentContainerStyle={{ padding: 20, paddingTop: 12, paddingBottom: 40 }}
        showsVerticalScrollIndicator={false}
      >
        <StepDots count={7} current={5} />

        <View className="mt-[22px] gap-1">
          <Text className="text-7xl font-bold text-ink" style={{ letterSpacing: -0.6 }}>
            How often, and how big?
          </Text>
          <Text className="text-base-plus leading-base text-ink-2 mt-2">
            Set the pulse for check-ins and dates. You can change this any time.
          </Text>
        </View>

        <View className="mt-[22px]">
          <Text className="text-2xs font-semibold tracking-widest uppercase text-jungle-mid mb-2.5">
            Love Level check-ins
          </Text>
          <View className="gap-2.5">
            {CHECK_IN_OPTS.map((o) => (
              <FrequencyOption
                key={o.v}
                label={o.label}
                sub={o.sub}
                active={form.checkIn === o.v}
                onPress={() => updateForm({ checkIn: o.v })}
              />
            ))}
          </View>
        </View>

        <View className="mt-[22px]">
          <Text className="text-2xs font-semibold tracking-widest uppercase text-jungle-mid mb-2.5">
            Date planning
          </Text>
          <View className="gap-2.5">
            {DATE_OPTS.map((o) => (
              <FrequencyOption
                key={o.v}
                label={o.label}
                sub={o.sub}
                active={form.dateFreq === o.v}
                onPress={() => updateForm({ dateFreq: o.v })}
              />
            ))}
          </View>
        </View>

        <View className="mt-[26px]">
          <Button label="Continue" onPress={onNext} fullWidth />
        </View>
      </ScrollView>
    </View>
  );
}
