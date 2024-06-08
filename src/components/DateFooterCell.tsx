import { TableTanstack } from "@/models/projectTypes";
import { useState } from "react";
import DateFooterCellContent from "./DateFooterCellContent";
import { useTableDates } from "@/hooks/useTableDates";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

const DateFooterCell = ({ table }: TableTanstack) => {
  const { date } = useTableDates(table.options.meta?.tableID);
  const dueDateTypes = ["Range", "Earliest", "Latest"];
  const [type, setType] = useState(dueDateTypes[0]);
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="h-full w-full p-1.5">
      <DropdownMenu
        open={isOpen}
        onOpenChange={(value) => date?.startDate && setIsOpen(value)}
      >
        <DropdownMenuTrigger asChild>
          <div className="h-full">
            <DateFooterCellContent
              type={type}
              tableID={table.options.meta?.tableID}
            />
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent hideWhenDetached={false}>
          <DropdownMenuRadioGroup value={type} onValueChange={setType}>
            {dueDateTypes.map((item, index) => (
              <DropdownMenuRadioItem key={index} value={item}>
                {item}
              </DropdownMenuRadioItem>
            ))}
          </DropdownMenuRadioGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default DateFooterCell;
