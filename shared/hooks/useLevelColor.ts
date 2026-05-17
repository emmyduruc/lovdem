import { C } from '../constants/colors';

export function useLevelColor(value: number) {
  const color = value >= 70 ? C.jungleMid : value >= 35 ? C.amber : C.terra;
  const label = value >= 70 ? 'Green zone' : value >= 35 ? 'Steady' : 'Needs care';
  return { color, label };
}
