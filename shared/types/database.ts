// Auto-generate this file by running:
// supabase gen types typescript --project-id <id> > shared/types/database.ts

export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          first_name: string;
          email: string;
          birthday: string | null;
          primary_code: string;
          code_ranking: string[];
          push_token: string | null;
          created_at: string;
        };
        Insert: Omit<Database['public']['Tables']['profiles']['Row'], 'created_at'>;
        Update: Partial<Database['public']['Tables']['profiles']['Insert']>;
      };
      couples: {
        Row: {
          id: string;
          user_a_id: string;
          user_b_id: string | null;
          invite_code: string;
          date_freq: string;
          check_in: string;
          relationship_level: string;
          created_at: string;
        };
        Insert: Omit<Database['public']['Tables']['couples']['Row'], 'created_at'>;
        Update: Partial<Database['public']['Tables']['couples']['Insert']>;
      };
      love_levels: {
        Row: {
          couple_id: string;
          user_id: string;
          level: number;
          updated_at: string;
        };
        Insert: Omit<Database['public']['Tables']['love_levels']['Row'], 'updated_at'>;
        Update: Partial<Database['public']['Tables']['love_levels']['Insert']>;
      };
      date_memories: {
        Row: {
          id: string;
          date_id: string;
          couple_id: string;
          uploaded_by: string;
          url: string;
          storage_path: string;
          caption: string | null;
          taken_at: string | null;
          created_at: string;
        };
        Insert: Omit<Database['public']['Tables']['date_memories']['Row'], 'id' | 'created_at'>;
        Update: Pick<Database['public']['Tables']['date_memories']['Row'], 'caption'>;
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
  };
};
