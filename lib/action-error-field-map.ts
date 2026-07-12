const ACTION_ERROR_FIELD_MAP: Record<string, string> = {
  "Template code already exists": "code",
  "Role code already exists": "code",
  "Menu code already exists": "code",
  "Permission code already exists": "code",
  "Module code already exists": "code",
  "Company code already exists": "code",
  "Provider code already exists": "code",
  "Email already exists": "email",
  "Username already exists": "username",
  "This external ID is already linked to the provider": "externalId",
  "Parent menu not found": "parentId",
  "A menu cannot be its own parent": "parentId",
  "A menu cannot be nested under its own descendant": "parentId",
  "Permission module not found": "moduleId",
  "Invalid expiration date": "expiresAt",
};

export function resolveFieldForActionError(message: string): string | undefined {
  return ACTION_ERROR_FIELD_MAP[message];
}
