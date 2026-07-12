import type { EvaluationScoringMethodFilterInput } from "../schemas/evaluation-scoring-method-filter.schema";

export type EvaluationScoringMethodTableRow = {
  id: string;
  code: string;
  name: string;
  description: string | null;
  isActive: boolean;
  templateCount: number;
  createdAt: Date;
  updatedAt: Date;
};

export type EvaluationScoringMethodListResult = {
  items: EvaluationScoringMethodTableRow[];
  total: number;
  page: number;
  pageSize: number;
};

export type EvaluationScoringMethodDetail = {
  id: string;
  code: string;
  name: string;
  description: string | null;
  isActive: boolean;
};

export type EvaluationScoringMethodFormValues = {
  code: string;
  name: string;
  description: string | null;
  isActive: boolean;
};

export type EvaluationScoringMethodListFilters = EvaluationScoringMethodFilterInput;

export type EvaluationScoringMethodOption = {
  id: string;
  code: string;
  name: string;
};
