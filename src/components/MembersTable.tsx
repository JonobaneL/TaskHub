import {
  flexRender,
  getFilteredRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { MemberDetails } from "@/models/userTypes";
import { membersTableColumns } from "@/data/membersTableColumns";
import { getCoreRowModel } from "@tanstack/react-table";
import { ColumnFiltersParams } from "@/models/TableTypes";
import { useMemo } from "react";
import HeaderCellContent from "./ui/HeaderCellContent";

type TableProps = {
  members: MemberDetails[];
  filters: ColumnFiltersParams;
};
const MembersTable = ({ members, filters }: TableProps) => {
  const columnFilters = useMemo(
    () =>
      Object.keys(filters).map((key) => {
        return { id: key, value: filters[key] };
      }),
    [filters]
  );
  const tableTemplate = useReactTable({
    data: members || [],
    state: {
      columnFilters,
    },
    columns: membersTableColumns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  return (
    <div className="overflow-x-auto pb-5">
      <Table>
        <TableHeader>
          {tableTemplate.getHeaderGroups().map((head) => (
            <TableRow key={head.id} className="p-2">
              {head.headers.map((header) => (
                <TableHead
                  key={header.id}
                  style={{
                    width: `${header.column.columnDef.size}rem`,
                    minWidth: `${header.column.columnDef?.minSize}rem`,
                  }}
                  className="group font-main"
                >
                  <HeaderCellContent
                    header={header}
                    align={header.column.columnDef.meta?.align}
                  />
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {tableTemplate.getRowModel().rows.map((row) => (
            <TableRow key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <TableCell key={cell.id} className="py-1">
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default MembersTable;
