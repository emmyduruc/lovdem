import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { C } from '../../../shared/constants/colors';
import { Leo } from '../../../shared/components/Leo';
import { HeartSpots } from '../../../shared/components/HeartSpots';
import { Button } from '../../../shared/components/Button';

interface SplashScreenProps {
  onContinue: () => void;
}

export function SplashScreen({ onContinue }: SplashScreenProps) {
  const insets = useSafeAreaInsets();

  return (
    <View style={[StyleSheet.absoluteFill, { backgroundColor: C.jungleDeep, alignItems: 'center', justifyContent: 'center' }]}>
      <HeartSpots opacity={0.10} color={C.cream} />
      <View className="items-center gap-[18px] z-10">
        <Leo size={170} mood="happy" />
        <View className="items-center gap-1.5">
          <View className="flex-row">
            <Text className="text-10xl font-bold text-cream" style={{ letterSpacing: -0.8 }}>
              Love
            </Text>
            <Text className="text-10xl font-bold text-yellow-green" style={{ letterSpacing: -0.8 }}>
              Track
            </Text>
          </View>
          <Text className="text-base opacity-75 uppercase font-semibold text-cream" style={{ letterSpacing: 2.8 }}>
            Love · Grow · Track
          </Text>
        </View>
      </View>

      <View
        style={{
          position: 'absolute',
          left: 24,
          right: 24,
          bottom: insets.bottom + 40,
          zIndex: 10,
          gap: 8,
        }}
      >
        <Button label="Get started" onPress={onContinue} variant="olive" fullWidth />
        <View style={{ alignItems: 'center', marginTop: 6 }}>
          <Text style={{ fontSize: 13.5, color: C.cream, opacity: 0.75 }}>
            Already with us?{' '}
            <Text style={{ color: C.yellowGreen, fontWeight: '700', opacity: 1 }}>Sign in</Text>
          </Text>
        </View>
      </View>
    </View>
  );
}
