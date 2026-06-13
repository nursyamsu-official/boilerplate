import type { SessionFilterInput } from "../schemas/session-filter.schema";

export type SessionUserSummary = {
  id: string;
  name: string;
  email: string;
};

export type SessionTableRow = {
  id: string;
  userId: string;
  ipAddress: string | null;
  userAgent: string | null;
  createdAt: Date;
  updatedAt: Date;
  expiresAt: Date;
  user: SessionUserSummary;
};

export type SessionListResult = {
  items: SessionTableRow[];
  total: number;
  page: number;
  pageSize: number;
};

export type SessionListFilters = SessionFilterInput;

export type SessionDetail = SessionTableRow;
