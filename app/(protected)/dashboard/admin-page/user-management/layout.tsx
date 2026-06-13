import { UserManagementNav } from "@/features/user-management";

export default function UserManagementLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <div className="mb-6 flex flex-col gap-2">
        <h1 className="text-2xl font-bold">User Management</h1>
        <p className="text-sm text-muted-foreground">
          Manage users, roles, permissions, and login activity.
        </p>
      </div>
      <UserManagementNav />
      <div className="mt-6">{children}</div>
    </div>
  );
}
