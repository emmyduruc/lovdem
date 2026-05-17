import { useRouter } from 'expo-router';
import { QuizScreen } from '../../modules/onboarding/screens/QuizScreen';

export default function QuizRoute() {
  const router = useRouter();
  return (
    <QuizScreen
      onBack={() => router.back()}
      onNext={() => router.push('/onboarding/account')}
    />
  );
}
