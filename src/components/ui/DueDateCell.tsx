import { CellDefaultProps } from "@/models/projectTypes";
import calendarIcon from "../../assets/images/calendar-add.svg";
import DateSelect from "./DateSelect";
import HoverEditButton from "./HoverEditButton";
import DateStatus from "../DateStatus";
import removeIcon from "../../assets/images/remove.svg";
import { dateFormating } from "@/utils/dateFormating";
import { useTypeSelector } from "@/hooks/useReduxHooks";

const DueDateCell = ({ options }: CellDefaultProps) => {
  const { table, column, row } = options;
  const { status, due_date } = row.original;
  const { project } = useTypeSelector((state) => state.projectReducer);
  const defaultLabel = project.status_labels?.find(
    (item) => item?.role == "done"
  )?.labelID;
  const updateHandler = (value: string) => {
    const currentDate = value.slice(4, 15);
    if (due_date !== currentDate && value) {
      table.options.meta?.updateData(row.index, column.id, currentDate);
    }
  };
  const removeHandler = (e: React.MouseEvent<HTMLImageElement, MouseEvent>) => {
    e.stopPropagation();
    table.options.meta?.updateData(row.index, column.id, null);
  };
  return (
    <div className="group w-full h-full">
      <DateSelect defaultValue={due_date || ""} onChange={updateHandler}>
        {due_date ? (
          <div className="w-full h-full flex items-center justify-center cursor-pointer relative">
            <DateStatus row={row} />
            <p className={`${status == defaultLabel && "line-through"}`}>
              {dateFormating(due_date)}
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
