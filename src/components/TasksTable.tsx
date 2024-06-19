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
import { useState } from "react";
import CollapsedTable from "./CollapsedTable";

type TasksTableProps = {
  table: TableParams;
};

const TasksTable = ({ table }: TasksTableProps) => {
  const columns: ColumnDef<TaskParams>[] = taskTableColumns;
  const [isCollapsed, setCollapse] = useState(false);
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
      <>
        {isCollapsed ? (
          <CollapsedTable
            table={table}
            collapse={isCollapsed}
            collapseHandler={setCollapse}
            tableTemplate={tableTemplate}
          />
        ) : (
          <div>
            <TableName
              table={table}
              taskAmount={table.tasks?.length || 0}
              collapse={isCollapsed}
              collapseHandler={setCollapse}
            />
            <TableTemplate color={table.color} table={tableTemplate} />
            <TasksTableStatistic table={tableTemplate} />
          </div>
        )}
      </>
    );

  return null;
};

export default TasksTable;
