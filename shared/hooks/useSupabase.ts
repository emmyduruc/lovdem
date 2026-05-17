import { useSession } from '@clerk/expo';
import { createClient } from '@supabase/supabase-js';
import { useMemo } from 'react';
import type { Database } from '../types/database';

const SUPABASE_URL = process.env.EXPO_PUBLIC_SUPABASE_URL!;
const SUPABASE_ANON_KEY = process.env.EXPO_PUBLIC_SUPABASE_PUBLISHABLE_KEY!;

// Returns a Supabase client that injects the Clerk session token on every request.
// Token is refreshed automatically — no manual management needed.
export function useSupabase() {
  const { session } = useSession();

  return useMemo(
    () =>
      createClient<Database>(SUPABASE_URL, SUPABASE_ANON_KEY, {
        global: {
          fetch: async (url, options = {}) => {
            const token = await session?.getToken({ template: 'supabase' });
            const headers = new Headers(options?.headers);
            if (token) headers.set('Authorization', `Bearer ${token}`);
            return fetch(url, { ...options, headers });
          },
        },
        auth: { persistSession: false },
      }),
    [session]
  );
}
