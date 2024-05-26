import { TableParams, TaskParams } from "@/models/projectTypes";
import TableName from "./TableName";
import {
  ColumnDef,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { taskTableColumns } from "@/data/tasksTableColumns";
import TableTemplate from "./TableTemplate";
import TasksTableStatistic from "./TasksTableStatistic";
import { generateTableMeta } from "@/utils/generateTableMeta";

type TasksTableProps = {
  table: TableParams;
};

const TasksTable = ({ table }: TasksTableProps) => {
  const columns: ColumnDef<TaskParams>[] = taskTableColumns;
  const tableMeta = generateTableMeta(table);
  const tableTemplate = useReactTable({
    data: table.tasks || [],
    columns,
    meta: tableMeta,
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
