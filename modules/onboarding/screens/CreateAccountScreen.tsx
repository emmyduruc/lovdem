import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { C } from '../../../shared/constants/colors';
import { AppBar } from '../../../shared/components/AppBar';
import { Input } from '../../../shared/components/Input';
import { Button } from '../../../shared/components/Button';
import { Icon } from '../../../shared/components/Icon';
import { StepDots } from '../components/StepDots';
import { useOnboardingContext } from '../../../shared/context/OnboardingContext';

interface CreateAccountScreenProps {
  onBack: () => void;
  onNext: () => void;
}

export function CreateAccountScreen({ onBack, onNext }: CreateAccountScreenProps) {
  const { form, updateForm } = useOnboardingContext();

  return (
    <View className="flex-1 bg-cream">
      <AppBar onBack={onBack} title="Create account" />
      <ScrollView
        contentContainerStyle={{ padding: 20, paddingTop: 12, paddingBottom: 40 }}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <StepDots count={7} current={0} />

        <View className="mt-7 gap-1">
          <Text className="text-7xl font-bold text-ink" style={{ letterSpacing: -0.6 }}>
            A safe space for two.
          </Text>
          <Text className="text-base-plus text-ink-2 mt-2.5" style={{ lineHeight: 14.5 * 1.45 }}>
            LoveTrack works best with both of you. Let's set up your side first.
          </Text>
        </View>

        <View className="mt-[26px] gap-3.5">
          <Input
            label="Full name"
            value={form.name}
            onChangeText={(v) => updateForm({ name: v })}
            placeholder="Jordan Rivers"
          />
          <Input
            label="Email"
            value={form.email}
            onChangeText={(v) => updateForm({ email: v })}
            placeholder="you@hello.com"
            keyboardType="email-address"
            autoCapitalize="none"
          />
          <Input
            label="Password"
            value={form.password}
            onChangeText={(v) => updateForm({ password: v })}
            placeholder="••••••••••"
            secureTextEntry
          />
        </View>

        <View className="mt-7 flex-row gap-2 items-start">
          <View className="w-[22px] h-[22px] rounded-[7px] bg-jungle-deep items-center justify-center flex-shrink-0 mt-px">
            <Icon name="check" size={14} color={C.cream} />
          </View>
          <Text className="text-ink-2 flex-1" style={{ fontSize: 12.5, lineHeight: 18 }}>
            I agree to the <Text className="font-bold text-ink">terms</Text> and{' '}
            <Text className="font-bold text-ink">privacy promise</Text>. My partner's data stays between us.
          </Text>
        </View>

        <View className="mt-7">
          <Button label="Continue" onPress={onNext} fullWidth />
        </View>
      </ScrollView>
    </View>
  );
}
