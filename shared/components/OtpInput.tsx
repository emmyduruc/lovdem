import { useRef, useState, useEffect } from 'react';
import { TextInput, View, Pressable } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withSequence,
  withTiming,
  withRepeat,
  cancelAnimation,
} from 'react-native-reanimated';
import { AppText } from './AppText';
import { C } from '../constants/colors';

interface OtpInputProps {
  length?:    number;
  value:      string;
  onChange:   (value: string) => void;
  autoFocus?: boolean;
  disabled?:  boolean;
  error?:     boolean;
}

export function OtpInput({
  length    = 6,
  value,
  onChange,
  autoFocus = true,
  disabled  = false,
  error     = false,
}: OtpInputProps) {
  const inputRef  = useRef<TextInput>(null);
  const [focused, setFocused] = useState(false);

  useEffect(() => {
    if (autoFocus) {
      const t = setTimeout(() => inputRef.current?.focus(), 180);
      return () => clearTimeout(t);
    }
  }, [autoFocus]);

  const cells = Array.from({ length }, (_, i) => ({
    char:     value[i] ?? '',
    isActive: focused && i === Math.min(value.length, length - 1),
    isFilled: i < value.length,
  }));

  return (
    <Pressable onPress={() => !disabled && inputRef.current?.focus()}>
      <TextInput
        ref={inputRef}
        value={value}
        onChangeText={(t) => onChange(t.replace(/\D/g, '').slice(0, length))}
        keyboardType="number-pad"
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        editable={!disabled}
        caretHidden
        style={{ position: 'absolute', opacity: 0, width: 1, height: 1 }}
      />
      <View style={{ flexDirection: 'row', gap: 10 }}>
        {cells.map((cell, i) => (
          <OtpCell key={i} {...cell} error={error} />
        ))}
      </View>
    </Pressable>
  );
}

// ── Single cell ───────────────────────────────────────────────

interface OtpCellProps {
  char:     string;
  isActive: boolean;
  isFilled: boolean;
  error:    boolean;
}

function OtpCell({ char, isActive, isFilled, error }: OtpCellProps) {
  const scale    = useSharedValue(1);
  const prevChar = useRef('');

  useEffect(() => {
    if (char && !prevChar.current) {
      scale.value = withSequence(
        withSpring(1.18, { damping: 10, stiffness: 420 }),
        withSpring(1,    { damping: 14, stiffness: 300 })
      );
    }
    prevChar.current = char;
  }, [char]);

  const animStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const borderColor = error
    ? '#e75838'
    : isActive
    ? C.jungleDeep
    : isFilled
    ? `${C.jungleDeep}55`
    : `${C.jungleDeep}22`;

  const backgroundColor = isFilled
    ? `${C.jungleDeep}07`
    : '#ffffff';

  return (
    <Animated.View
      style={[
        {
          width:           46,
          height:          56,
          borderRadius:    14,
          borderWidth:     2,
          borderColor,
          backgroundColor,
          alignItems:      'center',
          justifyContent:  'center',
        },
        animStyle,
      ]}
    >
      {char ? (
        <AppText variant="subtitle" color={error ? '#e75838' : C.ink}>
          {char}
        </AppText>
      ) : isActive ? (
        <Cursor />
      ) : null}
    </Animated.View>
  );
}

// ── Blinking cursor ───────────────────────────────────────────

function Cursor() {
  const opacity = useSharedValue(1);

  useEffect(() => {
    opacity.value = withRepeat(
      withSequence(
        withTiming(0, { duration: 500 }),
        withTiming(1, { duration: 500 })
      ),
      -1,
      false
    );
    return () => cancelAnimation(opacity);
  }, []);

  const style = useAnimatedStyle(() => ({ opacity: opacity.value }));

  return (
    <Animated.View
      style={[
        { width: 2, height: 22, borderRadius: 1, backgroundColor: C.jungleDeep },
        style,
      ]}
    />
  );
}
