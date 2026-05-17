import Animated, { FadeIn } from 'react-native-reanimated';
import { useAppContext } from '../../shared/context/AppContext';
import { DatesScreen } from '../../modules/dates/screens/DatesScreen';

export default function DatesTab() {
  const { data } = useAppContext();
  return (
    <Animated.View entering={FadeIn.duration(280)} style={{ flex: 1 }}>
      <DatesScreen data={data} />
    </Animated.View>
  );
}
