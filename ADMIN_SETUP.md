# Admin Dashboard Setup

The owner-only dashboard lives at **`/admin`** and is protected by Supabase
Authentication. There is exactly one owner account.

## 1. Apply Row Level Security

Open the **Supabase SQL Editor** and run [`scripts/admin-rls.sql`](scripts/admin-rls.sql).
This grants the authenticated owner read/update/delete access to `bookings`
while leaving the public form's anonymous INSERT untouched. RLS — not the route
guard — is the real security boundary.

## 2. Create the owner account

In the Supabase dashboard → **Authentication → Users → Add user**:

1. Click **Add user → Create new user**.
2. Enter the owner's email and a strong password. Tick **Auto Confirm User**.

Then lock the door so nobody else can register:

- **Authentication → Providers → Email**: turn **Allow new users to sign up**
  **off** (disable public signups). Only the owner you created can log in.

## 3. Log in

Visit `/admin`. Unauthenticated visitors are redirected to `/admin/login`.
Sign in with the owner credentials to reach the dashboard.

## Environment variables

No new variables are required — the dashboard reuses the existing
`NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY`.
