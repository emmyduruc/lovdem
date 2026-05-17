import { useState } from 'react';
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';

interface PhoneAuthState {
  loading: boolean;
  verificationId: string | null;
  error: string | null;
}

export function usePhoneAuth() {
  const [state, setState] = useState<PhoneAuthState>({
    loading: false,
    verificationId: null,
    error: null,
  });

  const sendCode = async (phoneNumber: string) => {
    setState((prev) => ({ ...prev, loading: true, error: null }));
    try {
      const confirmation = await auth().signInWithPhoneNumber(phoneNumber);
      setState({
        loading: false,
        verificationId: confirmation.verificationId,
        error: null,
      });
      return confirmation;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to send verification code';
      setState((prev) => ({ ...prev, loading: false, error: message }));
      throw err;
    }
  };

  const confirmCode = async (
    verificationCode: string,
    confirmation?: FirebaseAuthTypes.ConfirmationResult | null
  ) => {
    setState((prev) => ({ ...prev, loading: true, error: null }));
    try {
      if (confirmation) {
        const credentialUser = await confirmation.confirm(verificationCode);
        setState((prev) => ({ ...prev, loading: false }));
        return credentialUser;
      }

      if (!state.verificationId) {
        throw new Error('No verification ID available. Call sendCode first.');
      }

      const credential = auth.PhoneAuthProvider.credential(state.verificationId, verificationCode);
      const signedInUser = await auth().signInWithCredential(credential);
      setState((prev) => ({ ...prev, loading: false }));
      return signedInUser;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to verify code';
      setState((prev) => ({ ...prev, loading: false, error: message }));
      throw err;
    }
  };

  return {
    ...state,
    sendCode,
    confirmCode,
  };
}
