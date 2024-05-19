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
};

const TableDropdownMenu = ({ table }: MenuProps) => {
  const dispatch = useTypeDispatch();
  const deleteHandler = () => {
    dispatch(deleteGroup(table.id));
  };
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            className="w-7 h-7 p-1 -translate-x-7 group-hover:translate-x-0 transition-transform	duration-300  rounded-sm"
            variant="ghost"
          >
            <img className="w-full h-full" src={dotsIcon} alt="more" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem>Collaps group</DropdownMenuItem>
          <DropdownMenuItem>Rename group</DropdownMenuItem>
          <DropdownMenuItem>Change group color</DropdownMenuItem>
          <DropdownMenuItem onClick={deleteHandler}>Delete</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};

export default TableDropdownMenu;
