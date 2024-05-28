import { Row } from "@tanstack/react-table";
import conIcon from "../../assets/images/con-icon.svg";
import conIconActive from "../../assets/images/con-icon-active.svg";
import { TaskParams } from "@/models/projectTypes";
import ExtendedTask from "../ExtendedTask";

type CellProps = {
  row: Row<TaskParams>;
};
const TaskCell = ({ row }: CellProps) => {
  return (
    <div className="flex justify-between items-center pl-2 gap-4">
      <ExtendedTask row={row} />
      <div className="size-9 flex items-center justify-center border-l">
        {row.original.conversation == null ? (
          <img src={conIcon} alt="con-icon" className="cursor-pointer" />
        ) : (
          <img src={conIconActive} alt="con-icon" className="cursor-pointer" />
        )}
      </div>
    </div>
  );
};

export default TaskCell;
