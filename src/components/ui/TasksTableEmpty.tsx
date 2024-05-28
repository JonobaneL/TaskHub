import { TableCell, TableRow } from "./table";

type EmptyProps = {
  length: number;
};

const TasksTableEmpty = ({ length }: EmptyProps) => {
  //add aditional value like search query and only the show this message
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
