import { Table as TableParams } from "@tanstack/react-table";
import { Table } from "./ui/table";
import { TaskParams } from "@/models/projectTypes";
import TasksTableHeader from "./ui/TasksTableHeader";
import TasksTableBody from "./ui/TasksTableBody";
import TaskTableFooter from "./TaskTableFooter";

type TableProps = {
  color: string;
  table: TableParams<TaskParams>;
};
const TableTemplate = ({ color, table }: TableProps) => {
  return (
    <div className="h-fit relative">
      <div
        style={{ background: color }}
        className="absolute h-full w-1 left-0 top-0 rounded-l-sm"
      />
      <Table className="border-y border-y-slate-200 shadow-sm ml-1">
        <TasksTableHeader table={table} />
        <TasksTableBody table={table} />
        <TaskTableFooter table={table} />
      </Table>
    </div>
  );
};

export default TableTemplate;
