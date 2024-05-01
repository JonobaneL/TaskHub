import { CellDefaultProps } from "@/models/projectTypes";
import calendarIcon from "../../assets/images/calendar-add.svg";
import { useState } from "react";
import DateSelect from "./DateSelect";
import HoverEditButton from "./HoverEditButton";

const DueDateCell = ({ options }: CellDefaultProps) => {
  const { table, column, row } = options;
  const date = options.getValue() as string | null;
  const [calendarDate, setCalendarDate] = useState(date || "");
  const dateString = calendarDate?.split(" ") || "";
  const dateToShow = calendarDate ? dateString[2] + " " + dateString[1] : "";
  const updateHandler = () => {
    if (date !== calendarDate) {
      table.options.meta?.updateData(
        row.index,
        column.id,
        calendarDate || null
      );
    }
  };

  return (
    <div className="group w-full h-full">
      <DateSelect
        defaultValue={date}
        onChange={setCalendarDate}
        onBlur={updateHandler}
      >
        {calendarDate ? (
          <div className="w-full h-full p-1">
            <div className="w-full h-full group-hover:border border-grey-500 flex items-center justify-center cursor-pointer">
              <p>{dateToShow}</p>
            </div>
          </div>
        ) : (
          <div className="h-full">
            <HoverEditButton img={calendarIcon} />
          </div>
        )}
      </DateSelect>
    </div>
  );
};

export default DueDateCell;
