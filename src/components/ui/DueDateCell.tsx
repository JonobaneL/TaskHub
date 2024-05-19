import { CellDefaultProps } from "@/models/projectTypes";
import calendarIcon from "../../assets/images/calendar-add.svg";
import { useState } from "react";
import DateSelect from "./DateSelect";
import HoverEditButton from "./HoverEditButton";
import DateStatus from "../DateStatus";
import removeIcon from "../../assets/images/remove.svg";

const DueDateCell = ({ options }: CellDefaultProps) => {
  const { table, column, row } = options;
  const { status, due_date } = row.original;
  const [calendarDate, setCalendarDate] = useState(due_date || "");
  const dateString = due_date?.split(" ") || "";
  const dateToShow = due_date ? dateString[2] + " " + dateString[1] : "";
  const updateHandler = () => {
    if (due_date !== calendarDate) {
      table.options.meta?.updateData(
        row.index,
        column.id,
        calendarDate || null
      );
    }
  };
  const removeHandler = (e: React.MouseEvent<HTMLImageElement, MouseEvent>) => {
    e.stopPropagation();
    table.options.meta?.updateData(row.index, column.id, null);
  };
  return (
    <div className="group w-full h-full">
      <DateSelect
        defaultValue={due_date}
        onChange={setCalendarDate}
        onBlur={updateHandler}
      >
        {due_date ? (
          <div className="w-full h-full flex items-center justify-center cursor-pointer relative">
            <DateStatus row={row} />
            <p className={`${status == "done" && "line-through"}`}>
              {dateToShow}
            </p>
            <img
              src={removeIcon}
              onClick={(e) => removeHandler(e)}
              className="w-[1.1rem] h-[1.1rem] absolute right-2 opacity-0 group-hover:opacity-100 cursor-pointer"
              alt="remove"
            />
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
