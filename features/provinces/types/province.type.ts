import type { ProvinceFilterInput } from "../schemas/province-filter.schema";

export type ProvinceTableRow = {
  id: string;
  countryId: string;
  countryName: string;
  code: string;
  name: string;
  description: string | null;
  isActive: boolean;
  districtCount: number;
  createdAt: Date;
  updatedAt: Date;
};

export type ProvinceListResult = {
  items: ProvinceTableRow[];
  total: number;
  page: number;
  pageSize: number;
};

export type ProvinceDetail = {
  id: string;
  countryId: string;
  code: string;
  name: string;
  description: string | null;
  isActive: boolean;
};

export type ProvinceFormValues = {
  countryId: string;
  code: string;
  name: string;
  description: string | null;
  isActive: boolean;
};

export type ProvinceListFilters = ProvinceFilterInput;

export type ProvinceOption = {
  id: string;
  code: string;
  name: string;
  countryId: string;
};
