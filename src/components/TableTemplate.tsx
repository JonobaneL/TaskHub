import { Table as TableParams } from "@tanstack/react-table";
import { Table } from "./ui/table";
import { TaskParams } from "@/models/projectTypes";
import TasksTableHeader from "./ui/TasksTableHeader";
import TasksTableBody from "./ui/TasksTableBody";
import TaskTableFooter from "./TaskTableFooter";

type TableProps = {
  color: string;
  table: TableParams<TaskParams>;
  tasks: TaskParams[] | null;
};
const TableTemplate = ({ color, table, tasks }: TableProps) => {
  return (
    <Table
      style={{ borderColor: color }}
      className="border-l-4 overflow-x-auto"
    >
      <TasksTableHeader table={table} />
      <TasksTableBody table={table} />
      <TaskTableFooter table={table} />
    </Table>
  );
};

export default TableTemplate;
