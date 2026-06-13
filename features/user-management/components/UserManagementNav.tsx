"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";

const navItems = [
  { href: "/dashboard/admin-page/user-management/users", label: "Users" },
  { href: "/dashboard/admin-page/user-management/roles", label: "Roles" },
  {
    href: "/dashboard/admin-page/user-management/permissions",
    label: "Permissions",
  },
  {
    href: "/dashboard/admin-page/user-management/permission-modules",
    label: "Permission Modules",
  },
  {
    href: "/dashboard/admin-page/user-management/login-history",
    label: "Login History",
  },
] as const;

export function UserManagementNav() {
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
