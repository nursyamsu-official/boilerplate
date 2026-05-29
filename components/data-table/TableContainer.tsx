import { cn } from "@/lib/utils";

type TableContainerProps = {
  children: React.ReactNode;
  className?: string;
};

export function TableContainer({ children, className }: TableContainerProps) {
  return (
    <div
      className={cn(
        "overflow-auto rounded-lg border bg-base-100",
        className,
      )}
    >
      {children}
    </div>
  );
}
