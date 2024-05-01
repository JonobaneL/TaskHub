import { TableCell, TableRow } from "./table";
import loader from "../../assets/images/fadeLoader.svg";

type LoaderProps = {
  length: number;
};

const TasksTableLoader = ({ length }: LoaderProps) => {
  return (
    <TableRow>
      <TableCell colSpan={length} className="h-24">
        <img
          className="block mx-auto w-14 h-14"
          src={loader}
          alt="Loading..."
        />
      </TableCell>
    </TableRow>
  );
};

export default TasksTableLoader;
