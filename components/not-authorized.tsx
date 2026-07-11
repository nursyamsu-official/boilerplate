import { LayoutDashboard, ShieldX } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";

export function NotAuthorized() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center px-6 py-16">
      <div className="w-full max-w-md text-center">
        <div className="mx-auto flex size-16 items-center justify-center rounded-full bg-destructive/10">
          <ShieldX className="size-8 text-destructive" aria-hidden="true" />
        </div>

        <p className="mt-6 text-sm font-semibold text-muted-foreground">
          403 – Access Denied
        </p>

        <h1 className="mt-2 text-2xl font-semibold tracking-tight">
          You are not authorized to access this page.
        </h1>

        <p className="mx-auto mt-3 max-w-sm text-sm text-muted-foreground">
          You do not have permission to view this page. Contact your administrator
          if you believe this is a mistake.
        </p>

        <div className="mt-8">
          <Button asChild>
            <Link href="/dashboard">
              <LayoutDashboard data-icon="inline-start" />
              Back to Dashboard
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
