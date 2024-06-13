import { TableParams, TaskParams } from "@/models/projectTypes";
import TableName from "./TableName";
import {
  ColumnDef,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { taskTableColumns } from "@/data/tasksTableColumns";
import TableTemplate from "./TableTemplate";
import TasksTableStatistic from "./TasksTableStatistic";
import { generateTableMeta } from "@/utils/generateTableMeta";
import { useTableContex } from "@/context/TableContext";

type TasksTableProps = {
  table: TableParams;
};

const TasksTable = ({ table }: TasksTableProps) => {
  const columns: ColumnDef<TaskParams>[] = taskTableColumns;
  const { editColumns, columnFilters, groupsFilter } = useTableContex();
  const tableMeta = generateTableMeta(table);
  const tableTemplate = useReactTable({
    data: table.tasks || [],
    columns,
    state: {
      columnVisibility: editColumns,
      columnFilters,
    },
    meta: tableMeta,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });
  if (groupsFilter.length == 0 || groupsFilter.includes(table.id))
    return (
      <div>
        <TableName table={table} taskAmount={table.tasks?.length || 0} />
        <TableTemplate color={table.color} table={tableTemplate} />
        <TasksTableStatistic table={tableTemplate} />
      </div>
    );
};

export default TasksTable;
