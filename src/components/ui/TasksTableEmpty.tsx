import { TableCell, TableRow } from "./table";

type EmptyProps = {
  length: number;
};

const TasksTableEmpty = ({ length }: EmptyProps) => {
  return (
    <TableRow>
      <TableCell colSpan={length} className="h-24 text-center">
        <p className="font-main font-semibold text-sm text-primary">
          No Results.
        </p>
      </TableCell>
    </TableRow>
  );
};

export default TasksTableEmpty;
