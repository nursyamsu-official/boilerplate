"use client";

import { ChevronRightIcon } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { LucideIconDisplay } from "@/lib/lucide-icon-display";
import { cn } from "@/lib/utils";

import type { MenuTreeNode } from "../types/menu.type";

const DEPTH_INDENT_REM = 1.5;

type MenuPreviewTreeProps = {
  nodes: MenuTreeNode[];
  depth?: number;
};

function MenuPreviewRowContent({ node }: { node: MenuTreeNode }) {
  return (
    <div className="flex min-w-0 flex-1 items-center gap-2 py-1.5">
      <LucideIconDisplay
        name={node.icon}
        className="size-4"
        fallback={
          <span className="inline-block size-4 shrink-0 rounded-sm bg-muted" />
        }
      />
      <span className="truncate font-medium">{node.label}</span>
      <span className="truncate font-mono text-xs text-muted-foreground">
        {node.code}
      </span>
      {node.path ? (
        <span className="hidden truncate text-xs text-muted-foreground sm:inline">
          {node.path}
        </span>
      ) : (
        <Badge variant="outline" className="shrink-0 text-xs">
          Group
        </Badge>
      )}
      {!node.isActive ? (
        <Badge variant="secondary" className="shrink-0 text-xs">
          Inactive
        </Badge>
      ) : null}
    </div>
  );
}

function MenuPreviewTreeNode({
  node,
  depth = 0,
}: {
  node: MenuTreeNode;
  depth?: number;
}) {
  const hasChildren = node.children.length > 0;
  const depthStyle = { paddingLeft: `${depth * DEPTH_INDENT_REM}rem` };

  const expandSlot = hasChildren ? (
    <CollapsibleTrigger className="flex size-6 shrink-0 items-center justify-center rounded-sm hover:bg-muted [&[data-state=open]>svg]:rotate-90">
      <ChevronRightIcon className="size-4 transition-transform" />
      <span className="sr-only">Toggle {node.label}</span>
    </CollapsibleTrigger>
  ) : (
    <span className="size-6 shrink-0" aria-hidden />
  );

  const row = (
    <div className="flex items-start gap-1" style={depthStyle}>
      {expandSlot}
      <MenuPreviewRowContent node={node} />
    </div>
  );

  if (!hasChildren) {
    return row;
  }

  return (
    <Collapsible defaultOpen>
      {row}
      <CollapsibleContent>
        <MenuPreviewTree nodes={node.children} depth={depth + 1} />
      </CollapsibleContent>
    </Collapsible>
  );
}

export function MenuPreviewTree({ nodes, depth = 0 }: MenuPreviewTreeProps) {
  return (
    <div className={cn("flex flex-col", depth === 0 && "gap-1")}>
      {nodes.map((node) => (
        <MenuPreviewTreeNode key={node.id} node={node} depth={depth} />
      ))}
    </div>
  );
}
