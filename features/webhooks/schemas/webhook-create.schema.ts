import { z } from "zod";

function parseEventsString(value: string): string {
  const trimmed = value.trim();
  if (!trimmed) {
    throw new Error("Events are required");
  }

  if (trimmed.startsWith("[")) {
    const parsed = JSON.parse(trimmed) as unknown;
    if (!Array.isArray(parsed) || parsed.some((item) => typeof item !== "string")) {
      throw new Error("Events must be a JSON array of strings");
    }
    return JSON.stringify(parsed);
  }

  const events = trimmed
    .split(",")
    .map((event) => event.trim())
    .filter(Boolean);

  if (events.length === 0) {
    throw new Error("Events are required");
  }

  return JSON.stringify(events);
}

function parseOptionalJson(value: string | undefined): string | null {
  const trimmed = value?.trim();
  if (!trimmed) return null;
  JSON.parse(trimmed);
  return trimmed;
}

const webhookFormFieldsBase = z.object({
  name: z
    .string()
    .trim()
    .min(1, "Name is required")
    .max(150, "Name must be at most 150 characters"),
  url: z.string().trim().url("URL must be valid"),
  events: z.string().trim().min(1, "Events are required"),
  secret: z.string().optional().or(z.literal("")),
  description: z.string().trim().max(500).optional().or(z.literal("")),
  headers: z.string().optional().or(z.literal("")),
  userId: z.string().uuid("Invalid user id").nullable(),
  isActive: z.boolean(),
  maxRetries: z.coerce.number().int().min(0).max(10),
  timeoutMs: z.coerce.number().int().min(1000).max(60000),
});

export const webhookFormFieldsSchema = webhookFormFieldsBase.superRefine(
  (values, ctx) => {
    try {
      parseEventsString(values.events);
    } catch (error) {
      ctx.addIssue({
        code: "custom",
        message:
          error instanceof Error ? error.message : "Events must be valid",
        path: ["events"],
      });
    }

    try {
      parseOptionalJson(values.headers);
    } catch {
      ctx.addIssue({
        code: "custom",
        message: "Headers must be valid JSON",
        path: ["headers"],
      });
    }
  },
);

export const webhookUpdateFormFieldsSchema = webhookFormFieldsBase.superRefine(
  (values, ctx) => {
    try {
      parseEventsString(values.events);
    } catch (error) {
      ctx.addIssue({
        code: "custom",
        message:
          error instanceof Error ? error.message : "Events must be valid",
        path: ["events"],
      });
    }

    try {
      parseOptionalJson(values.headers);
    } catch {
      ctx.addIssue({
        code: "custom",
        message: "Headers must be valid JSON",
        path: ["headers"],
      });
    }
  },
);

function mapWebhookFormValues(values: z.infer<typeof webhookFormFieldsBase>) {
  return {
    name: values.name,
    url: values.url,
    events: parseEventsString(values.events),
    secret: values.secret?.trim() ? values.secret.trim() : null,
    description: values.description?.trim() ? values.description.trim() : null,
    headers: parseOptionalJson(values.headers),
    userId: values.userId ?? null,
    isActive: values.isActive,
    maxRetries: values.maxRetries,
    timeoutMs: values.timeoutMs,
  };
}

export const webhookCreateSchema = webhookFormFieldsSchema.transform((values) =>
  mapWebhookFormValues(values),
);

export const webhookUpdateSchema = webhookUpdateFormFieldsSchema
  .extend({
    id: z.string().uuid("Invalid webhook id"),
  })
  .transform((values) => ({
    id: values.id,
    ...mapWebhookFormValues(values),
  }));

export const webhookDeleteSchema = z.object({
  id: z.string().uuid("Invalid webhook id"),
});

export type WebhookCreateInput = z.infer<typeof webhookCreateSchema>;
export type WebhookUpdateInput = z.infer<typeof webhookUpdateSchema>;
