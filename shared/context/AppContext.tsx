import React, { createContext, useContext, useState } from 'react';
import { AppData, Overlay } from '../types';
import { LOVE_CODES } from '../constants/loveCodes';

const DEFAULT_DATA: AppData = {
  me: {
    firstName: 'Jordan',
    loveLevel: 78,
    primaryCode: 'presence',
    ranking: ['presence', 'warmth', 'words', 'actions', 'gestures'],
  },
  partner: {
    firstName: 'Sam',
    loveLevel: 24,
    primaryCode: 'warmth',
    ranking: ['warmth', 'words', 'presence', 'actions', 'gestures'],
  },
  relationshipLevel: 'budding',
  dateFreq: 'biweekly',
  checkIn: '3x',
};

interface AppContextValue {
  data: AppData;
  setData: React.Dispatch<React.SetStateAction<AppData>>;
  overlay: Overlay | null;
  setOverlay: (overlay: Overlay | null) => void;
}

const AppContext = createContext<AppContextValue | null>(null);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [data, setData] = useState<AppData>(DEFAULT_DATA);
  const [overlay, setOverlay] = useState<Overlay | null>(null);

  return (
    <AppContext.Provider value={{ data, setData, overlay, setOverlay }}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useAppContext must be used within AppProvider');
  return ctx;
}

export { LOVE_CODES };
