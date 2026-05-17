import React, { useState } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { C } from '../../../shared/constants/colors';
import { AppBar } from '../../../shared/components/AppBar';
import { Button } from '../../../shared/components/Button';
import { Card } from '../../../shared/components/Card';
import { HeartSpots } from '../../../shared/components/HeartSpots';
import { LeafCorner } from '../../../shared/components/LeafCorner';
import { Icon } from '../../../shared/components/Icon';
import { StepDots } from '../components/StepDots';
import { useOnboardingContext } from '../../../shared/context/OnboardingContext';

interface InviteScreenProps {
  onBack: () => void;
  onNext: () => void;
}

export function InviteScreen({ onBack, onNext }: InviteScreenProps) {
  const { form } = useOnboardingContext();
  const [copied, setCopied] = useState(false);
  const code = 'LT-' + (form.firstName || 'YOU').toUpperCase().slice(0, 3) + '-7K2J';

  const handleCopy = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 1400);
  };

  return (
    <View className="flex-1 bg-cream">
      <AppBar onBack={onBack} title="Invite partner" />
      <ScrollView
        contentContainerStyle={{ padding: 20, paddingTop: 12, paddingBottom: 40 }}
        showsVerticalScrollIndicator={false}
      >
        <StepDots count={7} current={2} />

        <View className="mt-7 gap-1">
          <Text className="text-7xl font-bold text-ink" style={{ letterSpacing: -0.6 }}>
            Bring them in.
          </Text>
          <Text className="text-base-plus leading-base text-ink-2 mt-2.5">
            Share this code or link. They'll complete their own setup — you'll see each other when both sides finish.
          </Text>
        </View>

        <View className="mt-[26px]">
          <Card variant="dark" padding={22}>
            <HeartSpots opacity={0.14} color={C.cream} />
            <LeafCorner position="tr" kind={1} size={94} opacity={0.55} />
            <View className="relative">
              <Text className="text-2xs font-semibold tracking-widest uppercase" style={{ color: 'rgba(255,255,255,0.6)' }}>
                Partner code
              </Text>
              <Text className="text-[36px] font-bold text-cream mt-2" style={{ letterSpacing: 1.4 }}>
                {code}
              </Text>
              <View className="mt-[18px] flex-row gap-2.5">
                <Button label={copied ? 'Copied' : 'Copy code'} onPress={handleCopy} variant="olive" size="sm"
                  leftIcon={<Icon name="copy" size={16} color={C.jungleDeep} />} />
                <Button label="Share link" variant="ghost" size="sm"
                  style={{ backgroundColor: 'rgba(255,255,255,0.14)' }}
                  leftIcon={<Icon name="send" size={16} color="#ffffff" />} />
              </View>
            </View>
          </Card>
        </View>

        <View className="mt-3.5">
          <Card padding={18}>
            <View className="flex-row items-center gap-3.5">
              <View className="w-11 h-11 rounded-lg items-center justify-center" style={{ backgroundColor: 'rgba(74,111,82,0.14)' }}>
                <Icon name="clock" size={20} color={C.jungleMid} />
              </View>
              <View className="flex-1">
                <Text className="font-bold text-ink">Waiting on partner</Text>
                <Text className="text-sm text-ink-2 mt-0.5" style={{ lineHeight: 19 }}>
                  You can finish the rest of setup now — they'll catch up.
                </Text>
              </View>
            </View>
          </Card>
        </View>

        <View className="mt-7 gap-2">
          <Button label="Continue setup" onPress={onNext} fullWidth />
          <Button label="I'll invite them later" onPress={onNext} variant="ghost" fullWidth />
        </View>
      </ScrollView>
    </View>
  );
}
