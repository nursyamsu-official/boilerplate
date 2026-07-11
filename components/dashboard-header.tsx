"use client";

import { usePathname } from "next/navigation";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { findNavigationPathLabels } from "@/features/navigation";
import type { NavigationMenuTreeNode } from "@/features/navigation";

type DashboardHeaderProps = {
  menuTree: NavigationMenuTreeNode[];
};

function formatPathFallback(pathname: string) {
  const segment = pathname.split("/").filter(Boolean).at(-1);
  if (!segment) {
    return "Dashboard";
  }

  return segment
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

export function DashboardHeader({ menuTree }: DashboardHeaderProps) {
  const pathname = usePathname();
  const labels = findNavigationPathLabels(menuTree, pathname);
  const pageTitle =
    labels.length > 0 ? labels[labels.length - 1] : formatPathFallback(pathname);

  return (
    <header className="flex h-16 shrink-0 items-center gap-2 border-b">
      <div className="flex items-center gap-2 px-4">
        <SidebarTrigger className="-ml-1" />
        <Separator
          orientation="vertical"
          className="mr-2 data-vertical:h-4 data-vertical:self-auto"
        />
        <Breadcrumb>
          <BreadcrumbList>
            {labels.length > 1 ? (
              <>
                <BreadcrumbItem className="hidden md:block">
                  <span className="text-muted-foreground">
                    {labels.slice(0, -1).join(" / ")}
                  </span>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
              </>
            ) : null}
            <BreadcrumbItem>
              <BreadcrumbPage>{pageTitle}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
    </header>
  );
}
