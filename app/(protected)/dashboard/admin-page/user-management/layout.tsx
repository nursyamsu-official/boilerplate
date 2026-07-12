import { UserManagementNav } from "@/features/user-management";

export default function UserManagementLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-6">
      <UserManagementNav />
      {children}
    </div>
  );
}
