import { Button } from "./ui/button";
import filterIcon from "../assets/images/filter.svg";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { IoMdCloseCircleOutline } from "react-icons/io";
import { ColumnFiltersParams } from "@/models/TableTypes";

type FilterProps = {
  filters: ColumnFiltersParams;
  onFilter: (role: string) => void;
  clearRole: () => void;
};

const RoleFilters = ({ filters, onFilter, clearRole }: FilterProps) => {
  const roles = ["admin", "member", "guest"];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className={`h-8 p-2 rounded-sm font-medium text-text font-main text-[0.8rem]`}
        >
          <img src={filterIcon} alt="filter" className="mr-1" />
          Filter
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel className="flex items-center justify-between">
          <p className="font-main font-medium">Role</p>
          {filters.role.length > 0 && (
            <IoMdCloseCircleOutline
              className="cursor-pointer"
              size="1.1rem"
              color="#6B6B6B"
              onClick={clearRole}
            />
          )}
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        {roles.map((item, index) => (
          <DropdownMenuCheckboxItem
            checked={filters.role.includes(item)}
            onSelect={(e) => {
              e.preventDefault();
              onFilter(item);
            }}
            key={index}
            className="capitalize font-main"
          >
            {item}
          </DropdownMenuCheckboxItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default RoleFilters;
