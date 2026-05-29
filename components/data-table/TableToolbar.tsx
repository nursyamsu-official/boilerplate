import { cn } from "@/lib/utils";

type TableToolbarProps = {
  children: React.ReactNode;
  className?: string;
};

export function TableToolbar({ children, className }: TableToolbarProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between",
        className,
      )}
    >
      {children}
    </div>
  );
}
