"use client";

import { forwardRef } from "react";
import type { LucideIcon, LucideProps } from "lucide-react";

import { pascalToKebab } from "@/lib/lucide-icon-utils";

const MissingLucideIcon = forwardRef<SVGSVGElement, LucideProps>(
  function MissingLucideIcon(props, ref) {
    return <svg ref={ref} {...props} />;
  },
);

export async function loadLucideIcon(
  name: string,
): Promise<LucideIcon | null> {
  const kebab = pascalToKebab(name);

  if (!kebab) {
    return null;
  }

  try {
    const mod = (await import(
      `lucide-react/dist/esm/icons/${kebab}.js`
    )) as { default: LucideIcon };

    return mod.default ?? null;
  } catch {
    return null;
  }
}

export function createLucideIconLoader(name: string) {
  return async (): Promise<{ default: LucideIcon }> => {
    const icon = await loadLucideIcon(name);
    return { default: icon ?? MissingLucideIcon };
  };
}
