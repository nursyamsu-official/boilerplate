"use client";

import { lazy, Suspense, useMemo } from "react";

import { cn } from "@/lib/utils";
import { createLucideIconLoader } from "@/lib/lucide-icon-loader.client";

type LucideIconDisplayProps = {
  name: string | null | undefined;
  className?: string;
  showLabel?: boolean;
  labelClassName?: string;
  fallback?: React.ReactNode;
};

export function LucideIconDisplay({
  name,
  className,
  showLabel = false,
  labelClassName,
  fallback = <span className="text-muted-foreground">—</span>,
}: LucideIconDisplayProps) {
  const LazyIcon = useMemo(() => {
    if (!name?.trim()) {
      return null;
    }

    return lazy(createLucideIconLoader(name));
  }, [name]);

  if (!name || !LazyIcon) {
    return fallback;
  }

  return (
    <span className="inline-flex items-center gap-2" title={name}>
      <Suspense
        fallback={
          <span
            className={cn(
              "inline-block size-4 shrink-0 rounded-sm bg-muted",
              className,
            )}
            aria-hidden
          />
        }
      >
        <LazyIcon className={cn("size-4 shrink-0", className)} aria-hidden />
      </Suspense>
      {showLabel ? (
        <span className={cn("text-xs text-muted-foreground", labelClassName)}>
          {name}
        </span>
      ) : null}
    </span>
  );
}
