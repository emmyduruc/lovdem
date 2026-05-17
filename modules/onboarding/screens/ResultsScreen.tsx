import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { C } from '../../../shared/constants/colors';
import { codeByKey } from '../../../shared/constants/loveCodes';
import { LoveCodeKey } from '../../../shared/constants/loveCodes';
import { AppBar } from '../../../shared/components/AppBar';
import { Button } from '../../../shared/components/Button';
import { Leo } from '../../../shared/components/Leo';
import { StepDots } from '../components/StepDots';
import { useOnboardingContext } from '../../../shared/context/OnboardingContext';

interface ResultsScreenProps {
  onBack: () => void;
  onNext: () => void;
}

export function ResultsScreen({ onBack, onNext }: ResultsScreenProps) {
  const { form } = useOnboardingContext();
  const ranking: LoveCodeKey[] = form.codeRanking || ['warmth', 'presence', 'words', 'actions', 'gestures'];

  return (
    <View className="flex-1 bg-cream">
      <AppBar onBack={onBack} title="Your Love Codes" />
      <ScrollView
        contentContainerStyle={{ padding: 20, paddingTop: 12, paddingBottom: 40 }}
        showsVerticalScrollIndicator={false}
      >
        <StepDots count={7} current={4} />

        <View className="mt-[22px] items-center gap-1.5">
          <Leo size={84} />
          <Text className="text-7xl font-bold text-ink mt-2.5 text-center" style={{ letterSpacing: -0.6 }}>
            Here's how you love.
          </Text>
          <Text className="text-base-plus leading-base text-ink-2 text-center mt-1">
            Ranked from primary to fifth. You can tweak the meanings later.
          </Text>
        </View>

        <View className="mt-[22px] gap-2.5">
          {ranking.map((k, i) => {
            const code = codeByKey(k);
            const isPrimary = i === 0;
            return (
              <View
                key={k}
                className="rounded-3xl p-[18px] flex-row items-center gap-4"
                style={{
                  backgroundColor: isPrimary ? code.color : '#ffffff',
                  shadowColor: isPrimary ? code.color : C.jungleDeep,
                  shadowOffset: { width: 0, height: isPrimary ? 14 : 4 },
                  shadowOpacity: isPrimary ? 0.4 : 0.06,
                  shadowRadius: isPrimary ? 20 : 12,
                  elevation: isPrimary ? 6 : 2,
                }}
              >
                <View
                  className="w-10 h-10 rounded-lg items-center justify-center"
                  style={{
                    backgroundColor: isPrimary ? 'rgba(255,255,255,0.18)' : code.color + '1F',
                  }}
                >
                  <Text className="font-extrabold text-lg" style={{ color: isPrimary ? code.ink : code.color }}>
                    {i + 1}
                  </Text>
                </View>
                <View className="flex-1 min-w-0">
                  <View className="flex-row items-baseline gap-2">
                    <Text className="font-bold" style={{ fontSize: 17, color: isPrimary ? code.ink : C.ink }}>
                      {code.name}
                    </Text>
                    <Text className="opacity-70 font-semibold" style={{ fontSize: 11.5, color: isPrimary ? code.ink : C.ink }}>
                      {code.full}
                    </Text>
                  </View>
                  <Text
                    className="mt-1 text-sm"
                    style={{ lineHeight: 19, opacity: isPrimary ? 0.92 : 0.7, color: isPrimary ? code.ink : C.ink }}
                  >
                    {code.blurb}
                  </Text>
                </View>
              </View>
            );
          })}
        </View>

        <View className="mt-6">
          <Button label="Continue" onPress={onNext} fullWidth />
        </View>
      </ScrollView>
    </View>
  );
}
