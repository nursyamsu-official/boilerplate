"use client";

import { ChevronRightIcon } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { cn } from "@/lib/utils";

import type { PurchasingGroupTreeNode } from "../types/purchasing-group.type";

const DEPTH_INDENT_REM = 1.5;

type PurchasingGroupPreviewTreeProps = {
  nodes: PurchasingGroupTreeNode[];
  depth?: number;
};

function PurchasingGroupPreviewRowContent({
  node,
}: {
  node: PurchasingGroupTreeNode;
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

function PurchasingGroupPreviewTreeNode({
  node,
  depth = 0,
}: {
  node: PurchasingGroupTreeNode;
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
      <PurchasingGroupPreviewRowContent node={node} />
    </div>
  );

  if (!hasChildren) {
    return row;
  }

  return (
    <Collapsible defaultOpen>
      {row}
      <CollapsibleContent>
        <PurchasingGroupPreviewTree
          nodes={node.children}
          depth={depth + 1}
        />
      </CollapsibleContent>
    </Collapsible>
  );
}

export function PurchasingGroupPreviewTree({
  nodes,
  depth = 0,
}: PurchasingGroupPreviewTreeProps) {
  return (
    <div className={cn("flex flex-col", depth === 0 && "gap-1")}>
      {nodes.map((node) => (
        <PurchasingGroupPreviewTreeNode key={node.id} node={node} depth={depth} />
      ))}
    </div>
  );
}
