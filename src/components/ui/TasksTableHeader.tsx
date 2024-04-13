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
        <TableRow key={head.id} className="divide-x h-9">
          {head.headers.map((header) => (
            <TableHead
              key={header.id}
              className={`w-[${header.column.columnDef.size}rem] px-0 text-center font-main h-9`}
            >
              {header.isPlaceholder
                ? null
                : flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}
            </TableHead>
          ))}
          <TableHead className="h-9 " />
          {/*empty*/}
        </TableRow>
      ))}
    </TableHeader>
  );
};

export default TasksTableHeader;
