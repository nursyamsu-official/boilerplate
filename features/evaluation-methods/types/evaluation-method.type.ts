import type { EvaluationMethodFilterInput } from "../schemas/evaluation-method-filter.schema";

export type EvaluationMethodTableRow = {
  id: string;
  code: string;
  name: string;
  description: string | null;
  isActive: boolean;
  templateCount: number;
  createdAt: Date;
  updatedAt: Date;
};

export type EvaluationMethodListResult = {
  items: EvaluationMethodTableRow[];
  total: number;
  page: number;
  pageSize: number;
};

export type EvaluationMethodDetail = {
  id: string;
  code: string;
  name: string;
  description: string | null;
  isActive: boolean;
};

export type EvaluationMethodFormValues = {
  code: string;
  name: string;
  description: string | null;
  isActive: boolean;
};

export type EvaluationMethodListFilters = EvaluationMethodFilterInput;

export type EvaluationMethodOption = {
  id: string;
  code: string;
  name: string;
};
