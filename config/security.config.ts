export const securityConfig = {
  duration: {
    emailVerificationExpiresInSec: 60 * 60, // 1 hour
    sessionExpiresInSec: 60 * 60 * 24 * 7, // 7 days
    updateAgeInSec: 60 * 60 * 24, // 24 hours
    resetPasswordTokenExpiresInSec: 60 * 60, // 1 hour
    emailChangeTokenExpiresInSec: 60 * 60, // 1 hour
    twoFactorChallengeExpiresInSec: 60 * 10, // 10 minutes
    twoFactorOtpExpiresInMin: 5, // 5 minutes
  },
} satisfies SecurityConfig;

export type SecurityConfig = {
  duration: {
    emailVerificationExpiresInSec: number;
    sessionExpiresInSec: number;
    updateAgeInSec: number;
    resetPasswordTokenExpiresInSec: number;
    emailChangeTokenExpiresInSec: number;
    twoFactorChallengeExpiresInSec: number;
    twoFactorOtpExpiresInMin: number;
  };
};
