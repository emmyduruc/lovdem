import React from 'react';
import { View, Text, ScrollView, Pressable } from 'react-native';
import { C } from '../../../shared/constants/colors';
import { AppBar } from '../../../shared/components/AppBar';
import { Input } from '../../../shared/components/Input';
import { Button } from '../../../shared/components/Button';
import { Icon } from '../../../shared/components/Icon';
import { StepDots } from '../components/StepDots';
import { useOnboardingContext } from '../../../shared/context/OnboardingContext';

interface ProfileSetupScreenProps {
  onBack: () => void;
  onNext: () => void;
}

export function ProfileSetupScreen({ onBack, onNext }: ProfileSetupScreenProps) {
  const { form, updateForm } = useOnboardingContext();
  const initial = form.name ? form.name.trim().charAt(0).toUpperCase() : 'J';

  return (
    <View className="flex-1 bg-cream">
      <AppBar onBack={onBack} title="Your profile" />
      <ScrollView
        contentContainerStyle={{ padding: 20, paddingTop: 12, paddingBottom: 40 }}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <StepDots count={7} current={1} />

        <View className="mt-7 gap-1">
          <Text className="text-7xl font-bold text-ink" style={{ letterSpacing: -0.6 }}>
            Show up as you.
          </Text>
          <Text className="text-base-plus leading-base text-ink-2 mt-2.5">
            A name, a face, a birthday. The basics.
          </Text>
        </View>

        <View className="items-center mt-8">
          <View
            className="w-[124px] h-[124px] rounded-full bg-amber items-center justify-center"
            style={{
              shadowColor: C.brownRed,
              shadowOffset: { width: 0, height: 12 },
              shadowOpacity: 0.35,
              shadowRadius: 20,
            }}
          >
            <Text className="text-brown-red font-bold" style={{ fontSize: 38 }}>{initial}</Text>
            <Pressable
              className="absolute bottom-0 right-0 w-[38px] h-[38px] rounded-full bg-jungle-deep items-center justify-center border-[3px] border-cream"
            >
              <Icon name="plus" size={18} color={C.cream} />
            </Pressable>
          </View>
        </View>

        <View className="mt-[26px] gap-3.5">
          <Input
            label="First name"
            value={form.firstName}
            onChangeText={(v) => updateForm({ firstName: v })}
            placeholder="Jordan"
          />
          <Input
            label="Birthday"
            value={form.birthday}
            onChangeText={(v) => updateForm({ birthday: v })}
            placeholder="Apr 12, 1994"
          />
        </View>

        <View className="mt-7">
          <Button label="Continue" onPress={onNext} fullWidth />
        </View>
      </ScrollView>
    </View>
  );
}
