import type { CountryFilterInput } from "../schemas/country-filter.schema";

export type CountryTableRow = {
  id: string;
  code: string;
  name: string;
  description: string | null;
  isActive: boolean;
  provinceCount: number;
  createdAt: Date;
  updatedAt: Date;
};

export type CountryListResult = {
  items: CountryTableRow[];
  total: number;
  page: number;
  pageSize: number;
};

export type CountryDetail = {
  id: string;
  code: string;
  name: string;
  description: string | null;
  isActive: boolean;
};

export type CountryFormValues = {
  code: string;
  name: string;
  description: string | null;
  isActive: boolean;
};

export type CountryListFilters = CountryFilterInput;

export type CountryOption = {
  id: string;
  code: string;
  name: string;
};
