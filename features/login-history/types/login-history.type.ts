import type { LoginHistoryFilterInput } from "../schemas/login-history-filter.schema";

export type LoginHistoryStatus = "SUCCESS" | "FAILED";

export type LoginHistoryUserSummary = {
  id: string;
  name: string;
  email: string;
};

export type LoginHistoryTableRow = {
  id: string;
  userId: string | null;
  email: string;
  status: LoginHistoryStatus;
  failureReason: string | null;
  ipAddress: string | null;
  userAgent: string | null;
  createdAt: Date;
  user: LoginHistoryUserSummary | null;
};

export type LoginHistoryListResult = {
  items: LoginHistoryTableRow[];
  total: number;
  page: number;
  pageSize: number;
};

export type LoginHistoryListFilters = LoginHistoryFilterInput;
