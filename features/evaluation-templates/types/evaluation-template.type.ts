import type { EvaluationTemplateFilterInput } from "../schemas/evaluation-template-filter.schema";

export type EvaluationTemplateTableRow = {
  id: string;
  code: string;
  name: string;
  description: string | null;
  evaluationMethodId: string;
  methodName: string;
  evaluationScoringMethodId: string;
  scoringMethodName: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
};

export type EvaluationTemplateListResult = {
  items: EvaluationTemplateTableRow[];
  total: number;
  page: number;
  pageSize: number;
};

export type EvaluationTemplateDetail = {
  id: string;
  code: string;
  name: string;
  description: string | null;
  evaluationMethodId: string;
  evaluationScoringMethodId: string;
  isActive: boolean;
};

export type EvaluationTemplateFormValues = {
  code: string;
  name: string;
  description: string | null;
  evaluationMethodId: string;
  evaluationScoringMethodId: string;
  isActive: boolean;
};

export type EvaluationTemplateListFilters = EvaluationTemplateFilterInput;

export type EvaluationTemplateOption = {
  id: string;
  code: string;
  name: string;
};
