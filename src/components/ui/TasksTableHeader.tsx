import { TaskParams } from "@/models/projectTypes";
import { Table, flexRender } from "@tanstack/react-table";
import { TableHead, TableHeader, TableRow } from "./table";

type HeaderProps = {
  table: Table<TaskParams>;
};
const TasksTableHeader = ({ table }: HeaderProps) => {
  return (
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
  );
};

export default TasksTableHeader;
