"use client";

import {
  flexRender,
  getCoreRowModel,
  useReactTable,
  type ColumnDef,
  type SortingState,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { TableContainer } from "@/components/data-table/TableContainer";
import { TableEmpty } from "@/components/data-table/TableEmpty";

type DataTableProps<TData> = {
  columns: ColumnDef<TData, unknown>[];
  data: TData[];
  sorting?: SortingState;
  onSortingChange?: (sorting: SortingState) => void;
  emptyTitle?: string;
  emptyDescription?: string;
  isFiltered?: boolean;
};

export function DataTable<TData>({
  columns,
  data,
  sorting = [],
  onSortingChange,
  emptyTitle,
  emptyDescription,
  isFiltered = false,
}: DataTableProps<TData>) {
  const table = useReactTable({
    data,
    columns,
    state: { sorting },
    onSortingChange: (updater) => {
      const nextSorting =
        typeof updater === "function" ? updater(sorting) : updater;
      onSortingChange?.(nextSorting);
    },
    manualSorting: true,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <TableContainer>
      <Table className="table-zebra table">
        <TableHeader className="sticky top-0 z-10 bg-base-100">
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <TableHead key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext(),
                      )}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows.length > 0 ? (
            table.getRowModel().rows.map((row) => (
              <TableRow key={row.id} data-state={row.getIsSelected() && "selected"}>
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-48 text-center">
                <TableEmpty
                  title={
                    isFiltered ? "No results found" : (emptyTitle ?? "No records yet")
                  }
                  description={
                    isFiltered
                      ? "Try adjusting your filters."
                      : (emptyDescription ?? "Get started by creating a new record.")
                  }
                />
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
