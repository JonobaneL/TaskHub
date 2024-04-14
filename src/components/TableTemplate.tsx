import { Table as TableParams } from "@tanstack/react-table";
import { Table, TableCell, TableFooter, TableRow } from "./ui/table";
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
      className="border-l-4 overflow-x-auto"
    >
      <TasksTableHeader table={table} />
      <TasksTableBody table={table} />
      <TaskTableFooter table={table} />
    </Table>
  );
};

export default TableTemplate;
