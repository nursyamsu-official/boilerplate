import type { CompanyFilterInput } from "../schemas/company-filter.schema";

export type CompanyTableRow = {
  id: string;
  code: string;
  name: string;
  description: string | null;
  isActive: boolean;
  unitCount: number;
  createdAt: Date;
  updatedAt: Date;
};

export type CompanyListResult = {
  items: CompanyTableRow[];
  total: number;
  page: number;
  pageSize: number;
};

export type CompanyDetail = {
  id: string;
  code: string;
  name: string;
  description: string | null;
  isActive: boolean;
};

export type CompanyFormValues = {
  code: string;
  name: string;
  description: string | null;
  isActive: boolean;
};

export type CompanyListFilters = CompanyFilterInput;

export type CompanyOption = {
  id: string;
  code: string;
  name: string;
};
