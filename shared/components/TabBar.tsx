import { useEffect } from 'react';
import { Pressable, Text, View } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { C } from '../constants/colors';
import { Icon } from './Icon';

const TAB_ITEMS = [
  { name: 'home',  label: 'Home',    icon: 'home' },
  { name: 'codes', label: 'Codes',   icon: 'heart' },
  { name: 'dates', label: 'Dates',   icon: 'cal' },
  { name: 'play',  label: 'Play',    icon: 'sparkles' },
  { name: 'me',    label: 'Profile', icon: 'user' },
];

interface TabItemProps {
  route: { key: string; name: string };
  isActive: boolean;
  navigation: BottomTabBarProps['navigation'];
}

function TabItem({ route, isActive, navigation }: TabItemProps) {
  const tab = TAB_ITEMS.find((t) => t.name === route.name);

  const scale = useSharedValue(1);
  const activeProgress = useSharedValue(isActive ? 1 : 0);

  useEffect(() => {
    activeProgress.value = withSpring(isActive ? 1 : 0, { damping: 18, stiffness: 220 });
  }, [isActive]);

  // Bounce the whole tab item on press
  const itemStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  // Pill bg fades in/out with active state
  const pillStyle = useAnimatedStyle(() => ({
    opacity: activeProgress.value,
  }));

  // Active icon fades in; inactive fades out
  const activeIconStyle = useAnimatedStyle(() => ({ opacity: activeProgress.value }));
  const inactiveIconStyle = useAnimatedStyle(() => ({ opacity: 1 - activeProgress.value }));

  // Label fades between cream (active) and dimmed white (inactive)
  const labelStyle = useAnimatedStyle(() => ({
    opacity: 0.55 + activeProgress.value * 0.45,
  }));

  const onPress = () => {
    scale.value = withSpring(0.8, { damping: 10, stiffness: 420 }, () => {
      scale.value = withSpring(1, { damping: 11, stiffness: 200 });
    });
    const event = navigation.emit({ type: 'tabPress', target: route.key, canPreventDefault: true });
    if (!isActive && !event.defaultPrevented) {
      navigation.navigate(route.name);
    }
  };

  return (
    <Pressable onPress={onPress} className="flex-1 items-center py-2 gap-1">
      <Animated.View style={itemStyle} className="items-center gap-1">
        {/* Icon pill */}
        <View className="w-[38px] h-7 rounded-xl items-center justify-center">
          {/* Pill background — animates in when active */}
          <Animated.View
            style={[pillStyle, { backgroundColor: `${C.yellowGreen}2E` }]}
            className="absolute inset-0 rounded-xl"
          />
          {/* Inactive icon */}
          <Animated.View style={[inactiveIconStyle, { position: 'absolute' }]}>
            <Icon name={tab?.icon ?? 'home'} size={20} color={`${C.white}8C`} />
          </Animated.View>
          {/* Active icon */}
          <Animated.View style={activeIconStyle}>
            <Icon name={tab?.icon ?? 'home'} size={20} color={C.cream} />
          </Animated.View>
        </View>

        {/* Label */}
        <Animated.Text
          style={[labelStyle, { color: C.cream, fontSize: 10.5, letterSpacing: 0.21 }]}
          className="font-semibold"
        >
          {tab?.label}
        </Animated.Text>
      </Animated.View>
    </Pressable>
  );
}

export function TabBar({ state, navigation }: BottomTabBarProps) {
  const insets = useSafeAreaInsets();

  return (
    <View
      className="absolute left-3 right-3 h-[76px] rounded-4xl flex-row items-center justify-around px-2"
      style={{
        bottom: insets.bottom + 12,
        backgroundColor: `${C.jungleDeep}F5`,
        shadowColor: C.jungleDeep,
        shadowOffset: { width: 0, height: 18 },
        shadowOpacity: 0.45,
        shadowRadius: 24,
        elevation: 20,
      }}
    >
      {state.routes.map((route, index) => (
        <TabItem
          key={route.key}
          route={route}
          isActive={state.index === index}
          navigation={navigation}
        />
      ))}
    </View>
  );
}
