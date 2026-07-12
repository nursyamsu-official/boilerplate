import { EvaluationNav } from "@/features/evaluation";

export default function EvaluationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-6">
      <EvaluationNav />
      {children}
    </div>
  );
}
