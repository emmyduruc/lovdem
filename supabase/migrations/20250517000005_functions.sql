-- ============================================================
-- FUNCTIONS & TRIGGERS
-- ============================================================

-- ── Helpers ──────────────────────────────────────────────────

-- Returns the authenticated user's ID from the JWT.
-- Works with both Firebase Auth (sub = Firebase UID)
-- and Clerk (sub = Clerk user ID).
CREATE OR REPLACE FUNCTION public.current_user_id()
RETURNS TEXT
LANGUAGE sql STABLE
AS $$
  SELECT auth.jwt() ->> 'sub';
$$;

-- Returns true when the calling user belongs to the given couple.
CREATE OR REPLACE FUNCTION public.is_couple_member(p_couple_id UUID)
RETURNS BOOLEAN
LANGUAGE sql STABLE
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM   public.couples
    WHERE  id         = p_couple_id
      AND  (user_a_id = public.current_user_id()
         OR user_b_id = public.current_user_id())
  );
$$;

-- ── updated_at trigger ───────────────────────────────────────

CREATE OR REPLACE FUNCTION public.set_updated_at()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$;

-- Attach to every table that has an updated_at column
CREATE TRIGGER trg_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

CREATE TRIGGER trg_user_settings_updated_at
  BEFORE UPDATE ON public.user_settings
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

CREATE TRIGGER trg_love_codes_updated_at
  BEFORE UPDATE ON public.love_codes
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

CREATE TRIGGER trg_love_levels_updated_at
  BEFORE UPDATE ON public.love_levels
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

CREATE TRIGGER trg_dates_updated_at
  BEFORE UPDATE ON public.dates
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

CREATE TRIGGER trg_date_journals_updated_at
  BEFORE UPDATE ON public.date_journals
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

CREATE TRIGGER trg_journals_updated_at
  BEFORE UPDATE ON public.journals
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- ── Auto-create user_settings on profile insert ──────────────

CREATE OR REPLACE FUNCTION public.create_default_settings()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN
  INSERT INTO public.user_settings (user_id)
  VALUES (NEW.id)
  ON CONFLICT DO NOTHING;
  RETURN NEW;
END;
$$;

CREATE TRIGGER trg_create_default_settings
  AFTER INSERT ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.create_default_settings();

-- ── Snapshot love_level into history on every update ─────────

CREATE OR REPLACE FUNCTION public.record_love_level_history()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN
  IF OLD.level IS DISTINCT FROM NEW.level THEN
    INSERT INTO public.love_level_history (couple_id, user_id, level)
    VALUES (NEW.couple_id, NEW.user_id, NEW.level);
  END IF;
  RETURN NEW;
END;
$$;

CREATE TRIGGER trg_love_level_history
  AFTER UPDATE ON public.love_levels
  FOR EACH ROW EXECUTE FUNCTION public.record_love_level_history();

-- ── Activate couple when partner joins ───────────────────────

CREATE OR REPLACE FUNCTION public.activate_couple_on_join()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN
  -- When user_b_id is set for the first time, mark couple active
  IF OLD.user_b_id IS NULL AND NEW.user_b_id IS NOT NULL THEN
    NEW.status = 'active';
  END IF;
  RETURN NEW;
END;
$$;

CREATE TRIGGER trg_activate_couple
  BEFORE UPDATE ON public.couples
  FOR EACH ROW EXECUTE FUNCTION public.activate_couple_on_join();

-- ── Performance indexes ──────────────────────────────────────

CREATE INDEX idx_couples_user_a         ON public.couples (user_a_id);
CREATE INDEX idx_couples_user_b         ON public.couples (user_b_id);
CREATE INDEX idx_couples_invite_code    ON public.couples (invite_code);

CREATE INDEX idx_dates_couple           ON public.dates (couple_id, scheduled_at DESC);
CREATE INDEX idx_dates_created_by       ON public.dates (created_by);

CREATE INDEX idx_date_journals_date     ON public.date_journals (date_id);
CREATE INDEX idx_journals_user          ON public.journals (user_id, created_at DESC);
CREATE INDEX idx_journals_couple        ON public.journals (couple_id, created_at DESC);

CREATE INDEX idx_wish_items_couple      ON public.wish_items (couple_id);
CREATE INDEX idx_wish_items_user        ON public.wish_items (user_id);

CREATE INDEX idx_check_ins_couple       ON public.check_ins (couple_id, checked_in_at DESC);
CREATE INDEX idx_love_level_history     ON public.love_level_history (couple_id, recorded_at DESC);

CREATE INDEX idx_push_notif_recipient   ON public.push_notifications (recipient_id, created_at DESC);
