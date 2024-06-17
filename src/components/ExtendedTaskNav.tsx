import { Button } from "./ui/button";
import editIcon from "../assets/images/edit.svg";
import deleteIcon from "../assets/images/delete.svg";
import { IoCloseOutline } from "react-icons/io5";
import { CellContext } from "@tanstack/react-table";
import { TaskParams } from "@/models/projectTypes";
import { useMenuMethods } from "@/hooks/useMenuMethods";

type NavProps = {
  closeHandler: (value: boolean) => void;
  options: CellContext<TaskParams, unknown>;
  editHandler: React.Dispatch<React.SetStateAction<boolean>>;
  edit: boolean;
};

const ExtendedTaskNav = ({
  closeHandler,
  options,
  editHandler,
  edit,
}: NavProps) => {
  const tableID = options.table.options.meta?.tableID || "";
  const taskID = options.row.original.id;
  const { deleteHandler } = useMenuMethods(taskID, tableID);
  return (
    <div className="flex justify-between">
      <Button
        variant="ghost"
        className="size-8 p-1 rounded-sm"
        onClick={() => closeHandler(false)}
      >
        <IoCloseOutline size="100%" />
      </Button>
      <div className="space-x-0">
        <Button
          variant="ghost"
          className="h-8 p-2 rounded-sm font-medium text-text font-main text-[0.8rem]"
          onClick={() => editHandler((p) => !p)}
        >
          <img src={editIcon} alt="edit" className="mr-1" />
          {!edit ? "Edit" : "Cancel"}
        </Button>
        {!edit && (
          <Button
            variant="ghost"
            className="h-8 p-2 rounded-sm font-medium text-text font-main text-[0.8rem]"
            onClick={() => {
              closeHandler(false);
              setTimeout(deleteHandler, 300);
            }}
          >
            <img src={deleteIcon} alt="edit" className="mr-1 w-[14px]" />
            Delete
          </Button>
        )}
      </div>
    </div>
  );
};

export default ExtendedTaskNav;
