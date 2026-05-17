import { useEffect } from 'react';
import { useRouter, useLocalSearchParams } from 'expo-router';
import Animated, { FadeIn } from 'react-native-reanimated';
import { useAppContext } from '../../shared/context/AppContext';
import { HomeScreen } from '../../modules/home/screens/HomeScreen';
import { CodeInfoDrawer } from '../../modules/codes/screens/CodeInfoDrawer';

export default function HomeTab() {
  const { data, setOverlay, overlay } = useAppContext();
  const router = useRouter();
  const params = useLocalSearchParams<{ showResults?: string }>();

  // Show love codes results modal once when coming from onboarding completion
  useEffect(() => {
    if (params.showResults === '1') {
      setOverlay('results');
    }
  }, []);

  const codeKey = overlay?.startsWith('codeInfo:') ? overlay.split(':')[1] : null;

  return (
    <Animated.View entering={FadeIn.duration(280)} style={{ flex: 1 }}>
      <HomeScreen
        data={data}
        setOverlay={setOverlay}
        onOpenCode={() => router.push('/(tabs)/codes')}
        onOpenDates={() => router.push('/(tabs)/dates')}
      />
      <CodeInfoDrawer codeKey={codeKey} onClose={() => setOverlay(null)} />
    </Animated.View>
  );
}
