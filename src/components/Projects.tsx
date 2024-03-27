import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import gridIcon from "../assets/images/header/box-icon.svg";

const Projects = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="p-[0.4rem] hover:bg-accent transition duration-150 rounded-sm ">
        <img src={gridIcon} alt="icon" className="h-[1.2rem]" />
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="start"
        className="w-[14rem] max-h-[15rem] mt-3 rounded-sm"
      >
        <DropdownMenuLabel className="font-main">Projects</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="flex items-center gap-2">
          <div className="w-8 h-8 bg-accent-y font-main text-text text-center leading-8 font-medium rounded-sm">
            F
          </div>
          <span className="font-main">First Project</span>
        </DropdownMenuItem>
        <DropdownMenuItem className="flex items-center gap-2">
          <div className="w-8 h-8 bg-accent-y font-main text-text text-center leading-8 font-medium rounded-sm">
            S
          </div>
          <span className="font-main">Second Project</span>
        </DropdownMenuItem>
        <DropdownMenuItem className="flex items-center gap-2">
          <div className="w-8 h-8 bg-accent-y font-main text-text text-center leading-8 font-medium rounded-sm">
            T
          </div>
          <span className="font-main">Third Project</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default Projects;
