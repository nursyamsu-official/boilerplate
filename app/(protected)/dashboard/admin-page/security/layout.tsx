export default function SecurityLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-bold">Security</h1>
        <p className="text-sm text-muted-foreground">
          Manage sessions, two-factor authentication, API keys, and audit logs.
        </p>
      </div>
      {children}
    </div>
  );
}
