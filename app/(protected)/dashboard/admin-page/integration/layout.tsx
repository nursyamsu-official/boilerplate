export default function IntegrationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-bold">Integration</h1>
        <p className="text-sm text-muted-foreground">
          Manage webhooks, delivery logs, and SSO configuration.
        </p>
      </div>
      {children}
    </div>
  );
}
