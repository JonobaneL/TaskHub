import { TableTanstack } from "@/models/projectTypes";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { useState } from "react";
import RadioGroupList from "./RadioGroupList";
import DateFooterCellContent from "./DateFooterCellContent";
import { useTableDates } from "@/hooks/useTableDates";

const DateFooterCell = ({ table }: TableTanstack) => {
  const { date } = useTableDates(table.options.meta?.tableID);
  const dueDateTypes = ["Range", "Earliest", "Latest"];
  const [type, setType] = useState(dueDateTypes[0]);
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="h-full w-full p-1.5">
      <Popover
        open={isOpen}
        onOpenChange={(open) =>
          (date?.startDate || date?.endDate) && setIsOpen(open)
        }
      >
        <PopoverTrigger asChild>
          <div className="h-full">
            <DateFooterCellContent
              type={type}
              tableID={table.options.meta?.tableID}
            />
          </div>
        </PopoverTrigger>
        <PopoverContent className="w-52">
          <RadioGroupList
            currentValue={type}
            list={dueDateTypes}
            onChange={(value) => setType(value)}
            onClose={() => setIsOpen(false)}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default DateFooterCell;
