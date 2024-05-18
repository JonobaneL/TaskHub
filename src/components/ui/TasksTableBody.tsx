import { TableTanstack } from "@/models/projectTypes";
import { flexRender } from "@tanstack/react-table";
import { TableBody, TableCell, TableRow } from "./table";
import TasksTableLoader from "./TasksTableLoader";
import TasksTableEmpty from "./TasksTableEmpty";
import { useTypeSelector } from "@/hooks/useReduxHooks";

const TasksTableBody = ({ table }: TableTanstack) => {
  const { isTasksLoading } = useTypeSelector((state) => state.projectReducer);
  return (
    <TableBody>
      {isTasksLoading ? (
        <TasksTableLoader length={table.getAllColumns().length} />
      ) : table.getRowModel().rows?.length ? (
        table.getRowModel().rows.map((row) => (
          <TableRow
            className="h-9 divide-x hover:shadow data-[state=selected]:shadow"
            key={row.id}
            data-state={row.getIsSelected() && "selected"}
          >
            {row.getVisibleCells().map((cell) => (
              <TableCell key={cell.id} className={`p-0 h-9`}>
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </TableCell>
            ))}
            <TableCell className="p-0 h-full" />
          </TableRow>
        ))
      ) : (
        <TasksTableEmpty length={table.getAllColumns().length} />
      )}
    </TableBody>
  );
};

export default TasksTableBody;
