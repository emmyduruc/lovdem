import { useEffect, useRef } from 'react';
import { Pressable, View, Text } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import { codeByKey } from '../../../shared/constants/loveCodes';
import { C } from '../../../shared/constants/colors';
import { Icon } from '../../../shared/components/Icon';

interface QuizOptionProps {
  letter: string;
  codeKey: string;
  text: string;
  selected?: boolean;
  onPress: () => void;
}

export function QuizOption({ letter, codeKey, text, selected, onPress }: QuizOptionProps) {
  const code = codeByKey(codeKey);
  const scale = useSharedValue(1);
  const wasSelected = useRef(false);

  useEffect(() => {
    if (selected && !wasSelected.current) {
      scale.value = withSpring(0.965, { damping: 13, stiffness: 340 }, () => {
        scale.value = withSpring(1, { damping: 11, stiffness: 200 });
      });
    }
    wasSelected.current = !!selected;
  }, [selected]);

  const animStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  return (
    <Pressable
      onPress={onPress}
      onPressIn={() => {
        scale.value = withSpring(0.972, { damping: 15, stiffness: 300 });
      }}
      onPressOut={() => {
        if (!selected) scale.value = withSpring(1, { damping: 15, stiffness: 300 });
      }}
    >
      <Animated.View
        style={[
          {
            backgroundColor: selected ? 'rgba(22,56,40,0.055)' : '#ffffff',
            borderWidth: selected ? 2 : 1.5,
            borderColor: selected ? C.jungleDeep : 'rgba(22,56,40,0.16)',
            borderRadius: 20,
            padding: 16,
            flexDirection: 'row',
            gap: 14,
            alignItems: 'flex-start',
            shadowColor: C.jungleDeep,
            shadowOffset: { width: 0, height: selected ? 5 : 2 },
            shadowOpacity: selected ? 0.13 : 0.06,
            shadowRadius: selected ? 12 : 6,
            elevation: selected ? 4 : 1,
          },
          animStyle,
        ]}
      >
        <View
        className='w-8 h-8 rounded-full items-center justify-center mt-0.5'
          style={{
     
            borderRadius: 11,
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
            marginTop: 2,
            backgroundColor: selected ? C.jungleDeep : (code?.color || '#4a6f52'),
          }}
        >
          {selected ? (
            <Icon name="check" size={15} color={C.cream} stroke={2.6} />
          ) : (
            <Text style={{ color: code?.ink || '#fff', fontWeight: '800', fontSize: 15 }}>
              {letter}
            </Text>
          )}
        </View>
        <Text
          style={{
            flex: 1,
            fontSize: 15,
            lineHeight: 22,
            color: selected ? C.jungleDeep : C.ink,
            fontWeight: selected ? '600' : '400',
          }}
        >
          {text}
        </Text>
      </Animated.View>
    </Pressable>
  );
}
