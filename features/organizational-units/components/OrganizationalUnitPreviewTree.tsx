"use client";

import { ChevronRightIcon } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { cn } from "@/lib/utils";

import type { OrganizationalUnitTreeNode } from "../types/organizational-unit.type";

const DEPTH_INDENT_REM = 1.5;

type OrganizationalUnitPreviewTreeProps = {
  nodes: OrganizationalUnitTreeNode[];
  depth?: number;
};

function OrganizationalUnitPreviewRowContent({
  node,
}: {
  node: OrganizationalUnitTreeNode;
}) {
  return (
    <div className="flex min-w-0 flex-1 items-center gap-2 py-1.5">
      <span className="truncate font-medium">{node.name}</span>
      <span className="truncate font-mono text-xs text-muted-foreground">
        {node.code}
      </span>
      {!node.isActive ? (
        <Badge variant="secondary" className="shrink-0 text-xs">
          Inactive
        </Badge>
      ) : null}
    </div>
  );
}

function OrganizationalUnitPreviewTreeNode({
  node,
  depth = 0,
}: {
  node: OrganizationalUnitTreeNode;
  depth?: number;
}) {
  const hasChildren = node.children.length > 0;
  const depthStyle = { paddingLeft: `${depth * DEPTH_INDENT_REM}rem` };

  const expandSlot = hasChildren ? (
    <CollapsibleTrigger className="flex size-6 shrink-0 items-center justify-center rounded-sm hover:bg-muted [&[data-state=open]>svg]:rotate-90">
      <ChevronRightIcon className="size-4 transition-transform" />
      <span className="sr-only">Toggle {node.name}</span>
    </CollapsibleTrigger>
  ) : (
    <span className="size-6 shrink-0" aria-hidden />
  );

  const row = (
    <div className="flex items-start gap-1" style={depthStyle}>
      {expandSlot}
      <OrganizationalUnitPreviewRowContent node={node} />
    </div>
  );

  if (!hasChildren) {
    return row;
  }

  return (
    <Collapsible defaultOpen>
      {row}
      <CollapsibleContent>
        <OrganizationalUnitPreviewTree
          nodes={node.children}
          depth={depth + 1}
        />
      </CollapsibleContent>
    </Collapsible>
  );
}

export function OrganizationalUnitPreviewTree({
  nodes,
  depth = 0,
}: OrganizationalUnitPreviewTreeProps) {
  return (
    <div className={cn("flex flex-col", depth === 0 && "gap-1")}>
      {nodes.map((node) => (
        <OrganizationalUnitPreviewTreeNode key={node.id} node={node} depth={depth} />
      ))}
    </div>
  );
}
