import type { DistrictFilterInput } from "../schemas/district-filter.schema";

export type DistrictTableRow = {
  id: string;
  provinceId: string;
  provinceName: string;
  countryName: string;
  code: string;
  name: string;
  description: string | null;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
};

export type DistrictListResult = {
  items: DistrictTableRow[];
  total: number;
  page: number;
  pageSize: number;
};

export type DistrictDetail = {
  id: string;
  provinceId: string;
  countryId: string;
  code: string;
  name: string;
  description: string | null;
  isActive: boolean;
};

export type DistrictFormValues = {
  countryId: string;
  provinceId: string;
  code: string;
  name: string;
  description: string | null;
  isActive: boolean;
};

export type DistrictListFilters = DistrictFilterInput;
