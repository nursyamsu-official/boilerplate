import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { nextCookies } from "better-auth/next-js";
import { twoFactor } from "better-auth/plugins";

import { prisma } from "@/lib/prisma";
import { sendEmail } from "@/lib/email";
import { securityConfig } from "@/config/security.config";
import { formatDurationCombined } from "@/lib/utils";

export const auth = betterAuth({
  baseURL: process.env.BETTER_AUTH_URL,
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  user: {
    deleteUser: {
      enabled: true,
    },
  },
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: true,
    autoSignIn: false,
    minPasswordLength: 8,
    maxPasswordLength: 128,
    resetPasswordTokenExpiresIn:
      securityConfig.duration.resetPasswordTokenExpiresInSec,
    sendResetPassword: async ({ user, url }) => {
      await sendEmail({
        to: user.email,
        subject: "Reset your password",
        html: `
          <h2>Reset Your Password</h2>
          <p>Hi ${user.name},</p>
          <p>You requested to reset your password. Click the link below to set a new password:</p>
          <p><a href="${url}">Reset Password</a></p>
          <p>This link will expire in 30 minutes.</p>
          <p>If you didn't request this, you can safely ignore this email.</p>
        `,
      });
    },
    onExistingUserSignUp: async ({ user }) => {
      const baseUrl = process.env.BETTER_AUTH_URL;
      const signInUrl = `${baseUrl}/auth/sign-in`;
      const resetUrl = `${baseUrl}/auth/forgot-password`;

      await sendEmail({
        to: user.email,
        subject: "Sign-up attempt with your email",
        html: `
          <h2>Someone tried to sign up using your email</h2>
          <p>Hi ${user.name ?? ""},</p>
          <p>We received a new sign-up request using this email address, but you already have an account with us.</p>
          <p>If this was you, please <a href="${signInUrl}">sign in here</a>.</p>
          <p>If you forgot your password, you can <a href="${resetUrl}">reset it</a>.</p>
          <p>If this wasn't you, no action is needed &mdash; your account is safe.</p>
        `,
      });
    },
  },
  emailVerification: {
    sendOnSignUp: true,
    autoSignInAfterVerification: false,
    expiresIn: securityConfig.duration.emailVerificationExpiresInSec,
    sendVerificationEmail: async ({ user, token }) => {
      const verificationUrl = `${process.env.BETTER_AUTH_URL}/auth/verify-email?token=${token}`;
      const expiryLabel = formatDurationCombined(
        securityConfig.duration.emailVerificationExpiresInSec,
      );

      await sendEmail({
        to: user.email,
        subject: "Verify your email address",
        html: `
          <h2>Verify Your Email</h2>
          <p>Hi ${user.name},</p>
          <p>Thank you for signing up. Please verify your email address by clicking the link below:</p>
          <p><a href="${verificationUrl}">Verify Email</a></p>
          <p>If you didn't create an account, you can safely ignore this email.</p>
          <p>This link will expire in ${expiryLabel}.</p>
        `,
      });
    },
  },
  session: {
    expiresIn: securityConfig.duration.sessionExpiresInSec,
    updateAge: securityConfig.duration.updateAgeInSec,
  },
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    },
  },
  databaseHooks: {
    user: {
      update: {
        before: async (userData, ctx) => {
          if (userData.email) {
            const userId = ctx?.context?.user?.id;
            if (userId) {
              const existingUser = await prisma.user.findUnique({
                where: { id: userId },
                select: { email: true },
              });
              (ctx as Record<string, unknown>)._previousEmail =
                existingUser?.email;
            }
          }
          return { data: userData };
        },
        after: async (user, ctx) => {
          const previousEmail = (ctx as Record<string, unknown>)
            ?._previousEmail as string | undefined;
          if (previousEmail && previousEmail !== user.email) {
            await prisma.session.deleteMany({
              where: { userId: user.id },
            });
          }
        },
      },
    },
  },
  advanced: {
    ipAddress: {
      ipAddressHeaders: ["x-forwarded-for", "x-real-ip"],
    },
  },
  plugins: [
    nextCookies(),
    twoFactor({
      otpOptions: {
        async sendOTP({ user, otp }) {
          await sendEmail({
            to: user.email,
            subject: "Your verification code",
            html: `
              <h2>Two-Factor Authentication</h2>
              <p>Hi ${user.name},</p>
              <p>Your verification code is: <strong>${otp}</strong></p>
              <p>This code will expire in 5 minutes.</p>
              <p>If you didn't request this code, please ignore this email.</p>
            `,
          });
        },
        period: 5,
        digits: 6,
        allowedAttempts: 5,
        storeOTP: "encrypted",
      },
      backupCodeOptions: {
        amount: 10,
        length: 10,
        storeBackupCodes: "encrypted",
      },
      skipVerificationOnEnable: true,
    }),
  ],
});

export type Session = typeof auth.$Infer.Session;
export type User = Session["user"];
