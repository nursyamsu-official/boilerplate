---
name: centralize 2fa ttl config
overview: Wire the two distinct 2FA verification-row TTLs (sign-in challenge cookie vs OTP code) through `config/security.config.ts`, and remove the silent-zero hazard in the OTP minute conversion by switching the OTP field to minutes.
todos:
  - id: update-config
    content: "Update config/security.config.ts: add twoFactorChallengeExpiresInSec, rename twoFactorOtpExpiresInSec to twoFactorOtpExpiresInMin, update SecurityConfig type"
    status: completed
  - id: wire-auth
    content: "Update lib/auth.ts: pass twoFactorCookieMaxAge from new config, switch period to minutes, fix email expiry label to multiply minutes by 60"
    status: completed
  - id: repo-sweep
    content: Grep repo for remaining twoFactorOtpExpiresInSec references and migrate them to the new minute-based field
    status: completed
isProject: false
---

## Background

Two Better Auth verification rows have different TTLs because they come from two different plugin options:

- `2fa-{rand}` row (default 10 min) comes from `twoFactor({ twoFactorCookieMaxAge })` in `node_modules/better-auth/dist/plugins/two-factor/index.mjs` lines 202-209.
- `2fa-otp-{key}` row (5 min today) comes from `twoFactor({ otpOptions: { period } })` in `node_modules/better-auth/dist/plugins/two-factor/otp/index.mjs` lines 22-28, 77-81. `period` is interpreted as **minutes**.

The OTP TTL is already routed through `securityConfig`. The challenge TTL is not, so it silently falls back to the 600 sec default.

## Changes

### 1. `config/security.config.ts`

- Add `twoFactorChallengeExpiresInSec` (seconds) for the 2FA sign-in challenge cookie/verification row.
- Rename `twoFactorOtpExpiresInSec` -> `twoFactorOtpExpiresInMin` (minutes) to match Better Auth's `otpOptions.period` unit and eliminate the `Math.floor(sec/60)` foot-gun. Update the `SecurityConfig` type accordingly.

Final shape:

```ts
export const securityConfig = {
  duration: {
    emailVerificationExpiresInSec: 60 * 60,
    sessionExpiresInSec: 60 * 60 * 24 * 7,
    updateAgeInSec: 60 * 60 * 24,
    resetPasswordTokenExpiresInSec: 60 * 60,
    emailChangeTokenExpiresInSec: 60 * 60,
    twoFactorChallengeExpiresInSec: 60 * 10, // 10 min cookie/verification window
    twoFactorOtpExpiresInMin: 5, // OTP code lifetime
  },
} satisfies SecurityConfig;
```

### 2. `lib/auth.ts`

- Pass `twoFactorCookieMaxAge: securityConfig.duration.twoFactorChallengeExpiresInSec` to the `twoFactor({ ... })` plugin (currently missing, see lines 134-168).
- Replace the `period: Math.floor(securityConfig.duration.twoFactorOtpExpiresInSec / 60)` expression at lines 155-157 with `period: securityConfig.duration.twoFactorOtpExpiresInMin`.
- Update the OTP email body helper that prints the expiry label. Today `formatDurationCombined(securityConfig.duration.twoFactorOtpExpiresInSec)` is used at line 139-141; after the rename it must compute seconds from minutes (e.g. `formatDurationCombined(securityConfig.duration.twoFactorOtpExpiresInMin * 60)`).

### 3. Repo-wide rename sweep

- Search for any remaining references to `twoFactorOtpExpiresInSec` outside `config/` and `lib/auth.ts` (e.g. 2FA setup pages, hooks, emails) and update them to the new minute-based field, converting to seconds at the call site only when formatting durations.

## Acceptance checks

- New rows written to `verification`:
  - `2fa-...` row's `expiresAt - createdAt` equals `twoFactorChallengeExpiresInSec` (configurable from `security.config.ts`).
  - `2fa-otp-...` row's `expiresAt - createdAt` equals `twoFactorOtpExpiresInMin * 60` seconds.
- Email body for 2FA OTP still shows the correct human-readable expiry.
- TypeScript compiles cleanly; no stale references to `twoFactorOtpExpiresInSec`.
