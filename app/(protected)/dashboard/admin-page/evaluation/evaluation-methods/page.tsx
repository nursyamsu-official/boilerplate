import type { Metadata } from "next";

import { appConfig } from "@/config/app.config";
import {
  EvaluationMethodManagement,
  parseEvaluationMethodFilter,
  evaluationMethodGetListService,
} from "@/features/evaluation-methods";

export const metadata: Metadata = {
  title: `Evaluation Methods | ${appConfig.appName}`,
  description: `Evaluation Methods | ${appConfig.description}`,
};

type EvaluationMethodsPageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export default async function EvaluationMethodsPage({
  searchParams,
}: EvaluationMethodsPageProps) {
  const resolvedSearchParams = await searchParams;
  const filters = parseEvaluationMethodFilter(resolvedSearchParams);
  const initialData = await evaluationMethodGetListService(filters);

  return (
    <EvaluationMethodManagement initialData={initialData} initialFilters={filters} />
  );
}
