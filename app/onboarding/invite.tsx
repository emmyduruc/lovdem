import React from 'react';
import { useRouter } from 'expo-router';
import { InviteScreen } from '../../modules/onboarding/screens/InviteScreen';

export default function InviteRoute() {
  const router = useRouter();
  return (
    <InviteScreen
      onBack={() => router.back()}
      onNext={() => router.push('/onboarding/frequency')}
    />
  );
}
