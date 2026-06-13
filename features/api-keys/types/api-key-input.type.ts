export type ApiKeyCreateInput = {
  userId: string;
  name: string;
  description?: string;
  scopes?: string;
  expiresAt?: string;
  isActive?: boolean;
};

export type ApiKeyUpdateInput = ApiKeyCreateInput & {
  id: string;
  isActive: boolean;
};
