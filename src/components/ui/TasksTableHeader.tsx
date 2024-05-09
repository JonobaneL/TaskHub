import { TableTanstack } from "@/models/projectTypes";
import { flexRender } from "@tanstack/react-table";
import { TableHead, TableHeader, TableRow } from "./table";

const TasksTableHeader = ({ table }: TableTanstack) => {
  return (
    <TableHeader>
      {table.getHeaderGroups().map((head) => (
        <TableRow key={head.id} className="divide-x h-9">
          {head.headers.map((header) => (
            <TableHead
              key={header.id}
              style={{
                width: `${header.column.columnDef.size}rem`,
                minWidth: `${header.column.columnDef?.minSize}rem`,
              }}
              className={` px-0 text-center font-main h-9`}
            >
              {header.isPlaceholder
                ? null
                : flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}
            </TableHead>
          ))}
          <TableHead className="px-0 h-9" />
          {/*empty*/}
        </TableRow>
      ))}
    </TableHeader>
  );
};

export default TasksTableHeader;
