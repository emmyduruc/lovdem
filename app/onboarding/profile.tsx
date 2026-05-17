import React from 'react';
import { useRouter } from 'expo-router';
import { ProfileSetupScreen } from '../../modules/onboarding/screens/ProfileSetupScreen';

export default function ProfileRoute() {
  const router = useRouter();
  return (
    <ProfileSetupScreen
      onBack={() => router.back()}
      onNext={() => router.push('/onboarding/invite')}
    />
  );
}
