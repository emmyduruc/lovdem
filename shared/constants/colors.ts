export const C = {
  jungleDeep:  '#163828',
  jungleMid:   '#4a6f52',
  yellowGreen: '#ced05f',
  gold:        '#c28d1d',
  amber:       '#d3ae66',
  amberLight:  '#f1d99a',
  terra:       '#e75838',
  brownRed:    '#6b372c',
  blush:       '#fcd0cd',
  cream:       '#fcfdde',
  cream2:      '#f4f3cf',
  ink:         '#1a2920',
  ink2:        '#3d4a40',
  muted:       '#7a8479',
  olive:       '#e5e6a6',
  white:       '#ffffff',
} as const;

export type ColorKey = keyof typeof C;
