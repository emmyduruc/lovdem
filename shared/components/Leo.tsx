import React, { useEffect, useRef } from 'react';
import { Image, Text, Animated } from 'react-native';
import { C } from '../constants/colors';

interface LeoProps {
  size?: number;
  mood?: 'happy' | 'sleepy' | 'concerned';
}

export function Leo({ size = 110, mood = 'happy' }: LeoProps) {
  const bobAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (mood !== 'happy') return;
    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(bobAnim, { toValue: -6, duration: 1800, useNativeDriver: true }),
        Animated.timing(bobAnim, { toValue: 0, duration: 1800, useNativeDriver: true }),
      ])
    );
    loop.start();
    return () => loop.stop();
  }, [mood]);

  return (
    <Animated.View
      style={{
        width: size,
        height: size,
        transform: mood === 'happy' ? [{ translateY: bobAnim }] : [],
        opacity: mood === 'sleepy' ? 0.85 : 1,
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Image
        source={require('../../assets/leo-logo.png')}
        style={{ width: size, height: size }}
        resizeMode="contain"
      />
      {mood === 'sleepy' && (
        <Text
          style={{
            position: 'absolute',
            top: -6,
            right: -2,
            fontSize: size * 0.22,
            color: C.cream,
            fontWeight: '700',
          }}
        >
          z
        </Text>
      )}
    </Animated.View>
  );
}
