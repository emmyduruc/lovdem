import type { SupabaseClient } from '@supabase/supabase-js';
import type { Database } from '../types/database';
import { createUserService } from './user.service';
import { createCoupleService } from './couple.service';

export function createServices(db: SupabaseClient<Database>) {
  return {
    user: createUserService(db),
    couple: createCoupleService(db),
  };
}

export type AppServices = ReturnType<typeof createServices>;

export { createUserService } from './user.service';
export { createCoupleService } from './couple.service';
