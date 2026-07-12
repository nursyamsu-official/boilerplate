import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

type FormDialogLayoutProps = {
  children: ReactNode;
  actions: ReactNode;
  className?: string;
};

export function FormDialogLayout({
  children,
  actions,
  className,
}: FormDialogLayoutProps) {
  return (
    <div className={cn("flex min-h-0 flex-1 flex-col gap-4", className)}>
      <div className="scrollbar-thin min-h-0 flex-1 overflow-y-auto pr-1">{children}</div>
      <div className="flex shrink-0 justify-end gap-2 border-t pt-4">
        {actions}
      </div>
    </div>
  );
}

type FormShellProps = {
  layout?: "default" | "dialog";
  children: ReactNode;
  actions: ReactNode;
};

export function FormShell({
  layout = "default",
  children,
  actions,
}: FormShellProps) {
  if (layout === "dialog") {
    return <FormDialogLayout actions={actions}>{children}</FormDialogLayout>;
  }

  return (
    <>
      {children}
      <div className="flex justify-end gap-2">{actions}</div>
    </>
  );
}

export function getFormClassName(layout: "default" | "dialog" = "default") {
  return cn("flex flex-col gap-4", layout === "dialog" && "min-h-0 flex-1");
}
