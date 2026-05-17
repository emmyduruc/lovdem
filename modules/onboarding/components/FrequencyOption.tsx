import { useEffect } from 'react';
import { Pressable, View, Text } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  interpolateColor,
} from 'react-native-reanimated';
import { C } from '../../../shared/constants/colors';
import { Icon } from '../../../shared/components/Icon';

interface FrequencyOptionProps {
  label: string;
  sub: string;
  active: boolean;
  onPress: () => void;
}

export function FrequencyOption({ label, sub, active, onPress }: FrequencyOptionProps) {
  const progress = useSharedValue(active ? 1 : 0);
  const scale = useSharedValue(1);

  useEffect(() => {
    progress.value = withSpring(active ? 1 : 0, { damping: 18, stiffness: 240 });
  }, [active]);

  const containerStyle = useAnimatedStyle(() => ({
    backgroundColor: interpolateColor(progress.value, [0, 1], ['#ffffff', C.jungleDeep]),
    borderColor: interpolateColor(
      progress.value,
      [0, 1],
      ['rgba(22,56,40,0.22)', 'rgba(22,56,40,0)'],
    ),
    transform: [{ scale: scale.value }],
  }));

  const radioStyle = useAnimatedStyle(() => ({
    backgroundColor: interpolateColor(
      progress.value,
      [0, 1],
      ['rgba(22,56,40,0)', C.yellowGreen],
    ),
    borderColor: interpolateColor(
      progress.value,
      [0, 1],
      ['rgba(22,56,40,0.25)', C.yellowGreen],
    ),
  }));

  const checkOpacity = useAnimatedStyle(() => ({
    opacity: progress.value,
  }));

  return (
    <Pressable
      onPress={onPress}
      onPressIn={() => { scale.value = withSpring(0.974, { damping: 15, stiffness: 300 }); }}
      onPressOut={() => { scale.value = withSpring(1, { damping: 15, stiffness: 300 }); }}
    >
      <Animated.View
        style={[
          {
            padding: 14,
            paddingHorizontal: 16,
            borderRadius: 18,
            borderWidth: 1.5,
            flexDirection: 'row',
            alignItems: 'center',
            gap: 12,
          },
          containerStyle,
        ]}
      >
        <Animated.View
          style={[
            {
              width: 22,
              height: 22,
              borderRadius: 11,
              alignItems: 'center',
              justifyContent: 'center',
              borderWidth: 2,
            },
            radioStyle,
          ]}
        >
          <Animated.View style={checkOpacity}>
            <Icon name="check" size={13} color={C.jungleDeep} stroke={2.6} />
          </Animated.View>
        </Animated.View>

        <View style={{ flex: 1 }}>
          <Text
            style={{
              fontWeight: '700',
              fontSize: 15,
              color: active ? C.cream : C.ink,
            }}
          >
            {label}
          </Text>
          <Text
            style={{
              fontSize: 12.5,
              marginTop: 2,
              color: active ? C.cream : C.ink,
              opacity: 0.7,
            }}
          >
            {sub}
          </Text>
        </View>
      </Animated.View>
    </Pressable>
  );
}
