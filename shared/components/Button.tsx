import { Pressable, Text, View, ViewStyle, TextStyle } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';
import { C } from '../constants/colors';

export type ButtonVariant = 'default' | 'olive' | 'ghost' | 'outline' | 'terra' | 'gold';
export type ButtonSize = 'sm' | 'md';

export interface ButtonProps {
  label: string;
  onPress?: () => void;
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
  disabled?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  style?: ViewStyle;
  textStyle?: TextStyle;
}

const VARIANTS: Record<ButtonVariant, { bg: string; text: string; border: string | null }> = {
  default: { bg: C.jungleDeep,  text: C.cream,      border: null },
  olive:   { bg: C.yellowGreen, text: C.jungleDeep,  border: null },
  ghost:   { bg: 'transparent', text: C.jungleDeep,  border: null },
  outline: { bg: 'transparent', text: C.jungleDeep,  border: `${C.jungleDeep}2E` },
  terra:   { bg: C.terra,       text: '#fff8f3',     border: null },
  gold:    { bg: C.gold,        text: '#fff8e6',     border: null },
};

const SIZES: Record<ButtonSize, { height: number; fontSize: number; radius: number; px: number }> = {
  sm: { height: 40, fontSize: 13.5, radius: 14, px: 14 },
  md: { height: 56, fontSize: 16,   radius: 18, px: 22 },
};

export function Button({
  label,
  onPress,
  variant = 'default',
  size = 'md',
  fullWidth = false,
  disabled = false,
  leftIcon,
  rightIcon,
  style,
  textStyle,
}: ButtonProps) {
  const v = VARIANTS[variant];
  const s = SIZES[size];
  const scale = useSharedValue(1);

  const animStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const handlePressIn = () => {
    scale.value = withSpring(0.96, { damping: 14, stiffness: 380 });
  };
  const handlePressOut = () => {
    scale.value = withSpring(1, { damping: 13, stiffness: 260 });
  };

  return (
    <Pressable
      onPress={onPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      disabled={disabled}
      style={{ width: fullWidth ? '100%' : undefined, opacity: disabled ? 0.5 : 1 }}
    >
      <Animated.View
        style={[
          {
            height: s.height,
            borderRadius: s.radius,
            paddingHorizontal: s.px,
            backgroundColor: v.bg,
            borderWidth: v.border ? 1.5 : 0,
            borderColor: v.border ?? 'transparent',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 8,
          },
          animStyle,
          style,
        ]}
      >
        {leftIcon && <View>{leftIcon}</View>}
        <Text
          style={[
            {
              color: v.text,
              fontSize: s.fontSize,
              fontWeight: '600',
              letterSpacing: -0.01 * s.fontSize,
            },
            textStyle,
          ]}
        >
          {label}
        </Text>
        {rightIcon && <View>{rightIcon}</View>}
      </Animated.View>
    </Pressable>
  );
}
