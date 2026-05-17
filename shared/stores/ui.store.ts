import { create } from 'zustand';
import { Overlay } from '../types';

interface UIState {
  overlay: Overlay | null;
  setOverlay: (overlay: Overlay | null) => void;
}

export const useUIStore = create<UIState>((set) => ({
  overlay: null,
  setOverlay: (overlay) => set({ overlay }),
}));
