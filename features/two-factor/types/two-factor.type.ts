import type { TwoFactorFilterInput } from "../schemas/two-factor-filter.schema";

export type TwoFactorUserSummary = {
  id: string;
  name: string;
  email: string;
  twoFactorEnabled: boolean | null;
};

export type TwoFactorTableRow = {
  id: string;
  userId: string;
  verified: boolean;
  user: TwoFactorUserSummary;
};

export type TwoFactorListResult = {
  items: TwoFactorTableRow[];
  total: number;
  page: number;
  pageSize: number;
};

export type TwoFactorListFilters = TwoFactorFilterInput;
