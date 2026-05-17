import { createContext, useContext, useState } from 'react';
import type { FirebaseAuthTypes } from '@react-native-firebase/auth';
import { OnboardingForm } from '../types';

interface OnboardingContextValue {
  form: OnboardingForm;
  updateForm: (patch: Partial<OnboardingForm>) => void;
  confirmation: FirebaseAuthTypes.ConfirmationResult | null;
  setConfirmation: (c: FirebaseAuthTypes.ConfirmationResult | null) => void;
}

const OnboardingContext = createContext<OnboardingContextValue | null>(null);

const DEFAULT_FORM: OnboardingForm = {
  phone:            '',
  firstName:        '',
  birthday:         '',
  checkIn:          '3x',
  dateFreq:         'biweekly',
  codeRanking:      null,
  avatarUri:        null,
  avatarUrl:        null,
  partnerConnected: false,
};

export function OnboardingProvider({ children }: { children: React.ReactNode }) {
  const [form, setForm]               = useState<OnboardingForm>(DEFAULT_FORM);
  const [confirmation, setConfirmation] = useState<FirebaseAuthTypes.ConfirmationResult | null>(null);

  const updateForm = (patch: Partial<OnboardingForm>) =>
    setForm((prev) => ({ ...prev, ...patch }));

  return (
    <OnboardingContext.Provider value={{ form, updateForm, confirmation, setConfirmation }}>
      {children}
    </OnboardingContext.Provider>
  );
}

export function useOnboardingContext() {
  const ctx = useContext(OnboardingContext);
  if (!ctx) throw new Error('useOnboardingContext must be used within OnboardingProvider');
  return ctx;
}
