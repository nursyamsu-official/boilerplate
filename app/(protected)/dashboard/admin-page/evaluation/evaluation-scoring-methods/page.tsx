import type { Metadata } from "next";

import { appConfig } from "@/config/app.config";
import {
  EvaluationScoringMethodManagement,
  parseEvaluationScoringMethodFilter,
  evaluationScoringMethodGetListService,
} from "@/features/evaluation-scoring-methods";

export const metadata: Metadata = {
  title: `Scoring Methods | ${appConfig.appName}`,
  description: `Scoring Methods | ${appConfig.description}`,
};

type EvaluationScoringMethodsPageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export default async function EvaluationScoringMethodsPage({
  searchParams,
}: EvaluationScoringMethodsPageProps) {
  const resolvedSearchParams = await searchParams;
  const filters = parseEvaluationScoringMethodFilter(resolvedSearchParams);
  const initialData = await evaluationScoringMethodGetListService(filters);

  return (
    <EvaluationScoringMethodManagement
      initialData={initialData}
      initialFilters={filters}
    />
  );
}
