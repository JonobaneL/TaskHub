import { CellDefaultProps } from "@/models/projectTypes";
import calendarIcon from "../../assets/images/calendar-add.svg";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";
import { Calendar } from "./calendar";
import { useState } from "react";

const DueDateCell = ({ options }: CellDefaultProps) => {
  const today = new Date(Date.now());
  const { table, column, row } = options;
  const date = options.getValue() as string | null;
  const [calendarDate, setCalendar] = useState<Date | undefined>(
    date ? new Date(date) : undefined
  );
  const shownDate = calendarDate?.toDateString()?.split(" ");
  const updateHandler = () => {
    if (date !== calendarDate?.toDateString()) {
      table.options.meta?.updateData(
        row.index,
        column.id,
        calendarDate?.toDateString() || null
      );
    }
  };
  return (
    <div className="group w-full h-9 p-1 ">
      <Popover>
        <PopoverTrigger asChild>
          <div className="w-full h-full group-hover:border border-grey-500 flex items-center justify-center cursor-pointer">
            {calendarDate ? (
              <p>{shownDate ? shownDate[2] + " " + shownDate[1] : ""}</p>
            ) : (
              <img
                className="w-5 opacity-0 group-hover:opacity-100 transition"
                src={calendarIcon}
                alt="add date"
              />
            )}
          </div>
        </PopoverTrigger>
        <PopoverContent onInteractOutside={updateHandler}>
          <Calendar
            mode="single"
            selected={calendarDate}
            onSelect={setCalendar}
            fromMonth={today}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default DueDateCell;
