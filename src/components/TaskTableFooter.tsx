import { TableCell, TableFooter, TableRow } from "./ui/table";
import AddTaskCell from "./AddTaskCell";
import { Table } from "@tanstack/react-table";
import { TaskParams } from "@/models/projectTypes";

type FooterProps = {
  table: Table<TaskParams>;
};
const TaskTableFooter = ({ table }: FooterProps) => {
  // console.log(table.getRowModel().rows);
  return (
    <TableFooter className="bg-white">
      <TableRow className="divide-x">
        <TableCell className="size-9 flex items-center justify-center">
          <input
            type="checkbox"
            className="w-4 h-4 accent-primary shadow"
            disabled
          />
        </TableCell>
        <AddTaskCell table={table} />
        <TableCell colSpan={10} />
      </TableRow>
    </TableFooter>
  );
};

export default TaskTableFooter;
