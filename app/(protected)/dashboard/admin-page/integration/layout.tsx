import { IntegrationNav } from "@/features/integration";

export default function IntegrationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-6">
      <IntegrationNav />
      {children}
    </div>
  );
}
