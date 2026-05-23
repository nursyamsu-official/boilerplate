---
name: dynamic reset password expiry label
overview: Replace the hardcoded "30 minutes" text in the reset password email with a dynamic label derived from `securityConfig.duration.resetPasswordTokenExpiresInSec`, mirroring how `sendVerificationEmail` already handles its expiry text.
todos:
  - id: update-reset-password-email
    content: In lib/auth.ts sendResetPassword, derive expiryLabel from securityConfig.duration.resetPasswordTokenExpiresInSec via formatDurationCombined and replace the hardcoded "30 minutes" in the email body with ${expiryLabel}.
    status: completed
isProject: false
---

# Dynamic Reset Password Expiry Label

## Goal

Keep the reset password email body in sync with the configured token lifetime, so changing `resetPasswordTokenExpiresInSec` in [config/security.config.ts](config/security.config.ts) automatically updates the user-facing expiry text.

## Why

Currently in [lib/auth.ts](lib/auth.ts) the email reads:

```37:38:lib/auth.ts
        <p><a href="${url}">Reset Password</a></p>
        <p>This link will expire in 30 minutes.</p>
```

If the config value changes, the email text silently lies. The verification email (lines 66-84) already does this correctly using `formatDurationCombined` — we just need to mirror that pattern.

## Reusable pieces already in place

- `formatDurationCombined` in [lib/utils.ts](lib/utils.ts) (lines 19-39) — already produces human strings like `"30 minutes"`, `"1 hour"`, `"1 hour 30 minutes"`.
- `securityConfig` is already imported in [lib/auth.ts](lib/auth.ts) (line 8).
- `formatDurationCombined` is already imported in [lib/auth.ts](lib/auth.ts) (line 9).

So no new imports are needed.

## Change

In [lib/auth.ts](lib/auth.ts), inside the `sendResetPassword` handler (lines 29-42):

1. Compute the expiry label from the config, identical in style to lines 68-70:

   ```ts
   const expiryLabel = formatDurationCombined(
     securityConfig.duration.resetPasswordTokenExpiresInSec,
   );
   ```

2. Replace the hardcoded text with the interpolated label:

   ```html
   <p>This link will expire in ${expiryLabel}.</p>
   ```

That is the entire change — one local `const` and one template literal swap.

## Result

- 1800 sec config -> "30 minutes"
- 3600 sec config -> "1 hour"
- 5400 sec config -> "1 hour 30 minutes"

No other files need to change. No new tests are required (none exist for this handler today), and the function is already used the same way for verification emails.
