---
name: Unified Settings Page
overview: Consolidate the separate `/settings/change-password` and `/settings/two-factor` routes into a single unified Account Settings page at `/dashboard/settings` with tab-based navigation via query params (profile, security, sessions), matching the provided screenshots.
todos:
  - id: auth-config
    content: Enable deleteUser in lib/auth.ts and export new client methods from lib/auth-client.ts
    status: completed
  - id: route-page
    content: Create app/(protected)/dashboard/settings/page.tsx thin route page
    status: completed
  - id: account-settings
    content: Create AccountSettings.tsx main component with tab switching via useSearchParams
    status: completed
  - id: profile-tab
    content: Create ProfileTab.tsx with Update Name, Update Email, and Delete Account sections
    status: completed
  - id: security-tab
    content: Create SecurityTab.tsx with Password, 2FA, and Connected Accounts sections
    status: completed
  - id: sessions-tab
    content: Create SessionsTab.tsx with active sessions list and revoke capability
    status: completed
  - id: update-navigation
    content: Update UserMenu.tsx and Navbar.tsx navigation links to /dashboard/settings
    status: completed
  - id: update-proxy
    content: Update proxy.ts to remove /settings matcher
    status: completed
  - id: cleanup
    content: Delete old settings routes and update features/auth/index.ts exports
    status: completed
isProject: false
---

# Unified Account Settings Page

## Current State

- Two separate settings routes: `/settings/change-password` and `/settings/two-factor`
- Each renders a standalone component from `features/auth`
- Navigation in [UserMenu.tsx](components/navbar/UserMenu.tsx) and [Navbar.tsx](components/navbar/Navbar.tsx) links to these separate pages
- [proxy.ts](proxy.ts) protects `/settings` as a separate route group

## Target State

A single page at `/dashboard/settings` with 3 tabs controlled by `?tab=` query param:

- `/dashboard/settings` -- Profile tab (default)
- `/dashboard/settings?tab=security` -- Security tab
- `/dashboard/settings?tab=sessions` -- Sessions tab

Profile picture upload is **skipped** for now.

---

## 1. Enable Better Auth features on the server

In [lib/auth.ts](lib/auth.ts), add the `user.deleteUser` config to enable account deletion. Also export `listSessions`, `revokeSession`, `updateUser`, `deleteUser`, `changeEmail`, `listAccounts`, `unlinkAccount`, `linkSocial` from [lib/auth-client.ts](lib/auth-client.ts).

```ts
// auth.ts - add to betterAuth config:
user: {
  deleteUser: {
    enabled: true,
  },
},
```

```ts
// auth-client.ts - add additional exports:
export const {
  signIn,
  signOut,
  signUp,
  useSession,
  getSession,
  requestPasswordReset,
  resetPassword,
  changePassword,
  sendVerificationEmail,
  twoFactor,
  updateUser,
  changeEmail,
  deleteUser,
  listSessions,
  revokeSession,
  revokeOtherSessions,
  listAccounts,
  unlinkAccount,
  linkSocial,
} = authClient;
```

---

## 2. Create the route page

Create [app/(protected)/dashboard/settings/page.tsx](<app/(protected)/dashboard/settings/page.tsx>) as a thin server component that renders the feature-owned `AccountSettings` component.

```tsx
import type { Metadata } from "next";
import { appConfig } from "@/config/app.config";
import { AccountSettings } from "@/features/auth";

export const metadata: Metadata = {
  title: `Account Settings | ${appConfig.appName}`,
  description: `Account Settings | ${appConfig.description}`,
};

export default function SettingsPage() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-8">
      <AccountSettings />
    </div>
  );
}
```

---

## 3. Create Account Settings components

All new components live in `features/auth/components/`.

### AccountSettings.tsx (main client component)

- Uses `useSearchParams` to read `?tab=` (wrapped in `Suspense`)
- Renders heading "Account Settings" with Shadcn `Tabs` component (variant="line")
- Three tabs: Profile, Security, Sessions
- Tab change updates the URL via `router.push` / `router.replace`
- Each tab renders its corresponding content component

### ProfileTab.tsx

Based on screenshots (skipping profile picture):

- **Update your Name** section: input field with current name, "Update Profile" button
  - Uses `authClient.updateUser({ name })`
- **Update your Email** section: disabled current email field + new email input, "Update Email Address" button
  - Uses `authClient.changeEmail({ newEmail })`
- **Danger Zone** section: red-bordered card, "Delete your Account" with confirmation dialog
  - Uses `authClient.deleteUser()`

### SecurityTab.tsx

Based on screenshots:

- **Password section**: Two modes
  - Has password: Shows `UpdatePasswordForm` (current password, new password, confirm) with visibility toggles
  - No password (OAuth only): Shows message + "Set password" button that calls `requestPasswordReset`
  - Detect mode by checking if user has a credential account via `authClient.listAccounts()`
- **Two-Factor Authentication section**: Embeds existing `TwoFactorSettings` component (remove outer Card wrapper or keep as-is since it already uses Card)
- **Connected accounts section**: Lists linked social providers (Google), with Connect/Disconnect buttons
  - Uses `authClient.listAccounts()`, `authClient.unlinkAccount()`, `authClient.linkSocial()`

### SessionsTab.tsx

Based on screenshots:

- **Active Sessions** section: Lists all sessions with user agent + IP
- Current session is labeled "Current session"
- Other sessions show "Other session" with an X button to revoke
- Uses `authClient.listSessions()` and `authClient.revokeSession()`

---

## 4. Update existing components

### ChangePasswordForm.tsx

The existing component is a standalone Card. For the Security tab, we need a version that renders as a section within the tab (with Card wrapper matching the screenshots). The existing component can be adapted or a new `UpdatePasswordSection` can be created within `SecurityTab.tsx` that reuses the validation schema.

---

## 5. Update navigation

### [UserMenu.tsx](components/navbar/UserMenu.tsx)

- Replace `/settings/change-password` with `/dashboard/settings`
- Replace `/settings/two-factor` with `/dashboard/settings?tab=security`
- Update icons and labels: "Change Password" -> "Settings", "Two-Factor Auth" -> can be removed or kept as "Security"

### [Navbar.tsx](components/navbar/Navbar.tsx)

- Replace `/settings/change-password` with `/dashboard/settings`
- Update label from "Change Password" to "Settings"

---

## 6. Update proxy.ts

In [proxy.ts](proxy.ts):

- Remove `/settings` from the unauthenticated redirect check (line 14)
- Remove `/settings/:path*` from the matcher (line 23)
- Settings now live under `/dashboard/settings` which is already covered by the `/dashboard` matcher

---

## 7. Clean up old routes

- Delete `app/(protected)/settings/change-password/page.tsx`
- Delete `app/(protected)/settings/two-factor/page.tsx`
- Remove the `app/(protected)/settings/` directory entirely

---

## 8. Update feature exports

In [features/auth/index.ts](features/auth/index.ts), add the new `AccountSettings` export.

---

## File Summary

| Action | File                                                |
| ------ | --------------------------------------------------- |
| Create | `app/(protected)/dashboard/settings/page.tsx`       |
| Create | `features/auth/components/AccountSettings.tsx`      |
| Create | `features/auth/components/ProfileTab.tsx`           |
| Create | `features/auth/components/SecurityTab.tsx`          |
| Create | `features/auth/components/SessionsTab.tsx`          |
| Edit   | `lib/auth.ts` (enable deleteUser)                   |
| Edit   | `lib/auth-client.ts` (export new methods)           |
| Edit   | `features/auth/index.ts` (export AccountSettings)   |
| Edit   | `components/navbar/UserMenu.tsx` (update links)     |
| Edit   | `components/navbar/Navbar.tsx` (update links)       |
| Edit   | `proxy.ts` (remove /settings matcher)               |
| Delete | `app/(protected)/settings/change-password/page.tsx` |
| Delete | `app/(protected)/settings/two-factor/page.tsx`      |
