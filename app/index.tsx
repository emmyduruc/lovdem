import React from 'react';
import { Redirect } from 'expo-router';
import { useOnboardingGate } from '../shared/hooks/useOnboardingGate';

export default function Index() {
  const { isReady, isComplete } = useOnboardingGate();

  if (!isReady) return null;

  if (isComplete) {
    return <Redirect href="/(tabs)/home" />;
  }

  return <Redirect href="/onboarding/splash" />;
}
