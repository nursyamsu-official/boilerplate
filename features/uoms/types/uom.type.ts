import type { UomFilterInput } from "../schemas/uom-filter.schema";
import type { UOM_TYPE_VALUES } from "../constants/uom.constants";

export type UomTypeValue = (typeof UOM_TYPE_VALUES)[number];

export type UomTableRow = {
  id: string;
  code: string;
  name: string;
  symbol: string | null;
  description: string | null;
  uomType: UomTypeValue;
  decimalPlaces: number;
  isActive: boolean;
  conversionCount: number;
  createdAt: Date;
  updatedAt: Date;
};

export type UomListResult = {
  items: UomTableRow[];
  total: number;
  page: number;
  pageSize: number;
};

export type UomDetail = {
  id: string;
  code: string;
  name: string;
  symbol: string | null;
  description: string | null;
  uomType: UomTypeValue;
  decimalPlaces: number;
  isActive: boolean;
};

export type UomFormValues = {
  code: string;
  name: string;
  symbol: string | null;
  description: string | null;
  uomType: UomTypeValue;
  decimalPlaces: number;
  isActive: boolean;
};

export type UomListFilters = UomFilterInput;

export type UomOption = {
  id: string;
  code: string;
  name: string;
  symbol: string | null;
};
