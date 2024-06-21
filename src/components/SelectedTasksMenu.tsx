import { TableTanstack } from "@/models/projectTypes";
import { createPortal } from "react-dom";
import {
  IoArrowForwardCircleOutline,
  IoCloseOutline,
  IoDuplicateOutline,
  IoTrashBinOutline,
} from "react-icons/io5";

const SelectedTasksMenu = ({ table }: TableTanstack) => {
  const visible =
    table.getIsSomePageRowsSelected() || table.getIsAllPageRowsSelected();
  const selectedRows = table.getSelectedRowModel().rows;
  const closeHandler = () => {
    table.toggleAllRowsSelected(false);
  };
  return createPortal(
    <>
      {visible && (
        <div className="fixed flex justify-between h-16 w-1/3 bg-white bottom-14 left-1/2 shadow-lg -translate-x-1/2 rounded-sm overflow-hidden">
          <div className="flex items-center gap-2">
            <div className="size-16 bg-accent-b text-white font-main font-semibold flex items-center text-lg justify-center">
              {selectedRows.length}
            </div>
            <p className="font-main font-medium">
              {selectedRows.length > 1 ? "Tasks" : "Task"} selected
            </p>
          </div>
          <div className="flex gap-6 items-center">
            <div className="group flex flex-col items-center cursor-pointer">
              <IoDuplicateOutline
                size="1.5rem"
                className="text-text group-hover:text-accent-b transition-all duration-2"
              />
              <p className="font-main text-sm">Duplicate</p>
            </div>
            <div className="group flex flex-col items-center cursor-pointer">
              <IoArrowForwardCircleOutline
                size="1.5rem"
                className="text-text group-hover:text-accent-b transition-all duration-2"
              />
              <p className="font-main text-sm">Move to</p>
            </div>
            <div className="group flex flex-col items-center cursor-pointer">
              <IoTrashBinOutline
                size="1.5rem"
                className="text-text group-hover:text-accent-b transition-all duration-2"
              />
              <p className="font-main text-sm">Delete</p>
            </div>
          </div>
          <div className="group size-16 flex items-center justify-center border-l">
            <IoCloseOutline
              onClick={closeHandler}
              size="1.5rem"
              className="cursor-pointer group-hover:text-accent-b transition-all duration-2"
            />
          </div>
        </div>
      )}
    </>,
    document.getElementById("selectedMenu")!
  );
};

export default SelectedTasksMenu;
