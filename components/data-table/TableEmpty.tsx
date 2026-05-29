import { Empty, EmptyDescription, EmptyTitle } from "@/components/ui/empty";

type TableEmptyProps = {
  title?: string;
  description?: string;
};

export function TableEmpty({
  title = "No records yet",
  description = "Get started by creating a new record.",
}: TableEmptyProps) {
  return (
    <Empty className="py-12">
      <EmptyTitle>{title}</EmptyTitle>
      <EmptyDescription>{description}</EmptyDescription>
    </Empty>
  );
}
