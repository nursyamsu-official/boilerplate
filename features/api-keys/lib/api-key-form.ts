import type { ApiKeyFilterInput } from "../schemas/api-key.schema";
import type { ApiKeyFormValues } from "../types/api-key.type";

export function buildApiKeyListUrl(filters: ApiKeyFilterInput): string {
  const params = new URLSearchParams();

  if (filters.search) {
    params.set("search", filters.search);
  }

  params.set("page", String(filters.page));
  params.set("pageSize", String(filters.pageSize));
  params.set("sortBy", filters.sortBy);
  params.set("sortOrder", filters.sortOrder);

  if (filters.status !== "all") {
    params.set("status", filters.status);
  }

  const query = params.toString();
  return query
    ? `/dashboard/admin-page/security/api-keys?${query}`
    : "/dashboard/admin-page/security/api-keys";
}

export const defaultApiKeyFormValues: ApiKeyFormValues = {
  userId: "",
  name: "",
  description: "",
  scopes: "",
  expiresAt: "",
  isActive: true,
};

export function mapApiKeyDetailToFormValues(
  apiKey: {
    userId: string;
    name: string;
    description: string | null;
    scopes: string | null;
    expiresAt: Date | null;
    isActive: boolean;
  },
): ApiKeyFormValues {
  return {
    userId: apiKey.userId,
    name: apiKey.name,
    description: apiKey.description ?? "",
    scopes: apiKey.scopes ?? "",
    expiresAt: apiKey.expiresAt
      ? apiKey.expiresAt.toISOString().slice(0, 10)
      : "",
    isActive: apiKey.isActive,
  };
}

export function mapFormValuesToCreateInput(values: ApiKeyFormValues) {
  return {
    userId: values.userId,
    name: values.name,
    description: values.description,
    scopes: values.scopes,
    expiresAt: values.expiresAt,
    isActive: values.isActive,
  };
}

export function mapFormValuesToUpdateInput(id: string, values: ApiKeyFormValues) {
  return {
    id,
    ...mapFormValuesToCreateInput(values),
    isActive: values.isActive,
  };
}
