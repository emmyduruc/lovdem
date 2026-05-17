-- ============================================================
-- CONTENT: dates, date journals, personal journals, wish list
-- ============================================================

-- Planned or completed dates for a couple.
-- visibility='private' means only the creator can see the plan
-- (surprise date idea); 'shared' means both partners see it.
CREATE TABLE public.dates (
  id              UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  couple_id       UUID        NOT NULL REFERENCES public.couples(id) ON DELETE CASCADE,
  created_by      TEXT        NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,

  title           TEXT        NOT NULL,
  description     TEXT,
  location        TEXT,
  scheduled_at    TIMESTAMPTZ,

  status          TEXT        NOT NULL DEFAULT 'planned'
                    CHECK (status IN ('planned', 'completed', 'cancelled')),

  -- Private = only creator sees this date until they reveal it
  visibility      TEXT        NOT NULL DEFAULT 'shared'
                    CHECK (visibility IN ('private', 'shared')),

  cover_image_url TEXT,

  -- Flexible tags: ["outdoor", "romantic", "budget-friendly"]
  tags            JSONB       NOT NULL DEFAULT '[]'::jsonb,
  cost_estimate   NUMERIC(10, 2),

  created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ──────────────────────────────────────────────────────────────

-- Each partner writes their own post-date journal entry.
-- One row per (date, author) pair — enforced by the unique constraint.
CREATE TABLE public.date_journals (
  id         UUID     PRIMARY KEY DEFAULT gen_random_uuid(),
  date_id    UUID     NOT NULL REFERENCES public.dates(id) ON DELETE CASCADE,
  author_id  TEXT     NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,

  content    TEXT     NOT NULL,
  mood       TEXT     CHECK (mood IN ('amazing', 'good', 'okay', 'disappointing')),
  rating     SMALLINT CHECK (rating BETWEEN 1 AND 5),

  -- Array of Supabase Storage public URLs
  images     JSONB    NOT NULL DEFAULT '[]'::jsonb,

  -- When true, partner cannot read this entry
  is_private BOOLEAN  NOT NULL DEFAULT FALSE,

  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

  UNIQUE (date_id, author_id)
);

-- ──────────────────────────────────────────────────────────────

-- Free-form personal journal not tied to a specific date.
-- is_private=true (default) keeps it visible only to the author.
CREATE TABLE public.journals (
  id         UUID    PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id    TEXT    NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  couple_id  UUID    NOT NULL REFERENCES public.couples(id)  ON DELETE CASCADE,

  title      TEXT,
  content    TEXT    NOT NULL,
  mood       TEXT    CHECK (mood IN ('amazing', 'good', 'okay', 'anxious', 'grateful', 'sad')),

  -- Array of Supabase Storage public URLs
  images     JSONB   NOT NULL DEFAULT '[]'::jsonb,

  is_private BOOLEAN NOT NULL DEFAULT TRUE,

  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ──────────────────────────────────────────────────────────────

-- A user's wish list — partner can browse and fulfil items.
CREATE TABLE public.wish_items (
  id             UUID         PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id        TEXT         NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  couple_id      UUID         NOT NULL REFERENCES public.couples(id)  ON DELETE CASCADE,

  title          TEXT         NOT NULL,
  description    TEXT,
  url            TEXT,
  image_url      TEXT,
  price_estimate NUMERIC(10, 2),

  category       TEXT         CHECK (category IN ('experience', 'gift', 'travel', 'food', 'other')),

  is_fulfilled   BOOLEAN      NOT NULL DEFAULT FALSE,
  fulfilled_by   TEXT         REFERENCES public.profiles(id) ON DELETE SET NULL,
  fulfilled_at   TIMESTAMPTZ,

  created_at     TIMESTAMPTZ  NOT NULL DEFAULT NOW()
);
