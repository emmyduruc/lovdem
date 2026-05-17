import * as SecureStore from 'expo-secure-store';

const ONBOARDING_COMPLETE_KEY = 'lovdem_onboarding_complete';

export async function getOnboardingComplete(): Promise<boolean> {
  const value = await SecureStore.getItemAsync(ONBOARDING_COMPLETE_KEY);
  return value === 'true';
}

export async function setOnboardingComplete(complete: boolean): Promise<void> {
  if (complete) {
    await SecureStore.setItemAsync(ONBOARDING_COMPLETE_KEY, 'true');
  } else {
    await SecureStore.deleteItemAsync(ONBOARDING_COMPLETE_KEY);
  }
}
