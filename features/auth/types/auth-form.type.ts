import { z } from "zod"

import { changePasswordSchema } from "@/features/auth/schemas/change-password.schema"
import { forgotPasswordSchema } from "@/features/auth/schemas/forgot-password.schema"
import { resetPasswordSchema } from "@/features/auth/schemas/reset-password.schema"
import { signInSchema } from "@/features/auth/schemas/sign-in.schema"
import { signUpSchema } from "@/features/auth/schemas/sign-up.schema"

export type SignInValues = z.infer<typeof signInSchema>
export type SignUpValues = z.infer<typeof signUpSchema>
export type ForgotPasswordValues = z.infer<typeof forgotPasswordSchema>
export type ResetPasswordValues = z.infer<typeof resetPasswordSchema>
export type ChangePasswordValues = z.infer<typeof changePasswordSchema>
