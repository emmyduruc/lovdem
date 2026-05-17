-- ============================================================
-- DATE MEMORIES
-- A photo gallery attached to a date — distinct from the text
-- journal. Either partner can upload images; both can view them.
--
-- Storage path convention (Supabase Storage bucket: "memories"):
--   {couple_id}/{date_id}/{uuid}.{ext}
-- ============================================================

CREATE TABLE public.date_memories (
  id           UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  date_id      UUID        NOT NULL REFERENCES public.dates(id)    ON DELETE CASCADE,
  couple_id    UUID        NOT NULL REFERENCES public.couples(id)  ON DELETE CASCADE,
  uploaded_by  TEXT        NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,

  -- Full public URL returned by Supabase Storage after upload
  url          TEXT        NOT NULL,

  -- Relative path inside the bucket — needed for server-side deletes
  storage_path TEXT        NOT NULL,

  caption      TEXT,

  -- Optional: when the photo was actually taken (may differ from upload time)
  taken_at     TIMESTAMPTZ,

  created_at   TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_date_memories_date   ON public.date_memories (date_id, created_at DESC);
CREATE INDEX idx_date_memories_couple ON public.date_memories (couple_id);

-- ── RLS ──────────────────────────────────────────────────────

ALTER TABLE public.date_memories ENABLE ROW LEVEL SECURITY;

-- Both partners can view memories for their shared dates
CREATE POLICY "date_memories: couple members can read"
  ON public.date_memories FOR SELECT
  USING (public.is_couple_member(couple_id));

-- Either partner can upload a memory to a shared date
CREATE POLICY "date_memories: couple members can insert"
  ON public.date_memories FOR INSERT
  WITH CHECK (
    uploaded_by = public.current_user_id()
    AND public.is_couple_member(couple_id)
  );

-- Only the uploader can update the caption or delete their photo
CREATE POLICY "date_memories: uploader can update"
  ON public.date_memories FOR UPDATE
  USING (uploaded_by = public.current_user_id());

CREATE POLICY "date_memories: uploader can delete"
  ON public.date_memories FOR DELETE
  USING (uploaded_by = public.current_user_id());
