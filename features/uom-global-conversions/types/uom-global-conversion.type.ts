import type { UomGlobalConversionFilterInput } from "../schemas/uom-global-conversion-filter.schema";

export type UomGlobalConversionTableRow = {
  id: string;
  fromUomId: string;
  fromUomCode: string;
  fromUomName: string;
  toUomId: string;
  toUomCode: string;
  toUomName: string;
  conversionFactor: number;
  description: string | null;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
};

export type UomGlobalConversionListResult = {
  items: UomGlobalConversionTableRow[];
  total: number;
  page: number;
  pageSize: number;
};

export type UomGlobalConversionDetail = {
  id: string;
  fromUomId: string;
  toUomId: string;
  conversionFactor: number;
  description: string | null;
  isActive: boolean;
};

export type UomGlobalConversionFormValues = {
  fromUomId: string;
  toUomId: string;
  conversionFactor: number;
  description: string | null;
  isActive: boolean;
};

export type UomGlobalConversionListFilters = UomGlobalConversionFilterInput;
