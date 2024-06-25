import { useSelectedMenuMethods } from "@/hooks/useSelectedMenuMethods";
import {
  IoArrowForwardCircleOutline,
  IoDuplicateOutline,
  IoTrashBinOutline,
} from "react-icons/io5";
import { Popover, PopoverTrigger } from "./ui/popover";
import GroupsList from "./GroupsList";

type MenuProps = {
  closeHandler: () => void;
};
const SelectedTasksMenu = ({ closeHandler }: MenuProps) => {
  const { deleteAllTasks, moveAllTo, duplicateAll } = useSelectedMenuMethods();
  return (
    <div className="flex gap-6 items-center">
      <div
        className="group flex flex-col items-center cursor-pointer"
        onClick={() => {
          duplicateAll();
          closeHandler();
        }}
      >
        <IoDuplicateOutline
          size="1.5rem"
          className="text-text group-hover:text-accent-b transition-all duration-2"
        />
        <p className="font-main text-sm">Duplicate</p>
      </div>
      <Popover>
        <PopoverTrigger>
          <div className="group flex flex-col items-center cursor-pointer">
            <IoArrowForwardCircleOutline
              size="1.5rem"
              className="text-text group-hover:text-accent-b transition-all duration-2"
            />
            <p className="font-main text-sm">Move to</p>
          </div>
        </PopoverTrigger>
        <GroupsList
          callback={(id) => {
            moveAllTo(id);
            closeHandler();
          }}
        />
      </Popover>
      <div
        className="group flex flex-col items-center cursor-pointer"
        onClick={deleteAllTasks}
      >
        <IoTrashBinOutline
          size="1.5rem"
          className="text-text group-hover:text-accent-b transition-all duration-2"
        />
        <p className="font-main text-sm">Delete</p>
      </div>
    </div>
  );
};

export default SelectedTasksMenu;
