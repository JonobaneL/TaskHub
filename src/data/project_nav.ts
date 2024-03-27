import tableIcon from "../assets/images/project-nav/tables.svg";
import boardsIcon from "../assets/images/project-nav/boards.svg";
import calendarIcon from "../assets/images/project-nav/calendar.svg";

export const project_nav = [
  {
    title: "Tables",
    icon: tableIcon,
    link: "tables",
  },
  {
    title: "Boards",
    icon: boardsIcon,
    link: "boards",
  },
  {
    title: "Calendar",
    icon: calendarIcon,
    link: "calendar",
  },
] as const;
