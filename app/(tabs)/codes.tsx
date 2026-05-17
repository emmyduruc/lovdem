import Animated, { FadeIn } from 'react-native-reanimated';
import { useAppContext } from '../../shared/context/AppContext';
import { CodesScreen } from '../../modules/codes/screens/CodesScreen';
import { CodeInfoDrawer } from '../../modules/codes/screens/CodeInfoDrawer';

export default function CodesTab() {
  const { data, overlay, setOverlay } = useAppContext();
  const codeKey = overlay?.startsWith('codeInfo:') ? overlay.split(':')[1] : null;

  return (
    <Animated.View entering={FadeIn.duration(280)} style={{ flex: 1 }}>
      <CodesScreen data={data} onInfo={(key) => setOverlay(`codeInfo:${key}`)} />
      <CodeInfoDrawer codeKey={codeKey} onClose={() => setOverlay(null)} />
    </Animated.View>
  );
}
