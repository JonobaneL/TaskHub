import { Button } from "./ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import filter from "../assets/images/filter.svg";
import { useTableContex } from "@/context/TableContext";
import StatusFilters from "./StatusFilters";
import PriorityFilters from "./PriorityFilters";
import NotesFilters from "./NotesFilters";
import GroupFilters from "./GroupFilters";
import DueDateFilters from "./DueDateFilters";

const ColumnsFilters = () => {
  const { columnFilters, groupsFilter } = useTableContex();

  const isActive =
    columnFilters.some((item) => item.value.length > 0 && item.id !== "task") ||
    groupsFilter.length > 0;
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          className={`h-8 p-2 rounded-sm font-medium text-text font-main text-[0.8rem] ${
            isActive ? "bg-accent" : ""
          }`}
        >
          <img src={filter} alt="filter" className="mr-1" />
          Filter
        </Button>
      </PopoverTrigger>
      <PopoverContent align="end" className="w-fit flex gap-4">
        <GroupFilters />
        <StatusFilters />
        <DueDateFilters />
        <PriorityFilters />
        <NotesFilters />
      </PopoverContent>
    </Popover>
  );
};

export default ColumnsFilters;
