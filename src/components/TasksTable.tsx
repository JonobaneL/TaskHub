import { TableParams, TaskKeys, TaskParams } from "@/models/projectTypes";
import TableName from "./TableName";
import {
  ColumnDef,
  RowData,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { taskTableColumns } from "@/data/tasksTableColumns";
import TableTemplate from "./TableTemplate";
import { updateTask } from "@/store/thunks/tasksThunks";
import { useTypeDispatch } from "@/hooks/useReduxHooks";

type TasksTableProps = {
  table: TableParams;
};
declare module "@tanstack/react-table" {
  interface TableMeta<TData extends RowData> {
    updateData: (rowIndex: number, columnId: string, value: unknown) => void;
  }
}

const TasksTable = ({ table }: TasksTableProps) => {
  const columns: ColumnDef<TaskParams>[] = taskTableColumns;
  const dispatch = useTypeDispatch();
  const tableTemplate = useReactTable({
    data: table.tasks || [],
    columns,

    meta: {
      updateData: (rowIndex: number, columnId: string, value: any) => {
        dispatch(
          updateTask({
            tableID: table.id,
            taskID: table.tasks ? table.tasks[rowIndex].id : null,
            key: columnId as TaskKeys,
            value,
          })
        );
      },
    },
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div>
      <TableName table={table} taskAmount={table.tasks?.length || 0} />
      <div className="w-full h-fit rounded-l-[2px] overflow-hidden">
        <TableTemplate color={table.color} table={tableTemplate} />
      </div>
    </div>
  );
};

export default TasksTable;
