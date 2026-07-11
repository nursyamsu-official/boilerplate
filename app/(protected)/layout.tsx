import { headers } from "next/headers";
import { redirect } from "next/navigation";

import { DashboardShell } from "@/components/dashboard-shell";
import { NotAuthorized } from "@/components/not-authorized";
import { appConfig } from "@/config/app.config";
import {
  canAccessMenuPath,
  collectNavigationPaths,
} from "@/features/navigation";
import { getActiveMenuPaths } from "@/features/navigation/services/menu-active-paths.service";
import { getUserNavigationMenuTree } from "@/features/navigation/services/user-menu-get-tree.service";
import { auth } from "@/lib/auth";

export default async function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const requestHeaders = await headers();
  const session = await auth.api.getSession({ headers: requestHeaders });

  if (!session?.user) {
    redirect("/auth/sign-in");
  }

  const pathname = requestHeaders.get("x-pathname") ?? "/dashboard";
  const menuTree = await getUserNavigationMenuTree(session.user.id);
  const allowedPaths = collectNavigationPaths(menuTree);
  const allMenuPaths = await getActiveMenuPaths();
  const canAccess = canAccessMenuPath(pathname, allowedPaths, allMenuPaths);

  return (
    <DashboardShell
      appName={appConfig.appName}
      menuTree={menuTree}
      user={{
        name: session.user.name,
        email: session.user.email,
        image: session.user.image,
      }}
    >
      {canAccess ? children : <NotAuthorized />}
    </DashboardShell>
  );
}
