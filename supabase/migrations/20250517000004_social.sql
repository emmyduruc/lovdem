-- ============================================================
-- SOCIAL: check-ins, badges, push notification log
-- ============================================================

-- Periodic love-level check-ins logged for history and streaks.
CREATE TABLE public.check_ins (
  id            UUID     PRIMARY KEY DEFAULT gen_random_uuid(),
  couple_id     UUID     NOT NULL REFERENCES public.couples(id)  ON DELETE CASCADE,
  user_id       TEXT     NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  love_level    SMALLINT NOT NULL CHECK (love_level BETWEEN 0 AND 100),
  note          TEXT,
  checked_in_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ──────────────────────────────────────────────────────────────

-- Relationship milestone badges — one row per badge per couple.
-- Using (couple_id, key) as PK prevents duplicate awards.
CREATE TABLE public.badges (
  couple_id UUID NOT NULL REFERENCES public.couples(id) ON DELETE CASCADE,
  key       TEXT NOT NULL,    -- e.g. "first_date", "30_day_streak"
  earned_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

  PRIMARY KEY (couple_id, key)
);

-- ──────────────────────────────────────────────────────────────

-- Audit log for every push notification sent or attempted.
-- The Edge Function writes here after calling Expo Push API.
-- The `data` column carries the deep-link payload the client
-- uses to navigate when the user taps the notification.
CREATE TABLE public.push_notifications (
  id           UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  recipient_id TEXT        NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,

  -- Maps to NotificationEvent['type'] in the TypeScript layer
  type         TEXT        NOT NULL,

  title        TEXT        NOT NULL,
  body         TEXT        NOT NULL,

  -- Deep-link payload: { "pathname": "/dates/[id]", "params": { "id": "..." } }
  data         JSONB       NOT NULL DEFAULT '{}'::jsonb,

  status       TEXT        NOT NULL DEFAULT 'pending'
                 CHECK (status IN ('pending', 'sent', 'failed')),

  -- Expo error message when status = 'failed'
  error        TEXT,

  sent_at      TIMESTAMPTZ,
  created_at   TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Index for the Edge Function queue processor
CREATE INDEX idx_push_notifications_status
  ON public.push_notifications (status, created_at)
  WHERE status = 'pending';
