import React from 'react';
import { useRouter } from 'expo-router';
import { FrequencyScreen } from '../../modules/onboarding/screens/FrequencyScreen';

export default function FrequencyRoute() {
  const router = useRouter();
  return (
    <FrequencyScreen
      onBack={() => router.back()}
      onNext={() => router.push('/onboarding/complete')}
    />
  );
}
