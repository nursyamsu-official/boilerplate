"use client";

import { AppSidebar } from "@/components/app-sidebar";
import { DashboardHeader } from "@/components/dashboard-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import type {
  NavigationMenuTreeNode,
  NavigationUser,
} from "@/features/navigation";

type DashboardShellProps = {
  appName: string;
  menuTree: NavigationMenuTreeNode[];
  user: NavigationUser;
  children: React.ReactNode;
};

export function DashboardShell({
  appName,
  menuTree,
  user,
  children,
}: DashboardShellProps) {
  return (
    <SidebarProvider>
      <AppSidebar appName={appName} menuTree={menuTree} user={user} />
      <SidebarInset>
        <DashboardHeader menuTree={menuTree} />
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">{children}</div>
      </SidebarInset>
    </SidebarProvider>
  );
}
