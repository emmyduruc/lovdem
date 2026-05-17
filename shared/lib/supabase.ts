import { createClient } from '@supabase/supabase-js';
import type { Database } from '../types/database';

const SUPABASE_URL = process.env.EXPO_PUBLIC_SUPABASE_URL!;
const SUPABASE_ANON_KEY = process.env.EXPO_PUBLIC_SUPABASE_PUBLISHABLE_KEY!;

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: { persistSession: false },
});

export function createAuthClient(token: string) {
  return createClient<Database>(SUPABASE_URL, SUPABASE_ANON_KEY, {
    global: { headers: { Authorization: `Bearer ${token}` } },
    auth: { persistSession: false },
  });
}
