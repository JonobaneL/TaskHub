import { useTypeSelector } from "@/hooks/useReduxHooks";
import { TableTanstack } from "@/models/projectTypes";
import { dateFormating } from "@/utils/dateFormating";
import { getDaysAmount } from "@/utils/getDaysAmount";
import { getStartEndDate } from "@/utils/getStartEndDate";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { useState } from "react";
import DateTypesGroup from "./DateTypesGroup";

const DateColumnFooter = ({ table }: TableTanstack) => {
  const { project } = useTypeSelector((state) => state.projectReducer);
  const taskTable = project.tables?.find(
    (item) => item.id === table.options.meta?.tableID
  );
  const date = getStartEndDate(taskTable?.tasks);
  const days = getDaysAmount(date?.startDate, date?.endDate);
  const dueDateTypes = ["Range", "Earliest", "Latest"];
  const [type, setType] = useState(dueDateTypes[0]);
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="h-full w-full p-1.5">
      <Popover open={isOpen} onOpenChange={() => setIsOpen((p) => !p)}>
        <PopoverTrigger asChild>
          <div className="group h-full flex items-center justify-center bg-accent-b rounded-[0.2rem] cursor-pointer text-sm">
            {type == "Range" ? (
              <>
                <p className="font-normal text-background group-hover:hidden ">
                  {dateFormating(date?.startDate)} -{" "}
                  {dateFormating(date?.endDate)}
                </p>
                {date?.startDate && (
                  <p className="font-normal text-background hidden group-hover:block">
                    {days} days
                  </p>
                )}
              </>
            ) : (
              <p className="font-normal text-background">
                {type == "Earliest"
                  ? dateFormating(date?.startDate)
                  : dateFormating(date?.endDate)}
              </p>
            )}
          </div>
        </PopoverTrigger>
        <PopoverContent className="w-52">
          <DateTypesGroup
            type={type}
            types={dueDateTypes}
            onChange={(value) => setType(value)}
            onClose={() => setIsOpen(false)}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default DateColumnFooter;
