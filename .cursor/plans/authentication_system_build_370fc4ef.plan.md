---
name: Authentication System Build
overview: Build a complete authentication system using Better Auth with email/password sign-up/sign-in, Google OAuth, email verification, forgot/reset password, change password, remember me, dynamic Navbar, and Next.js middleware -- all following the PRD and the project's feature-based architecture.
todos:
  - id: infra-email
    content: Install resend, create lib/email.ts, update .env.example
    status: completed
  - id: infra-auth-server
    content: Enhance lib/auth.ts with email verification, password reset, session config
    status: completed
  - id: infra-auth-client
    content: Enhance lib/auth-client.ts with additional exports
    status: completed
  - id: infra-middleware
    content: Create middleware.ts for route protection and redirects
    status: completed
  - id: feature-schemas
    content: Create all Zod validation schemas in features/auth/schemas/
    status: completed
  - id: feature-forms
    content: Build all auth form components (SignUp, SignIn, ForgotPassword, ResetPassword, ChangePassword, VerifyEmailInfo, VerifyEmail, GoogleSignInButton)
    status: completed
  - id: feature-index
    content: Create features/auth/index.ts public export
    status: completed
  - id: navbar
    content: Build dynamic Navbar and UserMenu components
    status: completed
  - id: layouts
    content: Create auth layout, public layout, and protected layout
    status: completed
  - id: route-pages
    content: Create all thin route pages under app/auth/ and app/(protected)/settings/
    status: completed
  - id: verify-wiring
    content: Run Better Auth CLI generate, verify Prisma schema, test end-to-end
    status: completed
isProject: false
---

# Authentication System Build Plan

## Current State

- Better Auth server config exists at [`lib/auth.ts`](lib/auth.ts) with basic email/password + Google OAuth, but no email verification, no forgot password, no session tuning
- Better Auth client at [`lib/auth-client.ts`](lib/auth-client.ts) with basic exports
- Prisma schema has User, Session, Account, Verification models (ready for Better Auth)
- API catch-all route at [`app/api/auth/[...all]/route.ts`](app/api/auth/[...all]/route.ts) is wired
- **No auth pages**, **no middleware**, **no Navbar**, **no `features/` directory**, **no `(public)` or `(protected)` layouts**

## Key Design Decisions

- **Inline messages only** for all auth pages (per PRD) -- no toast/sonner on auth forms
- **Resend** for transactional emails (verification + password reset)
- **Feature-based architecture**: all auth UI/schemas live in `features/auth/`
- **Route pages are thin**: they import and render feature components
- Auth forms are **client components** calling Better Auth's client API directly (no server actions needed -- Better Auth handles persistence)
- **Dynamic Navbar** in `components/navbar/` shared across public and protected layouts

---

## Phase 1: Infrastructure (Server Config, Email, Middleware)

### 1.1 Install Resend

```bash
npm install resend
```

Update [`.env.example`](.env.example) to add `RESEND_API_KEY` and `EMAIL_FROM`.

### 1.2 Create email utility: `lib/email.ts`

A thin wrapper around Resend for sending transactional emails. Used by `lib/auth.ts` for verification and password reset emails.

```typescript
import { Resend } from "resend";
const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendEmail({
  to,
  subject,
  html,
}: {
  to: string;
  subject: string;
  html: string;
}) {
  await resend.emails.send({
    from: process.env.EMAIL_FROM!,
    to,
    subject,
    html,
  });
}
```

### 1.3 Enhance [`lib/auth.ts`](lib/auth.ts)

Add the following to the existing Better Auth config:

- `emailVerification.sendVerificationEmail` -- calls `sendEmail` with verification link
- `emailVerification.sendOnSignUp: true`
- `emailAndPassword.requireEmailVerification: true`
- `emailAndPassword.sendResetPassword` -- calls `sendEmail` with reset link
- `emailAndPassword.resetPasswordTokenExpiresIn: 1800` (30 minutes per PRD)
- `emailAndPassword.minPasswordLength: 8`
- `emailAndPassword.autoSignIn: false` (redirect to verify-email-info after sign-up)
- Session config: default `expiresIn: 60 * 60 * 24 * 7` (7 days), extended to 30 days for "Remember Me"

### 1.4 Enhance [`lib/auth-client.ts`](lib/auth-client.ts)

Add additional exports needed by auth forms:

```typescript
export const {
  signIn,
  signOut,
  signUp,
  useSession,
  getSession,
  forgetPassword,
  resetPassword,
  changePassword,
  sendVerificationEmail,
} = authClient;
```

### 1.5 Create middleware: `middleware.ts` (project root)

Using `getSessionCookie` from `better-auth/cookies`:

- `/auth/*` pages: if session cookie exists, redirect to `/dashboard`
- `/dashboard/*` and `/settings/*` routes: if no session cookie, redirect to `/auth/sign-in`

```typescript
import { NextRequest, NextResponse } from "next/server";
import { getSessionCookie } from "better-auth/cookies";

export async function middleware(request: NextRequest) {
  const session = getSessionCookie(request);
  const { pathname } = request.nextUrl;
  if (session && pathname.startsWith("/auth")) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }
  if (
    !session &&
    (pathname.startsWith("/dashboard") || pathname.startsWith("/settings"))
  ) {
    return NextResponse.redirect(new URL("/auth/sign-in", request.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/auth/:path*", "/dashboard/:path*", "/settings/:path*"],
};
```

---

## Phase 2: Feature Module (`features/auth/`)

### 2.1 Validation Schemas (`features/auth/schemas/`)

Each schema uses Zod:

| File                        | Fields                                                         |
| --------------------------- | -------------------------------------------------------------- |
| `sign-up.schema.ts`         | name, email, password, confirmPassword (with refine for match) |
| `sign-in.schema.ts`         | email, password, rememberMe (boolean)                          |
| `forgot-password.schema.ts` | email                                                          |
| `reset-password.schema.ts`  | password, confirmPassword (with refine)                        |
| `change-password.schema.ts` | currentPassword, newPassword, confirmNewPassword (with refine) |

### 2.2 Auth Form Components (`features/auth/components/`)

All forms are `"use client"` components using controlled state (React `useState`). Each form:

- Calls Better Auth client API directly (`signUp.email`, `signIn.email`, `signIn.social`, `forgetPassword`, `resetPassword`, `changePassword`)
- Validates with Zod schema before submission
- Shows **inline error/success messages** below the form (not toast)
- Disables the submit button during loading with label change (e.g., "Signing up...")
- Uses shadcn `Card`, `Input`, `Button`, `Label` components

| Component                | Route                            | Key Behavior                                                                                                                                      |
| ------------------------ | -------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------- |
| `SignUpForm.tsx`         | `/auth/sign-up`                  | name, email, password, confirmPassword; on success redirect to `/auth/verify-email-info`                                                          |
| `SignInForm.tsx`         | `/auth/sign-in`                  | email, password, "Remember Me" checkbox, Google button; on success redirect to `/dashboard`; inline errors for invalid creds / unverified account |
| `ForgotPasswordForm.tsx` | `/auth/forgot-password`          | email; on success redirect to `/auth/forgot-password/success`                                                                                     |
| `ResetPasswordForm.tsx`  | `/auth/reset-password?token=xxx` | newPassword, confirmPassword; reads token from URL; on success redirect to `/auth/reset-password/success`                                         |
| `ChangePasswordForm.tsx` | `/settings/change-password`      | currentPassword, newPassword, confirmNewPassword; inline success/error messages                                                                   |
| `VerifyEmailInfo.tsx`    | `/auth/verify-email-info`        | informational message + "Resend Verification Email" button                                                                                        |
| `VerifyEmail.tsx`        | `/auth/verify-email?token=xxx`   | auto-verifies token on mount; shows loading/success/error inline                                                                                  |
| `GoogleSignInButton.tsx` | Reused in SignInForm             | calls `signIn.social({ provider: "google" })`                                                                                                     |

### 2.3 Public export: `features/auth/index.ts`

Re-exports all components and schemas.

---

## Phase 3: Layouts and Navbar

### 3.1 Auth Layout: `app/auth/layout.tsx`

Minimal centered layout for auth pages -- logo/app name at top, centered card, no Navbar. Clean and focused.

### 3.2 Public Layout: `app/(public)/layout.tsx`

Wraps public pages with the dynamic Navbar and Footer placeholder.

### 3.3 Protected Layout: `app/(protected)/layout.tsx`

Wraps protected pages with the dynamic Navbar (showing user menu).

### 3.4 Dynamic Navbar: `components/navbar/`

- `Navbar.tsx` -- main component, uses `useSession()` to determine auth state
  - Not logged in: shows app name/logo + nav links + "Sign In" / "Sign Up" buttons
  - Logged in: shows app name/logo + nav links + user avatar/name dropdown (settings, sign out)
  - Mobile: hamburger icon that opens a sheet/drawer with navigation items
- `UserMenu.tsx` -- dropdown menu for authenticated users (Settings, Change Password, Sign Out)

Both are `"use client"` components since they use `useSession()`.

---

## Phase 4: Route Pages (Thin)

All route pages are **server components** that import and render the feature component inside a layout.

| Route                           | Page File                                           | Renders                                 |
| ------------------------------- | --------------------------------------------------- | --------------------------------------- |
| `/auth/sign-up`                 | `app/auth/sign-up/page.tsx`                         | `<SignUpForm />`                        |
| `/auth/sign-in`                 | `app/auth/sign-in/page.tsx`                         | `<SignInForm />`                        |
| `/auth/forgot-password`         | `app/auth/forgot-password/page.tsx`                 | `<ForgotPasswordForm />`                |
| `/auth/forgot-password/success` | `app/auth/forgot-password/success/page.tsx`         | Static success message + CTA            |
| `/auth/reset-password`          | `app/auth/reset-password/page.tsx`                  | `<ResetPasswordForm />`                 |
| `/auth/reset-password/success`  | `app/auth/reset-password/success/page.tsx`          | Static success message + CTA to sign-in |
| `/auth/verify-email-info`       | `app/auth/verify-email-info/page.tsx`               | `<VerifyEmailInfo />`                   |
| `/auth/verify-email`            | `app/auth/verify-email/page.tsx`                    | `<VerifyEmail />`                       |
| `/auth/verify-success`          | `app/auth/verify-success/page.tsx`                  | Static success message + CTA to sign-in |
| `/settings/change-password`     | `app/(protected)/settings/change-password/page.tsx` | `<ChangePasswordForm />`                |

---

## Phase 5: Verification and Wiring

- Run `npx @better-auth/cli@latest generate` to ensure Prisma schema is in sync
- Run `npx prisma migrate dev` if schema changes are needed
- Verify all routes work end-to-end
- Ensure middleware redirects are correct

---

## File Map Summary

```
lib/
  auth.ts                         (MODIFY - add email verification, reset, session config)
  auth-client.ts                  (MODIFY - add forgetPassword, resetPassword, changePassword exports)
  email.ts                        (CREATE - Resend email utility)

middleware.ts                     (CREATE - route protection)

features/auth/
  schemas/
    sign-up.schema.ts             (CREATE)
    sign-in.schema.ts             (CREATE)
    forgot-password.schema.ts     (CREATE)
    reset-password.schema.ts      (CREATE)
    change-password.schema.ts     (CREATE)
  components/
    SignUpForm.tsx                 (CREATE)
    SignInForm.tsx                 (CREATE)
    ForgotPasswordForm.tsx        (CREATE)
    ResetPasswordForm.tsx         (CREATE)
    ChangePasswordForm.tsx        (CREATE)
    VerifyEmailInfo.tsx           (CREATE)
    VerifyEmail.tsx               (CREATE)
    GoogleSignInButton.tsx        (CREATE)
  index.ts                        (CREATE)

components/navbar/
  Navbar.tsx                      (CREATE)
  UserMenu.tsx                    (CREATE)

app/auth/
  layout.tsx                      (CREATE - centered card layout)
  sign-up/page.tsx                (CREATE)
  sign-in/page.tsx                (CREATE)
  forgot-password/page.tsx        (CREATE)
  forgot-password/success/page.tsx (CREATE)
  reset-password/page.tsx         (CREATE)
  reset-password/success/page.tsx (CREATE)
  verify-email-info/page.tsx      (CREATE)
  verify-email/page.tsx           (CREATE)
  verify-success/page.tsx         (CREATE)

app/(public)/layout.tsx           (CREATE - with Navbar)
app/(protected)/layout.tsx        (CREATE - with Navbar)
app/(protected)/settings/
  change-password/page.tsx        (CREATE)

.env.example                      (MODIFY - add RESEND_API_KEY, EMAIL_FROM)
```

**Total: ~30 files (3 modified, ~27 created)**
