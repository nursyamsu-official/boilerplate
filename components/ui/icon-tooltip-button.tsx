"use client";

import * as React from "react";

import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

type TooltipIconTriggerProps = {
  tooltip: React.ReactNode;
  children: React.ReactElement;
  contentProps?: React.ComponentProps<typeof TooltipContent>;
};

function isDisabledElement(element: React.ReactElement): boolean {
  const props = element.props as { disabled?: boolean; children?: React.ReactNode };

  if (props.disabled) {
    return true;
  }

  const child = props.children;
  if (React.isValidElement(child)) {
    return isDisabledElement(child);
  }

  return false;
}

function TooltipIconTrigger({
  tooltip,
  children,
  contentProps,
}: TooltipIconTriggerProps) {
  const trigger = isDisabledElement(children) ? (
    <span className="inline-flex">{children}</span>
  ) : (
    children
  );

  return (
    <Tooltip>
      <TooltipTrigger asChild>{trigger}</TooltipTrigger>
      <TooltipContent {...contentProps}>{tooltip}</TooltipContent>
    </Tooltip>
  );
}

type IconTooltipButtonProps = React.ComponentProps<typeof Button> & {
  tooltip: React.ReactNode;
  contentProps?: React.ComponentProps<typeof TooltipContent>;
};

function IconTooltipButton({
  tooltip,
  contentProps,
  type = "button",
  variant = "ghost",
  size = "icon-sm",
  children,
  ...props
}: IconTooltipButtonProps) {
  return (
    <TooltipIconTrigger tooltip={tooltip} contentProps={contentProps}>
      <Button type={type} variant={variant} size={size} {...props}>
        {children}
      </Button>
    </TooltipIconTrigger>
  );
}

export { IconTooltipButton, TooltipIconTrigger };
