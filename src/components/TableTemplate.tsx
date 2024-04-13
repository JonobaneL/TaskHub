import { Table as TableParams } from "@tanstack/react-table";
import { Table } from "./ui/table";
import { TaskParams } from "@/models/projectTypes";
import TasksTableHeader from "./ui/TasksTableHeader";
import TasksTableBody from "./ui/TasksTableBody";

type TableProps = {
  color: string;
  table: TableParams<TaskParams>;
};
const TableTemplate = ({ color, table }: TableProps) => {
  return (
    <Table style={{ borderColor: color }} className="border-l-4 w-full">
      <TasksTableHeader table={table} />
      <TasksTableBody table={table} />
    </Table>
  );
};

export default TableTemplate;
