import { TaskParams } from "@/models/projectTypes";
import { Table, flexRender } from "@tanstack/react-table";
import { TableBody, TableCell, TableRow } from "./table";
import TasksTableLoader from "./TasksTableLoader";
import TasksTableEmpty from "./TasksTableEmpty";

type BodyProps = {
  isLoading: boolean;
  table: Table<TaskParams>;
};

const TasksTableBody = ({ isLoading, table }: BodyProps) => {
  return (
    <TableBody>
      {isLoading ? (
        <TasksTableLoader length={table.getAllColumns().length} />
      ) : table.getRowModel().rows?.length ? (
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
        <TasksTableEmpty length={table.getAllColumns().length} />
      )}
    </TableBody>
  );
};

export default TasksTableBody;
