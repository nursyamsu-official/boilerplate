"use client";

import { AppSidebar } from "@/components/app-sidebar";
import { DashboardHeader } from "@/components/dashboard-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import type {
  NavigationMenuTreeNode,
  NavigationUser,
} from "@/features/navigation";

import { ModeToggle } from "@/components/ui/toggle-theme";

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
    <SidebarProvider className="h-svh overflow-hidden">
      <AppSidebar appName={appName} menuTree={menuTree} user={user} />
      <SidebarInset className="flex min-h-0 min-w-0 flex-1 flex-col overflow-hidden">
        <header className="flex h-16 shrink-0 items-center gap-2 border-b bg-background px-4">
          <div className="flex w-full items-center justify-between gap-2">
            <DashboardHeader menuTree={menuTree} />
            <ModeToggle />
          </div>
        </header>
        <div className="flex min-h-0 min-w-0 flex-1 flex-col gap-4 overflow-auto p-4">
          {children}
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
