import { create } from 'zustand';
import { AppData } from '../types';

interface CoupleState {
  data: AppData | null;
  isLoading: boolean;
  setData: (data: AppData) => void;
  updateMe: (partial: Partial<AppData['me']>) => void;
  updatePartner: (partial: Partial<AppData['partner']>) => void;
  setLoading: (value: boolean) => void;
  reset: () => void;
}

export const useCoupleStore = create<CoupleState>((set) => ({
  data: null,
  isLoading: false,
  setData: (data) => set({ data }),
  updateMe: (partial) =>
    set((s) => s.data ? { data: { ...s.data, me: { ...s.data.me, ...partial } } } : {}),
  updatePartner: (partial) =>
    set((s) => s.data ? { data: { ...s.data, partner: { ...s.data.partner, ...partial } } } : {}),
  setLoading: (isLoading) => set({ isLoading }),
  reset: () => set({ data: null, isLoading: false }),
}));
