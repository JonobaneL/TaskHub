import {
  Command,
  CommandGroup,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "./ui/command";
import membersIcon from "../assets/images/project-nav/members.svg";
import settingsIcon from "../assets/images/project-nav/settings.svg";
import plusIcon from "../assets/images/project-nav/plus.svg";
import Helper from "./ui/Helper";
import { project_nav } from "@/data/project_nav";
import { useNavigate } from "react-router-dom";
import RecentUsersList from "./RecentUsersList";

const ProjectNav = () => {
  const navigate = useNavigate();
  return (
    <aside className="w-[18rem] h-fit flex-initial">
      <div className="flex items-center gap-[0.5rem] h-[3rem] mb-3 shadow-md p-2 rounded bg-[#fff] cursor-default">
        <div className="flex items-center justify-center h-full aspect-square bg-accent-y font-bold rounded-sm font-main text-base text-text">
          F
        </div>
        <h2 className="font-main font-medium">First project</h2>
      </div>
      <Command className="bg-background">
        <CommandList>
          <CommandGroup>
            {project_nav.map((item, index) => (
              <CommandItem
                key={index}
                className="flex items-center gap-2 py-2 cursor-pointer"
                onSelect={() => navigate(item.link)}
                value={item.title}
              >
                <img src={item.icon} alt={item.title} />
                <span className="font-main font-medium ">{item.title}</span>
              </CommandItem>
            ))}
          </CommandGroup>
          <CommandSeparator />
          <CommandGroup>
            <CommandItem className="grid grid-rows-[auto-1fr] aria-selected:bg-[none]">
              <div
                onClick={() => navigate("members")}
                className="grid items-center grid-cols-[auto_1fr_auto] gap-2 py-2  cursor-pointer"
              >
                <img src={membersIcon} alt="Members" />
                <span className="font-main font-medium">Members</span>
                <Helper content="Add new">
                  <img src={plusIcon} alt="plus" className="w-[0.8rem]" />
                </Helper>
              </div>
              <RecentUsersList />
            </CommandItem>
            <CommandItem
              className="flex items-center gap-2 py-2 cursor-pointer aria-selected:bg-[none]"
              onSelect={() => navigate("settings")}
            >
              <img src={settingsIcon} alt="Settings" />
              <span className="font-main font-medium">Settings</span>
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </Command>
    </aside>
  );
};

export default ProjectNav;
