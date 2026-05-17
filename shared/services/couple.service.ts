import type { SupabaseClient } from '@supabase/supabase-js';
import type { Database } from '../types/database';

type Couple = Database['public']['Tables']['couples']['Row'];

export function createCoupleService(db: SupabaseClient<Database>) {
  return {
    async getByUserId(userId: string): Promise<Couple | null> {
      const { data, error } = await db
        .from('couples')
        .select('*')
        .or(`user_a_id.eq.${userId},user_b_id.eq.${userId}`)
        .maybeSingle();
      if (error) throw error;
      return data;
    },

    async create(userId: string, opts: { dateFreq: string; checkIn: string }): Promise<Couple> {
      const inviteCode = Math.random().toString(36).substring(2, 8).toUpperCase();
      const { data, error } = await db
        .from('couples')
        .insert({
          user_a_id: userId,
          invite_code: inviteCode,
          date_freq: opts.dateFreq,
          check_in: opts.checkIn,
          relationship_level: 'seeds',
        })
        .select()
        .single();
      if (error) throw error;
      return data;
    },

    async joinByInviteCode(userId: string, inviteCode: string): Promise<Couple> {
      const { data, error } = await db
        .from('couples')
        .update({ user_b_id: userId })
        .eq('invite_code', inviteCode.toUpperCase())
        .is('user_b_id', null)
        .select()
        .single();
      if (error) throw error;
      return data;
    },

    async updateLoveLevel(coupleId: string, userId: string, level: number): Promise<void> {
      const { error } = await db
        .from('love_levels')
        .upsert({ couple_id: coupleId, user_id: userId, level });
      if (error) throw error;
    },
  };
}

export type CoupleService = ReturnType<typeof createCoupleService>;
