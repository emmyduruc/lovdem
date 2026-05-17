import {
  getAuth,
  signInWithPhoneNumber,
  onAuthStateChanged,
  signOut,
  getIdToken,
} from '@react-native-firebase/auth';
import type { FirebaseAuthTypes } from '@react-native-firebase/auth';

// Single auth instance for the app
const firebaseAuth = getAuth();

export const authService = {
  sendOtp(phoneNumber: string): Promise<FirebaseAuthTypes.ConfirmationResult> {
    return signInWithPhoneNumber(firebaseAuth, phoneNumber);
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
    return firebaseAuth.currentUser;
  },

  async getIdToken(): Promise<string | null> {
    const user = firebaseAuth.currentUser;
    if (!user) return null;
    return getIdToken(user, false);
  },

  onAuthStateChanged(
    callback: (user: FirebaseAuthTypes.User | null) => void
  ): () => void {
    return onAuthStateChanged(firebaseAuth, callback);
  },

  signOut(): Promise<void> {
    return signOut(firebaseAuth);
  },
};
