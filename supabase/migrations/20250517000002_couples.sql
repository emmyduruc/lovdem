-- ============================================================
-- COUPLES: couple relationship, invite flow, love codes,
--          love levels (current + history)
-- ============================================================

-- The couple record is created by user_a when they complete
-- onboarding. user_b joins later via invite_code.
CREATE TABLE public.couples (
  id                      UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  user_a_id               TEXT        NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  user_b_id               TEXT        REFERENCES public.profiles(id) ON DELETE SET NULL,

  -- Short alphanumeric code shared out-of-band (SMS, copy-link)
  invite_code             TEXT        NOT NULL UNIQUE,
  invite_expires_at       TIMESTAMPTZ NOT NULL DEFAULT NOW() + INTERVAL '7 days',

  status                  TEXT        NOT NULL DEFAULT 'pending'
                            CHECK (status IN ('pending', 'active', 'paused')),

  date_freq               TEXT        NOT NULL DEFAULT 'biweekly'
                            CHECK (date_freq IN ('weekly', 'biweekly', 'monthly')),

  check_in_freq           TEXT        NOT NULL DEFAULT '3x'
                            CHECK (check_in_freq IN ('1x', '2x', '3x', 'daily')),

  relationship_level      TEXT        NOT NULL DEFAULT 'seeds'
                            CHECK (relationship_level IN ('seeds', 'budding', 'blooming', 'thriving', 'rooted')),

  relationship_start_date DATE,
  created_at              TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ──────────────────────────────────────────────────────────────

-- Each user has one love-code ranking per couple.
-- ranking is an ordered JSONB array of LoveCodeKey strings.
CREATE TABLE public.love_codes (
  user_id      TEXT  NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  couple_id    UUID  NOT NULL REFERENCES public.couples(id)  ON DELETE CASCADE,

  -- e.g. ["warmth","presence","words","actions","gestures"]
  ranking      JSONB NOT NULL,

  -- Raw quiz answers kept for analytics / future recalculation
  quiz_answers JSONB,

  updated_at   TIMESTAMPTZ NOT NULL DEFAULT NOW(),

  PRIMARY KEY (user_id, couple_id)
);

-- ──────────────────────────────────────────────────────────────

-- Current love-level snapshot — one row per user per couple.
-- Upserted on every check-in or manual adjustment.
CREATE TABLE public.love_levels (
  couple_id  UUID     NOT NULL REFERENCES public.couples(id) ON DELETE CASCADE,
  user_id    TEXT     NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  level      SMALLINT NOT NULL DEFAULT 50 CHECK (level BETWEEN 0 AND 100),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

  PRIMARY KEY (couple_id, user_id)
);

-- Full history so we can draw a progress chart over time.
CREATE TABLE public.love_level_history (
  id          UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  couple_id   UUID        NOT NULL REFERENCES public.couples(id) ON DELETE CASCADE,
  user_id     TEXT        NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  level       SMALLINT    NOT NULL CHECK (level BETWEEN 0 AND 100),
  note        TEXT,                   -- optional context ("after our trip to Rome")
  recorded_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
