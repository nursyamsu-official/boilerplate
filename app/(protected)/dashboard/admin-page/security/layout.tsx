import { SecurityNav } from "@/features/security";

export default function SecurityLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <div className="mb-6 flex flex-col gap-2">
        <h1 className="text-2xl font-bold">Security</h1>
        <p className="text-sm text-muted-foreground">
          Manage sessions, two-factor authentication, API keys, and audit logs.
        </p>
      </div>
      <SecurityNav />
      <div className="mt-6">{children}</div>
    </div>
  );
}
