import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { C } from '../../../shared/constants/colors';
import { Leo } from '../../../shared/components/Leo';
import { LeafCorner } from '../../../shared/components/LeafCorner';
import { Button } from '../../../shared/components/Button';
import { useOnboardingContext } from '../../../shared/context/OnboardingContext';

interface CompleteScreenProps {
  onEnter: () => void;
}

export function CompleteScreen({ onEnter }: CompleteScreenProps) {
  const { form } = useOnboardingContext();
  const insets = useSafeAreaInsets();

  return (
    <View style={[StyleSheet.absoluteFill, { backgroundColor: C.cream, overflow: 'hidden' }]}>
      <View
        style={[
          StyleSheet.absoluteFillObject,
          { backgroundColor: 'rgba(206,208,95,0.45)' },
        ]}
        pointerEvents="none"
      />
      <LeafCorner position="tr" kind={1} size={150} opacity={0.55} />
      <LeafCorner position="bl" kind={2} size={150} opacity={0.45} />

      <View
        className="flex-1 items-center justify-center px-7 gap-[18px]"
        style={{ paddingBottom: insets.bottom + 20 }}
      >
        <Leo size={170} mood="happy" />

        <Text className="text-2xs font-semibold tracking-widest uppercase text-jungle-mid">
          You're connected
        </Text>

        <Text className="text-[34px] font-bold text-ink text-center leading-4xl" style={{ letterSpacing: -0.68 }}>
          Welcome to your garden,{'\n'}{form.firstName} & Sam.
        </Text>

        <Text className="text-base-plus leading-base text-ink-2 text-center" style={{ maxWidth: 280 }}>
          Both profiles are linked. Leo will show up at the right moments — promise.
        </Text>

        <View className="mt-2 w-full">
          <Button label="Enter LoveTrack" onPress={onEnter} fullWidth />
        </View>
      </View>
    </View>
  );
}
