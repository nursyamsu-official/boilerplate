import { z } from "zod";

export const userStatusValues = ["ACTIVE", "INACTIVE", "BANNED"] as const;

const usernameSchema = z
  .string()
  .trim()
  .max(100, "Username must be at most 100 characters")
  .regex(
    /^[a-zA-Z0-9_]*$/,
    "Username must use letters, numbers, and underscores only",
  )
  .nullable()
  .optional();

const phoneNumberSchema = z
  .string()
  .trim()
  .max(30, "Phone number must be at most 30 characters")
  .nullable()
  .optional();

export const userFormFieldsSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "Name is required")
    .max(150, "Name must be at most 150 characters"),
  email: z
    .string()
    .trim()
    .email("Invalid email address")
    .max(255, "Email must be at most 255 characters"),
  username: usernameSchema,
  phoneNumber: phoneNumberSchema,
  status: z.enum(userStatusValues),
  roleIds: z.array(z.string().uuid("Invalid role id")),
});

export const userCreateFormFieldsSchema = userFormFieldsSchema.extend({
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .max(128, "Password must be at most 128 characters"),
});

export const userCreateSchema = userCreateFormFieldsSchema.transform((values) => ({
  ...values,
  email: values.email.toLowerCase(),
  username: values.username?.trim() ? values.username.trim() : null,
  phoneNumber: values.phoneNumber?.trim() ? values.phoneNumber.trim() : null,
}));

export const userUpdateSchema = userFormFieldsSchema
  .extend({
    id: z.string().min(1, "Invalid user id"),
  })
  .transform((values) => ({
    ...values,
    email: values.email.toLowerCase(),
    username: values.username?.trim() ? values.username.trim() : null,
    phoneNumber: values.phoneNumber?.trim() ? values.phoneNumber.trim() : null,
  }));

export const userDeleteSchema = z.object({
  id: z.string().min(1, "Invalid user id"),
});

export const userSetStatusSchema = z.object({
  id: z.string().min(1, "Invalid user id"),
  status: z.enum(userStatusValues),
});

export type UserCreateInput = z.infer<typeof userCreateSchema>;
export type UserUpdateInput = z.infer<typeof userUpdateSchema>;
export type UserSetStatusInput = z.infer<typeof userSetStatusSchema>;
