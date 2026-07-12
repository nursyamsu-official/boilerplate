"use client";

import { ChevronRightIcon } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { cn } from "@/lib/utils";

import type { LogisticUnitTreeNode } from "../types/logistic-unit.type";

const DEPTH_INDENT_REM = 1.5;

type LogisticUnitPreviewTreeProps = {
  nodes: LogisticUnitTreeNode[];
  depth?: number;
};

function LogisticUnitPreviewRowContent({
  node,
}: {
  node: LogisticUnitTreeNode;
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

function LogisticUnitPreviewTreeNode({
  node,
  depth = 0,
}: {
  node: LogisticUnitTreeNode;
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
      <LogisticUnitPreviewRowContent node={node} />
    </div>
  );

  if (!hasChildren) {
    return row;
  }

  return (
    <Collapsible defaultOpen>
      {row}
      <CollapsibleContent>
        <LogisticUnitPreviewTree
          nodes={node.children}
          depth={depth + 1}
        />
      </CollapsibleContent>
    </Collapsible>
  );
}

export function LogisticUnitPreviewTree({
  nodes,
  depth = 0,
}: LogisticUnitPreviewTreeProps) {
  return (
    <div className={cn("flex flex-col", depth === 0 && "gap-1")}>
      {nodes.map((node) => (
        <LogisticUnitPreviewTreeNode key={node.id} node={node} depth={depth} />
      ))}
    </div>
  );
}
