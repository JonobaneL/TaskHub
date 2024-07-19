import { CellDefaultProps } from "@/models/projectTypes";
import calendarIcon from "../../assets/images/calendar-add.svg";
import DateSelect from "./DateSelect";
import HoverEditButton from "./HoverEditButton";
import DateStatus from "../DateStatus";
import { dateFormating } from "@/utils/dateFormating";
import { useTypeSelector } from "@/hooks/useReduxHooks";
import { IoCloseCircleOutline } from "react-icons/io5";
import { useCellEvent } from "@/hooks/useCellEvent";

const DueDateCell = ({ options }: CellDefaultProps) => {
  const { table, column, row } = options;
  const { status, due_date } = row.original;
  const { project } = useTypeSelector((state) => state.projectReducer);
  const defaultLabel = project.status_labels?.find(
    (item) => item?.role == "done"
  )?.labelID;
  const { updateEvent, removeEvent } = useCellEvent(
    table,
    row.index,
    column.id
  );
  const updateHandler = (value: string) => {
    const currentDate = value.slice(4, 15);
    updateEvent(currentDate, value);
  };
  const removeHandler = (e: React.MouseEvent<SVGElement, MouseEvent>) => {
    e.stopPropagation();
    removeEvent();
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
            <IoCloseCircleOutline
              onClick={(e) => removeHandler(e)}
              size="1.4rem"
              className="absolute right-2 opacity-0 group-hover:opacity-100 cursor-pointer text-gray-500"
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
