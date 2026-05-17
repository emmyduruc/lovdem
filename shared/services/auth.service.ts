import auth from '@react-native-firebase/auth';
import type { FirebaseAuthTypes } from '@react-native-firebase/auth';

export const authService = {
  sendOtp(phoneNumber: string): Promise<FirebaseAuthTypes.ConfirmationResult> {
    return auth().signInWithPhoneNumber(phoneNumber);
  },

  async verifyOtp(
    confirmation: FirebaseAuthTypes.ConfirmationResult,
    code: string
  ): Promise<FirebaseAuthTypes.User> {
    const credential = await confirmation.confirm(code);
    if (!credential?.user) throw new Error('Verification failed. Please try again.');
    return credential.user;
  },

  getCurrentUser(): FirebaseAuthTypes.User | null {
    return auth().currentUser;
  },

  getIdToken(): Promise<string | null> {
    return auth().currentUser?.getIdToken(false) ?? Promise.resolve(null);
  },

  onAuthStateChanged(
    callback: (user: FirebaseAuthTypes.User | null) => void
  ): () => void {
    return auth().onAuthStateChanged(callback);
  },

  signOut(): Promise<void> {
    return auth().signOut();
  },
};
