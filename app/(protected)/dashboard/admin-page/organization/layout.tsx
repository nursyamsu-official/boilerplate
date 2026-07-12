import { OrganizationNav } from "@/features/organization";

export default function OrganizationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-6">
      <OrganizationNav />
      {children}
    </div>
  );
}
