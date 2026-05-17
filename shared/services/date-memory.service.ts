import type { SupabaseClient } from '@supabase/supabase-js';
import type { Database } from '../types/database';

const BUCKET = 'memories';

export interface DateMemory {
  id:           string;
  dateId:       string;
  coupleId:     string;
  uploadedBy:   string;
  url:          string;
  storagePath:  string;
  caption:      string | null;
  takenAt:      string | null;
  createdAt:    string;
}

export interface UploadMemoryParams {
  dateId:    string;
  coupleId:  string;
  userId:    string;
  /** Local file URI from expo-image-picker (file:// or content://) */
  fileUri:   string;
  fileExt:   'jpg' | 'jpeg' | 'png' | 'heic' | 'webp';
  caption?:  string;
  takenAt?:  string;
}

export function createDateMemoryService(db: SupabaseClient<Database>) {
  return {
    async listForDate(dateId: string): Promise<DateMemory[]> {
      const { data, error } = await db
        .from('date_memories')
        .select('*')
        .eq('date_id', dateId)
        .order('created_at', { ascending: true });
      if (error) throw error;
      return (data ?? []).map(toDateMemory);
    },

    async upload(params: UploadMemoryParams): Promise<DateMemory> {
      const { dateId, coupleId, userId, fileUri, fileExt, caption, takenAt } = params;

      const uuid  = crypto.randomUUID();
      const path  = `${coupleId}/${dateId}/${uuid}.${fileExt}`;

      const response = await fetch(fileUri);
      const blob     = await response.blob();

      const { error: uploadError } = await db.storage
        .from(BUCKET)
        .upload(path, blob, { contentType: blob.type, upsert: false });
      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = db.storage.from(BUCKET).getPublicUrl(path);

      const { data, error } = await db
        .from('date_memories')
        .insert({
          date_id:      dateId,
          couple_id:    coupleId,
          uploaded_by:  userId,
          url:          publicUrl,
          storage_path: path,
          caption:      caption ?? null,
          taken_at:     takenAt ?? null,
        })
        .select()
        .single();
      if (error) throw error;
      return toDateMemory(data);
    },

    async updateCaption(memoryId: string, caption: string): Promise<void> {
      const { error } = await db
        .from('date_memories')
        .update({ caption })
        .eq('id', memoryId);
      if (error) throw error;
    },

    async remove(memoryId: string, storagePath: string): Promise<void> {
      const { error: storageError } = await db.storage
        .from(BUCKET)
        .remove([storagePath]);
      if (storageError) throw storageError;

      const { error } = await db
        .from('date_memories')
        .delete()
        .eq('id', memoryId);
      if (error) throw error;
    },
  };
}

export type DateMemoryService = ReturnType<typeof createDateMemoryService>;

// ── Internal mapper ───────────────────────────────────────────

function toDateMemory(row: Record<string, unknown>): DateMemory {
  return {
    id:          row.id          as string,
    dateId:      row.date_id     as string,
    coupleId:    row.couple_id   as string,
    uploadedBy:  row.uploaded_by as string,
    url:         row.url         as string,
    storagePath: row.storage_path as string,
    caption:     row.caption     as string | null,
    takenAt:     row.taken_at    as string | null,
    createdAt:   row.created_at  as string,
  };
}
