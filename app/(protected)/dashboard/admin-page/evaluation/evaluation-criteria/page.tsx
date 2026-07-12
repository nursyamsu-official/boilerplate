import type { Metadata } from "next";

import { appConfig } from "@/config/app.config";
import {
  EvaluationCriteriaManagement,
  parseEvaluationCriteriaFilter,
  evaluationCriteriaGetListService,
} from "@/features/evaluation-criteria";
import { evaluationTemplateOptionsService } from "@/features/evaluation-templates";

export const metadata: Metadata = {
  title: `Evaluation Criteria | ${appConfig.appName}`,
  description: `Evaluation Criteria | ${appConfig.description}`,
};

type EvaluationCriteriaPageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export default async function EvaluationCriteriaPage({
  searchParams,
}: EvaluationCriteriaPageProps) {
  const resolvedSearchParams = await searchParams;
  const filters = parseEvaluationCriteriaFilter(resolvedSearchParams);

  const [initialData, templateOptions] = await Promise.all([
    evaluationCriteriaGetListService(filters),
    evaluationTemplateOptionsService(),
  ]);

  return (
    <EvaluationCriteriaManagement
      initialData={initialData}
      initialFilters={filters}
      templateOptions={templateOptions}
    />
  );
}
