-- ============================================================
-- CORE: profiles + user_settings
-- profiles.id is a TEXT to support both Firebase Auth UIDs
-- and Clerk user IDs (non-UUID string formats).
-- ============================================================

CREATE TABLE public.profiles (
  id          TEXT        PRIMARY KEY,           -- Firebase UID / Clerk user ID
  phone       TEXT        UNIQUE,                -- set for phone-auth users
  first_name  TEXT        NOT NULL,
  avatar_url  TEXT,
  birthday    DATE,
  push_token  TEXT,                              -- Expo push token for notifications
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ──────────────────────────────────────────────────────────────

CREATE TABLE public.user_settings (
  user_id     TEXT PRIMARY KEY REFERENCES public.profiles(id) ON DELETE CASCADE,

  -- Master switch; overrides all individual prefs when false
  notifications_enabled BOOLEAN NOT NULL DEFAULT TRUE,

  -- Per-event opt-in/out stored as JSONB for easy extension
  notification_prefs JSONB NOT NULL DEFAULT '{
    "partner_joined":      true,
    "date_planned":        true,
    "date_reminder":       true,
    "date_completed":      true,
    "journal_shared":      true,
    "love_level_updated":  true,
    "wish_fulfilled":      true,
    "wish_added":          false,
    "badge_earned":        true,
    "check_in_reminder":   true
  }'::jsonb,

  theme       TEXT NOT NULL DEFAULT 'system' CHECK (theme IN ('light', 'dark', 'system')),
  updated_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
