import { useEffect, useState } from 'react';
import { getOnboardingComplete } from '../storage/onboardingStorage';

export function useOnboardingGate() {
  const [isReady, setIsReady] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    let mounted = true;
    getOnboardingComplete().then((complete) => {
      if (mounted) {
        setIsComplete(complete);
        setIsReady(true);
      }
    });
    return () => {
      mounted = false;
    };
  }, []);

  return { isReady, isComplete };
}
