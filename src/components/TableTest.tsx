import { Table as TableParams } from "@tanstack/react-table";
import { Table } from "./ui/table";
import { TaskParams } from "@/models/projectTypes";
import TasksTableHeader from "./ui/TasksTableHeader";
import TasksTableBody from "./ui/TasksTableBody";

type TableProps = {
  isLoading: boolean;
  color: string;
  table: TableParams<TaskParams>;
};
const TableTest = ({ isLoading, color, table }: TableProps) => {
  return (
    <Table style={{ borderColor: color }} className="border-l-4">
      <TasksTableHeader table={table} />
      <TasksTableBody isLoading={isLoading} table={table} />
    </Table>
  );
};

export default TableTest;
