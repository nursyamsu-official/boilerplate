import { UomNav } from "@/features/uom";

export default function UomLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-6">
      <UomNav />
      {children}
    </div>
  );
}
