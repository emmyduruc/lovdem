import { useRouter } from 'expo-router';
import { CreateAccountScreen } from '../../modules/onboarding/screens/CreateAccountScreen';

export default function AccountRoute() {
  const router = useRouter();
  return (
    <CreateAccountScreen
      onBack={() => router.back()}
      onNext={() => router.push('/onboarding/otp')}
    />
  );
}
