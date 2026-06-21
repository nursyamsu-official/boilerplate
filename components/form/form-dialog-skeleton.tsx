import { Skeleton } from "@/components/ui/skeleton";

type FormDialogSkeletonProps = {
  fields?: number;
};

export function FormDialogSkeleton({ fields = 5 }: FormDialogSkeletonProps) {
  return (
    <div className="flex min-h-0 flex-1 flex-col gap-4">
      <div className="min-h-0 flex-1 space-y-4 overflow-hidden">
        {Array.from({ length: fields }, (_, index) => (
          <div key={index} className="space-y-2">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-9 w-full" />
          </div>
        ))}
      </div>

      <div className="flex shrink-0 justify-end gap-2 border-t pt-4">
        <Skeleton className="h-9 w-20" />
        <Skeleton className="h-9 w-24" />
      </div>
    </div>
  );
}
