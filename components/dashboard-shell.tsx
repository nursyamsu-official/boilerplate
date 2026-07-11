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
        <header className="sticky top-0 z-50 flex h-16 shrink-0 items-center gap-2 border-b bg-background px-4">
          <DashboardHeader menuTree={menuTree} />
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">{children}</div>
      </SidebarInset>
    </SidebarProvider>
  );
}
