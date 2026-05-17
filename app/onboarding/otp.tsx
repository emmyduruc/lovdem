import { useRouter } from 'expo-router';
import { OtpScreen } from '../../modules/onboarding/screens/OtpScreen';

export default function OtpRoute() {
  const router = useRouter();
  return (
    <OtpScreen
      onBack={() => router.back()}
      onNext={() => router.push('/onboarding/profile')}
    />
  );
}
