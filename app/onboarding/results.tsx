import React from 'react';
import { useRouter } from 'expo-router';
import { ResultsScreen } from '../../modules/onboarding/screens/ResultsScreen';

export default function ResultsRoute() {
  const router = useRouter();
  return (
    <ResultsScreen
      onBack={() => router.back()}
      onNext={() => router.push('/onboarding/account')}
    />
  );
}
