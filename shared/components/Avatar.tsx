import { View, Text, ViewStyle } from 'react-native';

interface AvatarProps {
  initial: string;
  variant?: 'default' | 'alt';
  size?: 'sm' | 'md' | 'lg';
  style?: ViewStyle;
}

const sizeMap = {
  sm: { dim: 32, fontSize: 12, borderWidth: 1.5 },
  md: { dim: 44, fontSize: 16, borderWidth: 2 },
  lg: { dim: 64, fontSize: 22, borderWidth: 2 },
};

export function Avatar({ initial, variant = 'default', size = 'md', style }: AvatarProps) {
  const s = sizeMap[size];
  const bgColor = variant === 'alt' ? '#e75838' : '#c28d1d';

  return (
    <View
      style={[
        {
          width: s.dim,
          height: s.dim,
          borderRadius: s.dim / 2,
          backgroundColor: bgColor,
          alignItems: 'center',
          justifyContent: 'center',
          borderWidth: s.borderWidth,
          borderColor: '#fff8e6',
          flexShrink: 0,
        },
        style,
      ]}
    >
      <Text style={{ color: '#fff8e6', fontWeight: '700', fontSize: s.fontSize }}>
        {initial.toUpperCase()}
      </Text>
    </View>
  );
}
