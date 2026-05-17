import Animated, { FadeIn } from 'react-native-reanimated';
import { useAppContext } from '../../shared/context/AppContext';
import { PlayScreen } from '../../modules/play/screens/PlayScreen';

export default function PlayTab() {
  const { data } = useAppContext();
  return (
    <Animated.View entering={FadeIn.duration(280)} style={{ flex: 1 }}>
      <PlayScreen data={data} />
    </Animated.View>
  );
}
