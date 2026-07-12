import { AddressNav } from "@/features/address";

export default function AddressLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-6">
      <AddressNav />
      {children}
    </div>
  );
}
