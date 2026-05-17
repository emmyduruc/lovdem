import React, { createContext, useContext, useState } from 'react';
import { OnboardingForm } from '../types';

interface OnboardingContextValue {
  form: OnboardingForm;
  updateForm: (patch: Partial<OnboardingForm>) => void;
}

const OnboardingContext = createContext<OnboardingContextValue | null>(null);

const DEFAULT_FORM: OnboardingForm = {
  name: 'Jordan Rivers',
  firstName: 'Jordan',
  email: 'jordan@hello.com',
  password: '',
  birthday: 'Apr 12, 1994',
  checkIn: '3x',
  dateFreq: 'biweekly',
  codeRanking: null,
};

export function OnboardingProvider({ children }: { children: React.ReactNode }) {
  const [form, setForm] = useState<OnboardingForm>(DEFAULT_FORM);
  const updateForm = (patch: Partial<OnboardingForm>) =>
    setForm((prev) => ({ ...prev, ...patch }));

  return (
    <OnboardingContext.Provider value={{ form, updateForm }}>
      {children}
    </OnboardingContext.Provider>
  );
}

export function useOnboardingContext() {
  const ctx = useContext(OnboardingContext);
  if (!ctx) throw new Error('useOnboardingContext must be used within OnboardingProvider');
  return ctx;
}
