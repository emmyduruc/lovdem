import type { SupabaseClient } from '@supabase/supabase-js';
import type { Database } from '../types/database';

type Profile = Database['public']['Tables']['profiles']['Row'];
type ProfileUpdate = Database['public']['Tables']['profiles']['Update'];

export function createUserService(db: SupabaseClient<Database>) {
  return {
    async getProfile(userId: string): Promise<Profile> {
      const { data, error } = await db
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();
      if (error) throw error;
      return data;
    },

    async upsertProfile(profile: Database['public']['Tables']['profiles']['Insert']): Promise<Profile> {
      const { data, error } = await db
        .from('profiles')
        .upsert(profile)
        .select()
        .single();
      if (error) throw error;
      return data;
    },

    async updateProfile(userId: string, updates: ProfileUpdate): Promise<Profile> {
      const { data, error } = await db
        .from('profiles')
        .update(updates)
        .eq('id', userId)
        .select()
        .single();
      if (error) throw error;
      return data;
    },

    async savePushToken(userId: string, token: string): Promise<void> {
      const { error } = await db
        .from('profiles')
        .update({ push_token: token })
        .eq('id', userId);
      if (error) throw error;
    },
  };
}

export type UserService = ReturnType<typeof createUserService>;
