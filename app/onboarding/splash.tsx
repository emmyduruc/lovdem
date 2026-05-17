import React, { useEffect, useRef } from 'react';
import { useRouter } from 'expo-router';
import { SplashScreen } from '../../modules/onboarding/screens/SplashScreen';

const SPLASH_AUTO_ADVANCE_MS = 1800;

export default function SplashRoute() {
  const router = useRouter();
  const hasNavigated = useRef(false);

  const goToOnboarding = () => {
    if (hasNavigated.current) return;
    hasNavigated.current = true;
    router.replace('/onboarding/quiz');
  };

  useEffect(() => {
    const timer = setTimeout(goToOnboarding, SPLASH_AUTO_ADVANCE_MS);
    return () => clearTimeout(timer);
  }, []);

  return <SplashScreen onContinue={goToOnboarding} />;
}
