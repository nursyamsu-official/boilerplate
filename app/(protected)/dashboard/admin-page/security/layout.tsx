import { SecurityNav } from "@/features/security";

export default function SecurityLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-6">
      <SecurityNav />
      {children}
    </div>
  );
}
