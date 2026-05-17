// Auto-generate this file by running:
// supabase gen types typescript --project-id <id> > shared/types/database.ts

export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: {
          id:           string;
          phone:        string | null;
          first_name:   string;
          avatar_url:   string | null;
          birthday:     string | null;
          push_token:   string | null;
          created_at:   string;
          updated_at:   string;
        };
        Insert: {
          id:           string;
          phone?:       string | null;
          first_name:   string;
          avatar_url?:  string | null;
          birthday?:    string | null;
          push_token?:  string | null;
        };
        Update: {
          phone?:       string | null;
          first_name?:  string;
          avatar_url?:  string | null;
          birthday?:    string | null;
          push_token?:  string | null;
        };
      };
      couples: {
        Row: {
          id:                     string;
          user_a_id:              string;
          user_b_id:              string | null;
          invite_code:            string;
          invite_expires_at:      string;
          status:                 string;
          date_freq:              string;
          check_in_freq:          string;
          relationship_level:     string;
          relationship_start_date: string | null;
          created_at:             string;
        };
        Insert: {
          user_a_id:    string;
          invite_code:  string;
          date_freq?:   string;
          check_in_freq?: string;
        };
        Update: {
          user_b_id?:              string | null;
          status?:                 string;
          date_freq?:              string;
          check_in_freq?:          string;
          relationship_level?:     string;
          relationship_start_date?: string | null;
        };
      };
      love_levels: {
        Row: {
          couple_id:  string;
          user_id:    string;
          level:      number;
          updated_at: string;
        };
        Insert: {
          couple_id: string;
          user_id:   string;
          level:     number;
        };
        Update: {
          level?: number;
        };
      };
      date_memories: {
        Row: {
          id:           string;
          date_id:      string;
          couple_id:    string;
          uploaded_by:  string;
          url:          string;
          storage_path: string;
          caption:      string | null;
          taken_at:     string | null;
          created_at:   string;
        };
        Insert: {
          date_id:      string;
          couple_id:    string;
          uploaded_by:  string;
          url:          string;
          storage_path: string;
          caption?:     string | null;
          taken_at?:    string | null;
        };
        Update: {
          caption?: string | null;
        };
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
  };
};
