import React from 'react';
import { Stack } from 'expo-router';
import { OnboardingProvider } from '../../shared/context/OnboardingContext';

export default function OnboardingLayout() {
  return (
    <OnboardingProvider>
      <Stack screenOptions={{ headerShown: false, animation: 'slide_from_right' }} />
    </OnboardingProvider>
  );
}
