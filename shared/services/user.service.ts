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


    async uploadAvatar(
      userId: string,
      path: string,
      blob: Blob,
      ext: string
    ): Promise<{ error: Error | null }> {
      const mimeTypes: Record<string, string> = {
        jpg: 'image/jpeg', jpeg: 'image/jpeg',
        png: 'image/png',  webp: 'image/webp', heic: 'image/heic',
      };
      const { error } = await db.storage
        .from('user')
        .upload(path, blob, { contentType: mimeTypes[ext] ?? 'image/jpeg', upsert: true });
      return { error: error ? new Error(error.message) : null };
    },

    getAvatarUrl(bucket: string, path: string): string {
      const { data } = db.storage.from(bucket).getPublicUrl(path);
      return data.publicUrl;
    },
  };
}

export type UserService = ReturnType<typeof createUserService>;
