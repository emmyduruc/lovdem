import React, { useEffect, useRef, useState } from 'react';
import { Animated, DimensionValue, Modal, Pressable, View, ScrollView } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface DrawerProps {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
  maxHeight?: DimensionValue;
}

export function Drawer({ open, onClose, children, maxHeight = '78%' }: DrawerProps) {
  const translateY = useRef(new Animated.Value(700)).current;
  const [visible, setVisible] = useState(false);
  const insets = useSafeAreaInsets();

  useEffect(() => {
    if (open) {
      setVisible(true);
      Animated.spring(translateY, {
        toValue: 0,
        useNativeDriver: true,
        tension: 65,
        friction: 13,
      }).start();
    } else {
      Animated.timing(translateY, {
        toValue: 700,
        duration: 220,
        useNativeDriver: true,
      }).start(() => setVisible(false));
    }
  }, [open]);

  return (
    <Modal visible={visible} transparent animationType="none" onRequestClose={onClose}>
      <Pressable
        onPress={onClose}
        className="absolute inset-0"
        style={{ backgroundColor: 'rgba(22,56,40,0.55)' }}
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
