-- Row Level Security for the owner-only admin dashboard.
--
-- The public booking form inserts rows anonymously (anon role). The admin
-- dashboard reads/updates/deletes them as an authenticated user. This script
-- grants the `authenticated` role full access to `bookings` while leaving the
-- existing anonymous INSERT policy untouched.
--
-- Run this once in the Supabase SQL Editor. It is idempotent (safe to re-run).
--
-- Columns used by the dashboard actions (add them if missing):
--   status        text default 'pending'   -- 'pending' | 'confirmed' | 'cancelled'
--   confirmed_at  timestamptz
--   cancelled_at  timestamptz

-- Ensure RLS is on (it already is if anon inserts are policy-gated).
alter table public.bookings enable row level security;

-- Backfill: make sure status has a sane default and existing rows are 'pending'.
alter table public.bookings
  alter column status set default 'pending';
update public.bookings set status = 'pending' where status is null;

-- Authenticated owner can read every booking.
drop policy if exists "admin_select_bookings" on public.bookings;
create policy "admin_select_bookings"
  on public.bookings for select
  to authenticated
  using (true);

-- Authenticated owner can update bookings (confirm / cancel).
drop policy if exists "admin_update_bookings" on public.bookings;
create policy "admin_update_bookings"
  on public.bookings for update
  to authenticated
  using (true)
  with check (true);

-- Authenticated owner can delete bookings.
drop policy if exists "admin_delete_bookings" on public.bookings;
create policy "admin_delete_bookings"
  on public.bookings for delete
  to authenticated
  using (true);
