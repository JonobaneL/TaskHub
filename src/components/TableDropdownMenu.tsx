import { Button } from "./ui/button";
import dotsIcon from "../assets/images/dots.svg";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { useTypeDispatch } from "@/hooks/useReduxHooks";
import { deleteGroup } from "@/store/thunks/projectsThunks";
import { TableParams } from "@/models/projectTypes";

type MenuProps = {
  table: TableParams;
  editHandler: React.Dispatch<React.SetStateAction<boolean>>;
  colorHandler: React.Dispatch<React.SetStateAction<boolean>>;
  collapseHandler: React.Dispatch<React.SetStateAction<boolean>>;
};

const TableDropdownMenu = ({
  table,
  editHandler,
  colorHandler,
  collapseHandler,
}: MenuProps) => {
  const dispatch = useTypeDispatch();
  const deleteHandler = () => {
    dispatch(deleteGroup(table.id));
  };
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            className="w-7 h-7 p-1 -translate-x-7  opacity-0 group-hover:opacity-100 group-hover:translate-x-0 transition-all	duration-300  rounded-sm"
            variant="ghost"
          >
            <img className="w-full h-full" src={dotsIcon} alt="more" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem onClick={() => collapseHandler((p) => !p)}>
            Collaps group
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={(e) => {
              e.stopPropagation();
              editHandler(true);
            }}
          >
            Rename group
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={(e) => {
              e.stopPropagation();
              editHandler(true);
              colorHandler(true);
            }}
          >
            Change group color
          </DropdownMenuItem>
          <DropdownMenuItem onClick={deleteHandler}>Delete</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};

export default TableDropdownMenu;
