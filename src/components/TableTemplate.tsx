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
    <div className="h-fit flex">
      <div
        style={{ background: color }}
        className="h-auto w-1 flex-cover rounded-l-sm"
      />
      <Table className="border-y border-y-slate-200 shadow-sm pl-1">
        <TasksTableHeader table={table} />
        <TasksTableBody table={table} />
        <TaskTableFooter table={table} />
      </Table>
    </div>
  );
};

export default TableTemplate;
