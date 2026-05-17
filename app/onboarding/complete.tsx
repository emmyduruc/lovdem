import { useRouter } from 'expo-router';
import { CompleteScreen } from '../../modules/onboarding/screens/CompleteScreen';
import { setOnboardingComplete } from '../../shared/storage/onboardingStorage';

export default function CompleteRoute() {
  const router = useRouter();

  const handleEnter = async () => {
    await setOnboardingComplete(true);
    router.replace({ pathname: '/(tabs)/home', params: { showResults: '1' } });
  };

  return <CompleteScreen onEnter={handleEnter} />;
}
