import comIcon from "../assets/images/con-icon.svg";
import comIconActive from "../assets/images/con-icon-active.svg";
import { TbArrowsDiagonal } from "react-icons/tb";
import Helper from "./ui/Helper";
import { CellContext } from "@tanstack/react-table";
import { TaskParams } from "@/models/projectTypes";
import TaskEdit from "./ui/TaskEdit";

type InfoParams = {
  open: boolean;
  tab: "details" | "comments";
};
type HeaderProps = {
  options: CellContext<TaskParams, unknown>;
  openHandler: React.Dispatch<React.SetStateAction<InfoParams>>;
};

const TaskHeader = ({ options, openHandler }: HeaderProps) => {
  const { row, column } = options;
  const { commentsID } = row.original;
  return (
    <div
      style={{ width: `${column.columnDef.size}rem` }}
      className="group flex items-center pl-2 justify-between"
      onClick={() => openHandler({ open: true, tab: "details" })}
    >
      <TaskEdit options={options} />
      <div className="size-9 hidden group-hover:flex items-center justify-center flex-fix ml-auto">
        <Helper content="Open">
          <div>
            <TbArrowsDiagonal size="1.2rem" className="text-accent-b" />
          </div>
        </Helper>
      </div>

      <div className="size-9 flex flex-fix items-center justify-center border-l ml-2 group-hover:ml-0">
        <img
          src={!commentsID ? comIcon : comIconActive}
          alt="con-icon"
          className="cursor-pointer"
          onClick={(e) => {
            e.stopPropagation();
            openHandler({ open: true, tab: "comments" });
          }}
        />
      </div>
    </div>
  );
};

export default TaskHeader;
