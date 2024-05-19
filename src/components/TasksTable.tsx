import {
  AddTaskParams,
  TableParams,
  TaskKeys,
  TaskParams,
} from "@/models/projectTypes";
import TableName from "./TableName";
import {
  ColumnDef,
  RowData,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { taskTableColumns } from "@/data/tasksTableColumns";
import TableTemplate from "./TableTemplate";
import { addNewTask, updateTask } from "@/store/thunks/tasksThunks";
import { useTypeDispatch } from "@/hooks/useReduxHooks";
import TasksTableStatistic from "./TasksTableStatistic";

type TasksTableProps = {
  table: TableParams;
};
declare module "@tanstack/react-table" {
  interface TableMeta<TData extends RowData> {
    updateData: (rowIndex: number, columnId: string, value: unknown) => void;
    addTask: (task: AddTaskParams) => void;
    tableID: string;
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
      addTask: (task: AddTaskParams) => {
        dispatch(addNewTask({ ...task, tableID: table.id }));
      },
      tableID: table.id,
    },
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div>
      <TableName table={table} taskAmount={table.tasks?.length || 0} />
      <TableTemplate color={table.color} table={tableTemplate} />
      <TasksTableStatistic table={tableTemplate} />
    </div>
  );
};

export default TasksTable;
