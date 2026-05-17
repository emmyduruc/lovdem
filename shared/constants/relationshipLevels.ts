import { C } from './colors';

export const RELATIONSHIP_LEVELS = [
  { key: 'seedling', name: 'Seedling', glyph: '🌱', color: '#a9c79a', bg: '#e8efce' },
  { key: 'budding',  name: 'Budding',  glyph: '🌿', color: C.yellowGreen, bg: '#eaecb6' },
  { key: 'blooming', name: 'Blooming', glyph: '🌸', color: C.gold,        bg: '#f1d99a' },
  { key: 'rooted',   name: 'Rooted',   glyph: '🌳', color: C.jungleDeep,  bg: '#cfd6c0' },
  { key: 'thriving', name: 'Thriving', glyph: '🌺', color: C.terra,       bg: '#fbd4c8' },
] as const;

export type RelationshipLevelKey = typeof RELATIONSHIP_LEVELS[number]['key'];

export const levelByKey = (k: string) =>
  RELATIONSHIP_LEVELS.find((l) => l.key === k) || RELATIONSHIP_LEVELS[1];
