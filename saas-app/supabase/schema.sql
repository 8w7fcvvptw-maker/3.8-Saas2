-- Run this in the Supabase SQL editor (or via migrations) before using the app.

-- Items owned by auth.users
create table if not exists public.items (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  title text not null check (char_length(title) > 0 and char_length(title) <= 500),
  created_at timestamptz not null default now()
);

create index if not exists items_user_id_created_at_idx
  on public.items (user_id, created_at desc);

alter table public.items enable row level security;

-- SELECT: only rows for the signed-in user
create policy "items_select_own"
  on public.items
  for select
  to authenticated
  using (auth.uid() = user_id);

-- INSERT: row must belong to the signed-in user
create policy "items_insert_own"
  on public.items
  for insert
  to authenticated
  with check (auth.uid() = user_id);

-- DELETE: only own rows
create policy "items_delete_own"
  on public.items
  for delete
  to authenticated
  using (auth.uid() = user_id);

-- Optional: allow updates if you add PATCH later
-- create policy "items_update_own" on public.items for update to authenticated
--   using (auth.uid() = user_id) with check (auth.uid() = user_id);
