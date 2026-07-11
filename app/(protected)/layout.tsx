import { headers } from "next/headers";
import { redirect } from "next/navigation";

import { DashboardShell } from "@/components/dashboard-shell";
import { appConfig } from "@/config/app.config";
import { getUserNavigationMenuTree } from "@/features/navigation/services/user-menu-get-tree.service";
import { auth } from "@/lib/auth";

export default async function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth.api.getSession({ headers: await headers() });

  if (!session?.user) {
    redirect("/auth/sign-in");
  }

  const menuTree = await getUserNavigationMenuTree(session.user.id);

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
      {children}
    </DashboardShell>
  );
}
