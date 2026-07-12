import type { Metadata } from "next";

import { appConfig } from "@/config/app.config";
import { evaluationMethodOptionsService } from "@/features/evaluation-methods";
import {
  EvaluationTemplateManagement,
  parseEvaluationTemplateFilter,
  evaluationTemplateGetListService,
} from "@/features/evaluation-templates";
import { evaluationScoringMethodOptionsService } from "@/features/evaluation-scoring-methods";

export const metadata: Metadata = {
  title: `Evaluation Templates | ${appConfig.appName}`,
  description: `Evaluation Templates | ${appConfig.description}`,
};

type EvaluationTemplatesPageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export default async function EvaluationTemplatesPage({
  searchParams,
}: EvaluationTemplatesPageProps) {
  const resolvedSearchParams = await searchParams;
  const filters = parseEvaluationTemplateFilter(resolvedSearchParams);

  const [initialData, methodOptions, scoringMethodOptions] = await Promise.all([
    evaluationTemplateGetListService(filters),
    evaluationMethodOptionsService(),
    evaluationScoringMethodOptionsService(),
  ]);

  return (
    <EvaluationTemplateManagement
      initialData={initialData}
      initialFilters={filters}
      methodOptions={methodOptions}
      scoringMethodOptions={scoringMethodOptions}
    />
  );
}
