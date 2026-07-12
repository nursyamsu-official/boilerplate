import { ProductAttributeNav } from "@/features/product-attribute";

export default function ProductAttributeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-6">
      <ProductAttributeNav />
      {children}
    </div>
  );
}
