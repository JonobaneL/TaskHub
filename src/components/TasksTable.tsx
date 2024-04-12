import { getAllTasks } from "@/firebase/tablesAPI";
import { useAsync } from "@/hooks/useAsync";
import { TableParams, TaskParams } from "@/models/projectTypes";
import TableName from "./TableName";
import TableTemplate from "./TableTemplate";
import {
  ColumnDef,
  RowData,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { taskTableColumns } from "@/data/tasksTableColumns";
import TableTest from "./TableTest";

type TasksTableProps = {
  table: TableParams;
};
declare module "@tanstack/react-table" {
  interface TableMeta<TData extends RowData> {
    updateData: (rowIndex: number, columnId: string, value: unknown) => void;
  }
}

const TasksTable = ({ table }: TasksTableProps) => {
  const [isTasksLoading, , tasks] = useAsync<TaskParams[]>(
    () => getAllTasks(table.tasksID),
    []
  );
  const columns: ColumnDef<TaskParams>[] = taskTableColumns;
  const tableTemplate = useReactTable({
    data: tasks || [],
    columns,
    meta: {
      updateData: (rowIndex: number, columnId: string, value: any) => {},
    },
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div>
      <TableName table={table} taskAmount={tasks?.length || 0} />
      {/* <TableTemplate columns={columns} data={data} setData={setData} /> */}
      <div className="w-full h-fit rounded-l-[2px] overflow-hidden">
        <TableTest
          color={table.color}
          isLoading={isTasksLoading}
          table={tableTemplate}
        />
      </div>
    </div>
  );
};

export default TasksTable;
