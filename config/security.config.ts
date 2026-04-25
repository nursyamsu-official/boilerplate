export const securityConfig = {
  duration: {
    emailVerificationExpiresInSec: 60 * 60, // 1 hour
    sessionExpiresInSec: 60 * 60 * 24 * 7, // 7 days
    updateAgeInSec: 60 * 60 * 24, // 24 hours
    resetPasswordTokenExpiresInSec: 60 * 30, // 30 minutes
  },
} satisfies SecurityConfig;

export type SecurityConfig = {
  duration: {
    emailVerificationExpiresInSec: number;
    sessionExpiresInSec: number;
    updateAgeInSec: number;
    resetPasswordTokenExpiresInSec: number;
  };
};
