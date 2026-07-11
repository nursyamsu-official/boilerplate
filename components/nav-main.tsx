"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import { isNavigationNodeActive } from "@/features/navigation";
import type { NavigationMenuTreeNode } from "@/features/navigation";
import { LucideIconDisplay } from "@/lib/lucide-icon-display";
import { ChevronRightIcon } from "lucide-react";

type NavMainProps = {
  items: NavigationMenuTreeNode[];
};

function MenuIcon({ name }: { name: string | null }) {
  return (
    <LucideIconDisplay
      name={name}
      className="size-4"
      fallback={<span className="size-4 shrink-0" aria-hidden />}
    />
  );
}

function NavMenuSubTree({
  nodes,
  pathname,
}: {
  nodes: NavigationMenuTreeNode[];
  pathname: string;
}) {
  return (
    <>
      {nodes.map((node) => {
        const hasChildren = node.children.length > 0;
        const isActive = isNavigationNodeActive(node, pathname);
        const shouldOpen = isActive;

        if (!hasChildren && node.path) {
          return (
            <SidebarMenuSubItem key={node.id}>
              <SidebarMenuSubButton asChild isActive={pathname === node.path}>
                <Link href={node.path}>
                  <span>{node.label}</span>
                </Link>
              </SidebarMenuSubButton>
            </SidebarMenuSubItem>
          );
        }

        if (hasChildren) {
          return (
            <Collapsible key={node.id} asChild defaultOpen={shouldOpen}>
              <SidebarMenuSubItem>
                {node.path ? (
                  <SidebarMenuSubButton asChild isActive={pathname === node.path}>
                    <Link href={node.path}>
                      <span>{node.label}</span>
                    </Link>
                  </SidebarMenuSubButton>
                ) : (
                  <SidebarMenuSubButton>
                    <span>{node.label}</span>
                  </SidebarMenuSubButton>
                )}
                <CollapsibleTrigger asChild>
                  <SidebarMenuAction className="data-[state=open]:rotate-90">
                    <ChevronRightIcon className="size-4" />
                    <span className="sr-only">Toggle {node.label}</span>
                  </SidebarMenuAction>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <SidebarMenuSub>
                    <NavMenuSubTree nodes={node.children} pathname={pathname} />
                  </SidebarMenuSub>
                </CollapsibleContent>
              </SidebarMenuSubItem>
            </Collapsible>
          );
        }

        return null;
      })}
    </>
  );
}

function NavMenuTreeItem({
  node,
  pathname,
}: {
  node: NavigationMenuTreeNode;
  pathname: string;
}) {
  const hasChildren = node.children.length > 0;
  const isActive = isNavigationNodeActive(node, pathname);
  const shouldOpen = isActive;

  if (!hasChildren && node.path) {
    return (
      <SidebarMenuItem>
        <SidebarMenuButton
          asChild
          tooltip={node.label}
          isActive={pathname === node.path}
        >
          <Link href={node.path}>
            <MenuIcon name={node.icon} />
            <span>{node.label}</span>
          </Link>
        </SidebarMenuButton>
      </SidebarMenuItem>
    );
  }

  if (hasChildren) {
    return (
      <Collapsible asChild defaultOpen={shouldOpen}>
        <SidebarMenuItem>
          {node.path ? (
            <SidebarMenuButton
              asChild
              tooltip={node.label}
              isActive={pathname === node.path}
            >
              <Link href={node.path}>
                <MenuIcon name={node.icon} />
                <span>{node.label}</span>
              </Link>
            </SidebarMenuButton>
          ) : (
            <SidebarMenuButton tooltip={node.label}>
              <MenuIcon name={node.icon} />
              <span>{node.label}</span>
            </SidebarMenuButton>
          )}
          <CollapsibleTrigger asChild>
            <SidebarMenuAction className="data-[state=open]:rotate-90">
              <ChevronRightIcon className="size-4" />
              <span className="sr-only">Toggle {node.label}</span>
            </SidebarMenuAction>
          </CollapsibleTrigger>
          <CollapsibleContent>
            <SidebarMenuSub>
              <NavMenuSubTree nodes={node.children} pathname={pathname} />
            </SidebarMenuSub>
          </CollapsibleContent>
        </SidebarMenuItem>
      </Collapsible>
    );
  }

  return null;
}

export function NavMain({ items }: NavMainProps) {
  const pathname = usePathname();

  return (
    <SidebarGroup>
      <SidebarGroupLabel>Navigation</SidebarGroupLabel>
      <SidebarMenu>
        {items.map((item) => (
          <NavMenuTreeItem key={item.id} node={item} pathname={pathname} />
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}
