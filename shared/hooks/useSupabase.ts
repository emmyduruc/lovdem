import auth from '@react-native-firebase/auth';
import { createClient } from '@supabase/supabase-js';
import { useMemo } from 'react';
import type { Database } from '../types/database';

const SUPABASE_URL = process.env.EXPO_PUBLIC_SUPABASE_URL!;
const SUPABASE_ANON_KEY = process.env.EXPO_PUBLIC_SUPABASE_PUBLISHABLE_KEY!;

// Returns a Supabase client that injects the Firebase ID token on every request.
export function useSupabase() {
  return useMemo(
    () =>
      createClient<Database>(SUPABASE_URL, SUPABASE_ANON_KEY, {
        global: {
          fetch: async (url, options = {}) => {
            const token = await auth().currentUser?.getIdToken();
            const headers = new Headers(options?.headers);
            if (token) headers.set('Authorization', `Bearer ${token}`);
            return fetch(url, { ...options, headers });
          },
        },
        auth: { persistSession: false },
      }),
    []
  );
}
