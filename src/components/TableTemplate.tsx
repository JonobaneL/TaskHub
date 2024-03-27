import {
  ColumnDef,
  RowData,
  flexRender,
  getCoreRowModel,
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

type TemplateProps<TData, TValue> = {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  setData: React.Dispatch<React.SetStateAction<TData[]>>;
};
declare module "@tanstack/react-table" {
  interface TableMeta<TData extends RowData> {
    updateData: (rowIndex: number, columnId: string, value: unknown) => void;
  }
}

const TableTemplate = <TData, TValue>({
  data,
  columns,
  setData,
}: TemplateProps<TData, TValue>) => {
  const table = useReactTable({
    data,
    columns,
    meta: {
      updateData: (rowIndex: number, columnId: string, value: any) =>
        setData((current) =>
          current.map((row, index) =>
            index === rowIndex ? { ...row, [columnId]: value } : row
          )
        ),
    },
    getCoreRowModel: getCoreRowModel(),
  });
  return (
    <Table className="border-l-4 border-primary">
      <TableHeader>
        {table.getHeaderGroups().map((head) => (
          <TableRow key={head.id} className="divide-x">
            {head.headers.map((header) => (
              <TableHead
                key={header.id}
                className={`px-0 text-center font-main h-9 w-${header.getSize()}`}
              >
                {header.isPlaceholder
                  ? null
                  : flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
              </TableHead>
            ))}
          </TableRow>
        ))}
      </TableHeader>
      <TableBody>
        {table.getRowModel().rows?.length ? (
          table.getRowModel().rows.map((row) => (
            <TableRow
              className="h-9 divide-x"
              key={row.id}
              data-state={row.getIsSelected() && "selected"}
            >
              {row.getVisibleCells().map((cell) => (
                <TableCell key={cell.id} className="p-0 w-fit">
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </TableCell>
              ))}
            </TableRow>
          ))
        ) : (
          <TableRow>
            <TableCell
              colSpan={table.getAllColumns().length}
              className="h-24 text-center"
            >
              No results.
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};

export default TableTemplate;
