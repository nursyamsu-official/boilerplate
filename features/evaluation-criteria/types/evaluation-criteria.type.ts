import type { EvaluationCriteriaFilterInput } from "../schemas/evaluation-criteria-filter.schema";

export type EvaluationCriteriaTableRow = {
  id: string;
  templateId: string;
  templateName: string;
  code: string;
  name: string;
  description: string | null;
  weight: number;
  maxScore: number | null;
  sortOrder: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
};

export type EvaluationCriteriaListResult = {
  items: EvaluationCriteriaTableRow[];
  total: number;
  page: number;
  pageSize: number;
};

export type EvaluationCriteriaDetail = {
  id: string;
  templateId: string;
  code: string;
  name: string;
  description: string | null;
  weight: number;
  maxScore: number | null;
  sortOrder: number;
  isActive: boolean;
};

export type EvaluationCriteriaFormValues = {
  templateId: string;
  code: string;
  name: string;
  description: string | null;
  weight: number;
  maxScore: number | null;
  sortOrder: number;
  isActive: boolean;
};

export type EvaluationCriteriaListFilters = EvaluationCriteriaFilterInput;

export type EvaluationCriteriaOption = {
  id: string;
  code: string;
  name: string;
  templateId: string;
};
