import React from 'react';
import { useRouter } from 'expo-router';
import { useAppContext } from '../../shared/context/AppContext';
import { ProfileScreen } from '../../modules/profile/screens/ProfileScreen';
import { setOnboardingComplete } from '../../shared/storage/onboardingStorage';

export default function MeTab() {
  const { data } = useAppContext();
  const router = useRouter();

  const handleSignOut = async () => {
    await setOnboardingComplete(false);
    router.replace('/onboarding/splash');
  };

  return <ProfileScreen data={data} onSignOut={handleSignOut} />;
}
