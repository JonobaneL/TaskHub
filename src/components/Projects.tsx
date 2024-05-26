import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import gridIcon from "../assets/images/header/box-icon.svg";
import { useTypeSelector } from "@/hooks/useReduxHooks";
import Loader from "./ui/Loader";
import { useNavigate } from "react-router-dom";

const Projects = () => {
  const { isLoading, user } = useTypeSelector((state) => state.userReducer);
  const navigate = useNavigate();
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
        {isLoading ? (
          <Loader type="fade" />
        ) : (
          user.projects?.map((item) => (
            <DropdownMenuItem
              className="flex items-center gap-2"
              key={item.id}
              onClick={() => navigate(`project/${item.id}/tables`)}
            >
              <div
                style={{ background: item.color }}
                className="w-8 h-8 font-main text-background text-center leading-8 font-medium rounded-sm"
              >
                {item.name?.slice(0, 1)}
              </div>
              <span className="font-main">{item.name}</span>
            </DropdownMenuItem>
          ))
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default Projects;
