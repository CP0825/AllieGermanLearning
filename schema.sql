-- ===========================================================================
-- Deutsch für Allie — Supabase schema
-- Paste this whole file into the Supabase SQL editor and run it once.
--
-- SECURITY NOTE: This is a *private, single-user* app (a personal gift, no
-- sensitive data). RLS is enabled on every table, but the policies below give
-- the anonymous role full access. That is an intentional trade-off for a
-- one-person app — do NOT copy this pattern into a real multi-user product.
-- ===========================================================================

create extension if not exists "pgcrypto";

-- ---- Tables ---------------------------------------------------------------

create table if not exists profile (
  id             uuid primary key default gen_random_uuid(),
  display_name   text default 'Allie',
  xp             int default 0,
  streak_count   int default 0,
  longest_streak int default 0,
  last_active    date,
  daily_goal     int default 20,
  sound_enabled  boolean default true,
  created_at     timestamptz default now()
);

create table if not exists categories (
  id         uuid primary key default gen_random_uuid(),
  name       text not null,
  emoji      text,
  created_at timestamptz default now()
);

create table if not exists cards (
  id            uuid primary key default gen_random_uuid(),
  category_id   uuid references categories(id) on delete set null,
  german        text not null,
  english       text not null,
  article       text,
  emoji         text,
  example       text,
  ease_factor   real default 2.5,
  "interval"    int default 0,      -- quoted: INTERVAL is a reserved word
  repetitions   int default 0,
  due_date      date default current_date,
  last_reviewed timestamptz,
  created_at    timestamptz default now()
);

create table if not exists activity_log (
  id         uuid primary key default gen_random_uuid(),
  section    text not null,
  is_correct boolean,
  xp_earned  int default 0,
  detail     jsonb,
  created_at timestamptz default now()
);

create table if not exists daily_stats (
  day       date primary key,
  exercises int default 0,
  correct   int default 0,
  xp        int default 0
);

-- Speeds up the "cards due today" query.
create index if not exists cards_due_idx on cards (due_date);

-- ---- Row Level Security ---------------------------------------------------

alter table profile      enable row level security;
alter table categories   enable row level security;
alter table cards        enable row level security;
alter table activity_log enable row level security;
alter table daily_stats  enable row level security;

-- Permissive anon policy on every table (see security note at top).
do $$
declare t text;
begin
  foreach t in array array['profile','categories','cards','activity_log','daily_stats']
  loop
    execute format('drop policy if exists "anon_all" on %I;', t);
    execute format(
      'create policy "anon_all" on %I for all to anon using (true) with check (true);', t);
  end loop;
end $$;
