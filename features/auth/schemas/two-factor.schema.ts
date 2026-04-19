import { z } from "zod";

export const otpSchema = z.object({
  code: z.string().length(6, "Code must be 6 digits"),
});

export type OtpInput = z.infer<typeof otpSchema>;

export const backupCodeSchema = z.object({
  code: z.string().min(1, "Backup code is required"),
});

export type BackupCodeInput = z.infer<typeof backupCodeSchema>;

export const twoFactorPasswordSchema = z.object({
  password: z.string().min(1, "Password is required"),
});

export type TwoFactorPasswordInput = z.infer<typeof twoFactorPasswordSchema>;
