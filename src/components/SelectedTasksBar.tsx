import { useTableContex } from "@/context/TableContext";
import { createPortal } from "react-dom";
import { IoCloseOutline } from "react-icons/io5";
import SelectedTasksMenu from "./SelectedTasksMenu";
import TasksDots from "./TasksDots";

const SelectedTasksBar = () => {
  const { selectedGroups, selectedTasksLength } = useTableContex();
  const visible = selectedTasksLength > 0;
  const closeHandler = () => {
    Object.keys(selectedGroups).forEach((key) =>
      selectedGroups[key].onClose(false)
    );
  };

  return createPortal(
    <>
      {visible && (
        <div className="fixed flex justify-between h-16 w-fit max-w-4/6 gap-24 bg-white bottom-14 left-1/2 shadow-lg -translate-x-1/2 rounded-sm overflow-hidden z-100">
          <div className="flex items-center gap-2">
            <div className="size-16 bg-accent-b text-white font-main font-medium flex items-center text-2xl justify-center">
              {selectedTasksLength}
            </div>
            <div>
              <p className="font-main font-medium">
                {selectedTasksLength > 1 ? "Tasks" : "Task"} selected
              </p>
              <TasksDots />
            </div>
          </div>
          <div className="flex gap-4">
            <SelectedTasksMenu closeHandler={closeHandler} />
            <div className="group size-16 flex items-center justify-center border-l">
              <IoCloseOutline
                onClick={closeHandler}
                size="1.5rem"
                className="cursor-pointer group-hover:text-accent-b transition-all duration-2"
              />
            </div>
          </div>
        </div>
      )}
    </>,
    document.getElementById("selectedMenu")!
  );
};

export default SelectedTasksBar;
