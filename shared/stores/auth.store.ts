import { create } from 'zustand';

interface AuthState {
  userId: string | null;
  isOnboarded: boolean;
  setUserId: (id: string | null) => void;
  setOnboarded: (value: boolean) => void;
  reset: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  userId: null,
  isOnboarded: false,
  setUserId: (userId) => set({ userId }),
  setOnboarded: (isOnboarded) => set({ isOnboarded }),
  reset: () => set({ userId: null, isOnboarded: false }),
}));
