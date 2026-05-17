import { useEffect } from 'react';
import { View } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from 'react-native-reanimated';
import { C } from '../../../shared/constants/colors';

interface StepDotsProps {
  count: number;
  current: number;
}

function Dot({ active, past }: { active: boolean; past: boolean }) {
  const width = useSharedValue(active ? 22 : 6);

  useEffect(() => {
    width.value = withSpring(active ? 22 : 6, { damping: 16, stiffness: 200 });
  }, [active]);

  const animStyle = useAnimatedStyle(() => ({ width: width.value }));

  return (
    <Animated.View
      style={[
        {
          height: 6,
          borderRadius: 3,
          backgroundColor: active || past ? C.jungleDeep : 'rgba(22,56,40,0.18)',
        },
        animStyle,
      ]}
    />
  );
}

export function StepDots({ count, current }: StepDotsProps) {
  return (
    <View style={{ flexDirection: 'row', gap: 6, justifyContent: 'center' }}>
      {Array.from({ length: count }).map((_, i) => (
        <Dot key={i} active={i === current} past={i < current} />
      ))}
    </View>
  );
}
