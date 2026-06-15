-- Ensure bookings.phone_number is stored as TEXT, never a numeric type.
-- A numeric column would silently strip leading zeros and the leading "+"
-- of a country code (e.g. "+910000000000" -> 910000000000). Storing as text
-- preserves the value exactly as entered.
--
-- Safe to run repeatedly: ALTER ... TYPE text is a no-op if already text.
-- Run in the Supabase SQL Editor (or via your migration tooling).

alter table public.bookings
  alter column phone_number type text
  using phone_number::text;

-- Optional: reject empty/whitespace-only phone numbers at the DB level.
-- alter table public.bookings
--   add constraint bookings_phone_number_not_blank
--   check (length(btrim(phone_number)) > 0);
