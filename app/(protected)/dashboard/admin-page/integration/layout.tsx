import { IntegrationNav } from "@/features/integration";

export default function IntegrationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <div className="mb-6 flex flex-col gap-2">
        <h1 className="text-2xl font-bold">Integration</h1>
        <p className="text-sm text-muted-foreground">
          Manage webhooks, delivery logs, and SSO configuration.
        </p>
      </div>
      <IntegrationNav />
      <div className="mt-6">{children}</div>
    </div>
  );
}
