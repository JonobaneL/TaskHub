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
    <Table
      style={{ borderColor: color }}
      className="border-l-4 border-y border-y-slate-200 shadow"
    >
      <TasksTableHeader table={table} />
      <TasksTableBody table={table} />
      <TaskTableFooter table={table} />
    </Table>
  );
};

export default TableTemplate;
