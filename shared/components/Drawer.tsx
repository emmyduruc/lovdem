import React, { useEffect, useRef, useState } from 'react';
import { Animated, DimensionValue, Modal, Pressable, View, ScrollView, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface DrawerProps {
  readonly open: boolean;
  readonly onClose: () => void;
  readonly children: React.ReactNode;
  readonly maxHeight?: DimensionValue;
  readonly backdropOpacity?: number;
}

export function Drawer({
  open,
  onClose,
  children,
  maxHeight = '78%',
  backdropOpacity = 0.6,
}: DrawerProps) {
  const translateY = useRef(new Animated.Value(700)).current;
  const backdropAlpha = useRef(new Animated.Value(0)).current;
  const [visible, setVisible] = useState(false);
  const insets = useSafeAreaInsets();

  useEffect(() => {
    if (open) {
      setVisible(true);
      Animated.parallel([
        Animated.spring(translateY, {
          toValue: 0,
          useNativeDriver: true,
          tension: 65,
          friction: 13,
        }),
        Animated.timing(backdropAlpha, {
          toValue: backdropOpacity,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      Animated.parallel([
        Animated.timing(translateY, {
          toValue: 700,
          duration: 220,
          useNativeDriver: true,
        }),
        Animated.timing(backdropAlpha, {
          toValue: 0,
          duration: 180,
          useNativeDriver: true,
        }),
      ]).start(() => setVisible(false));
    }
  }, [open, backdropAlpha, backdropOpacity, translateY]);

  return (
    <Modal visible={visible} transparent animationType="none" onRequestClose={onClose}>
      <Animated.View
        pointerEvents="none"
        style={[StyleSheet.absoluteFillObject, { backgroundColor: '#163828', opacity: backdropAlpha }]}
      />
      <Pressable
        onPress={onClose}
        style={StyleSheet.absoluteFillObject}
        accessibilityRole="button"
        accessibilityLabel="Close sheet"
      />
      <Animated.View
        className="absolute left-0 right-0 bottom-0 bg-cream rounded-tl-4xl rounded-tr-4xl pt-3.5 px-5"
        style={{
          transform: [{ translateY }],
          paddingBottom: insets.bottom + 20,
          maxHeight,
        }}
      >
        <View className="w-11 h-1.5 rounded-full self-center mb-3" style={{ backgroundColor: 'rgba(22,56,40,0.18)' }} />
        <ScrollView showsVerticalScrollIndicator={false} bounces={false}>
          {children}
        </ScrollView>
      </Animated.View>
    </Modal>
  );
}
