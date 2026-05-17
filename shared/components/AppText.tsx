import { Text, TextProps, TextStyle } from 'react-native';
import { C } from '../constants/colors';

/**
 * Semantic text variants that map to the design system typography scale.
 *
 * heading   30px bold — page titles, hero numbers
 * title     24px bold — section headings
 * subtitle  20px bold — card headings, modal titles
 * bodyLg    15px — primary readable body
 * body      14.5px — secondary body, descriptions
 * caption   12px — timestamps, meta, labels
 * label     11px semibold uppercase — form labels, section eyebrows (ink-2)
 * eyebrow   11px semibold uppercase — category tags (jungle-mid tint)
 */
export type TextVariant =
  | 'heading'
  | 'title'
  | 'subtitle'
  | 'bodyLg'
  | 'body'
  | 'caption'
  | 'label'
  | 'eyebrow';

const VARIANTS: Record<TextVariant, TextStyle> = {
  heading:  { fontSize: 30, fontWeight: '700', letterSpacing: -0.6,  color: C.ink,      lineHeight: 38 },
  title:    { fontSize: 24, fontWeight: '700', letterSpacing: -0.26, color: C.ink,      lineHeight: 32 },
  subtitle: { fontSize: 20, fontWeight: '700', letterSpacing: -0.1,  color: C.ink,      lineHeight: 28 },
  bodyLg:   { fontSize: 15, fontWeight: '400',                       color: C.ink,      lineHeight: 22 },
  body:     { fontSize: 14.5, fontWeight: '400',                     color: C.ink2,     lineHeight: 21 },
  caption:  { fontSize: 12, fontWeight: '400',                       color: C.ink2,     lineHeight: 16 },
  label:    { fontSize: 11, fontWeight: '600', letterSpacing: 1.3,   color: C.ink2,     lineHeight: 16, textTransform: 'uppercase' },
  eyebrow:  { fontSize: 11, fontWeight: '600', letterSpacing: 1.3,   color: C.jungleMid, lineHeight: 16, textTransform: 'uppercase' },
};

export interface AppTextProps extends Omit<TextProps, 'style'> {
  /** Typography preset. Defaults to 'body'. */
  variant?: TextVariant;
  /** Override the color from the variant. Useful for dark-background contexts. */
  color?: string;
  /** Extra or override styles — merged after variant styles. */
  style?: TextStyle | TextStyle[];
  children: React.ReactNode;
}

export function AppText({ variant = 'body', color, style, children, ...rest }: AppTextProps) {
  const base = VARIANTS[variant];
  return (
    <Text
      style={[base, color ? { color } : undefined, ...(Array.isArray(style) ? style : [style])]}
      {...rest}
    >
      {children}
    </Text>
  );
}
