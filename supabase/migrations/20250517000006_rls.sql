-- ============================================================
-- ROW LEVEL SECURITY
-- Every table is locked down; the calling user can only read
-- or write rows they are authorised to access.
-- ============================================================

ALTER TABLE public.profiles           ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_settings      ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.couples            ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.love_codes         ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.love_levels        ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.love_level_history ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.dates              ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.date_journals      ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.journals           ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.wish_items         ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.check_ins          ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.badges             ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.push_notifications ENABLE ROW LEVEL SECURITY;

-- ── profiles ─────────────────────────────────────────────────

-- Users can read their own profile and their partner's profile
CREATE POLICY "profiles: own and partner"
  ON public.profiles FOR SELECT
  USING (
    id = public.current_user_id()
    OR id IN (
      SELECT CASE
        WHEN user_a_id = public.current_user_id() THEN user_b_id
        ELSE user_a_id
      END
      FROM public.couples
      WHERE user_a_id = public.current_user_id()
         OR user_b_id = public.current_user_id()
    )
  );

CREATE POLICY "profiles: own insert"
  ON public.profiles FOR INSERT
  WITH CHECK (id = public.current_user_id());

CREATE POLICY "profiles: own update"
  ON public.profiles FOR UPDATE
  USING (id = public.current_user_id());

-- ── user_settings ─────────────────────────────────────────────

CREATE POLICY "user_settings: own"
  ON public.user_settings FOR ALL
  USING (user_id = public.current_user_id())
  WITH CHECK (user_id = public.current_user_id());

-- ── couples ───────────────────────────────────────────────────

CREATE POLICY "couples: members can read"
  ON public.couples FOR SELECT
  USING (public.is_couple_member(id));

-- Only user_a can create the couple record
CREATE POLICY "couples: creator can insert"
  ON public.couples FOR INSERT
  WITH CHECK (user_a_id = public.current_user_id());

-- Members can update (e.g. partner joins via invite code)
CREATE POLICY "couples: members can update"
  ON public.couples FOR UPDATE
  USING (public.is_couple_member(id));

-- ── love_codes ────────────────────────────────────────────────

-- Both partners can see each other's love codes
CREATE POLICY "love_codes: couple members can read"
  ON public.love_codes FOR SELECT
  USING (public.is_couple_member(couple_id));

CREATE POLICY "love_codes: own write"
  ON public.love_codes FOR INSERT
  WITH CHECK (
    user_id = public.current_user_id()
    AND public.is_couple_member(couple_id)
  );

CREATE POLICY "love_codes: own update"
  ON public.love_codes FOR UPDATE
  USING (user_id = public.current_user_id());

-- ── love_levels & history ─────────────────────────────────────

CREATE POLICY "love_levels: couple members can read"
  ON public.love_levels FOR SELECT
  USING (public.is_couple_member(couple_id));

CREATE POLICY "love_levels: own write"
  ON public.love_levels FOR ALL
  USING (user_id = public.current_user_id())
  WITH CHECK (user_id = public.current_user_id());

CREATE POLICY "love_level_history: couple members can read"
  ON public.love_level_history FOR SELECT
  USING (public.is_couple_member(couple_id));

CREATE POLICY "love_level_history: own insert"
  ON public.love_level_history FOR INSERT
  WITH CHECK (user_id = public.current_user_id());

-- ── dates ─────────────────────────────────────────────────────

-- Shared dates: both partners see them.
-- Private dates: only the creator sees them.
CREATE POLICY "dates: shared visible to couple"
  ON public.dates FOR SELECT
  USING (
    public.is_couple_member(couple_id)
    AND (
      visibility = 'shared'
      OR created_by = public.current_user_id()
    )
  );

CREATE POLICY "dates: couple members can insert"
  ON public.dates FOR INSERT
  WITH CHECK (
    created_by = public.current_user_id()
    AND public.is_couple_member(couple_id)
  );

CREATE POLICY "dates: creator can update/delete"
  ON public.dates FOR UPDATE
  USING (created_by = public.current_user_id());

CREATE POLICY "dates: creator can delete"
  ON public.dates FOR DELETE
  USING (created_by = public.current_user_id());

-- ── date_journals ─────────────────────────────────────────────

-- Non-private entries visible to both partners; private = author only
CREATE POLICY "date_journals: read"
  ON public.date_journals FOR SELECT
  USING (
    author_id = public.current_user_id()
    OR (
      is_private = FALSE
      AND EXISTS (
        SELECT 1 FROM public.dates d
        WHERE d.id = date_id
          AND public.is_couple_member(d.couple_id)
      )
    )
  );

CREATE POLICY "date_journals: own write"
  ON public.date_journals FOR ALL
  USING (author_id = public.current_user_id())
  WITH CHECK (author_id = public.current_user_id());

-- ── journals ──────────────────────────────────────────────────

-- Same privacy rule as date_journals
CREATE POLICY "journals: read"
  ON public.journals FOR SELECT
  USING (
    user_id = public.current_user_id()
    OR (
      is_private = FALSE
      AND public.is_couple_member(couple_id)
    )
  );

CREATE POLICY "journals: own write"
  ON public.journals FOR ALL
  USING (user_id = public.current_user_id())
  WITH CHECK (user_id = public.current_user_id());

-- ── wish_items ────────────────────────────────────────────────

-- Partner can read your list so they can fulfil wishes
CREATE POLICY "wish_items: couple members can read"
  ON public.wish_items FOR SELECT
  USING (public.is_couple_member(couple_id));

CREATE POLICY "wish_items: owner can write"
  ON public.wish_items FOR INSERT
  WITH CHECK (
    user_id = public.current_user_id()
    AND public.is_couple_member(couple_id)
  );

CREATE POLICY "wish_items: owner and fulfiller can update"
  ON public.wish_items FOR UPDATE
  USING (
    user_id = public.current_user_id()
    OR (
      -- Partner can mark an item as fulfilled
      public.is_couple_member(couple_id)
      AND is_fulfilled = FALSE
    )
  );

CREATE POLICY "wish_items: owner can delete"
  ON public.wish_items FOR DELETE
  USING (user_id = public.current_user_id());

-- ── check_ins ─────────────────────────────────────────────────

CREATE POLICY "check_ins: couple members can read"
  ON public.check_ins FOR SELECT
  USING (public.is_couple_member(couple_id));

CREATE POLICY "check_ins: own insert"
  ON public.check_ins FOR INSERT
  WITH CHECK (
    user_id = public.current_user_id()
    AND public.is_couple_member(couple_id)
  );

-- ── badges ────────────────────────────────────────────────────

CREATE POLICY "badges: couple members can read"
  ON public.badges FOR SELECT
  USING (public.is_couple_member(couple_id));

-- Badges are inserted server-side by Edge Functions only
-- (service role key bypasses RLS)

-- ── push_notifications ────────────────────────────────────────

-- Users can only see their own notifications
CREATE POLICY "push_notifications: recipient can read"
  ON public.push_notifications FOR SELECT
  USING (recipient_id = public.current_user_id());

-- Inserted server-side only (service role key)
