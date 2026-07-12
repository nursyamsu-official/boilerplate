"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";

const navItems = [
  {
    href: "/dashboard/admin-page/product-attribute/product-types",
    label: "Product Types",
  },
  {
    href: "/dashboard/admin-page/product-attribute/product-groups",
    label: "Product Groups",
  },
  {
    href: "/dashboard/admin-page/product-attribute/product-categories",
    label: "Product Categories",
  },
  {
    href: "/dashboard/admin-page/product-attribute/products",
    label: "Products",
  },
] as const;

export function ProductAttributeNav() {
  const pathname = usePathname();

  return (
    <nav className="flex flex-wrap gap-1 border-b pb-4">
      {navItems.map((item) => {
        const isActive = pathname === item.href;

        return (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "rounded-md px-3 py-1.5 text-sm font-medium transition-colors",
              isActive
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:bg-muted hover:text-foreground",
            )}
          >
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}
