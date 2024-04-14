import { Popover, PopoverContent, PopoverTrigger } from "./popover";
import StatusLableList from "../StatusLableList";
import { useState } from "react";
import { CellDefaultProps } from "@/models/projectTypes";
import { useTypeSelector } from "@/hooks/useReduxHooks";
import priorityIcon from "../../assets/images/priority-add.svg";

const PriorityCell = ({ options }: CellDefaultProps) => {
  //modifie component
  const { project } = useTypeSelector((state) => state.projectReducer);
  const { table, column, row, getValue } = options;
  const color = project.priority_labels?.find(
    (item) => item.name === row.original.priority
  )?.color;
  const [isOpen, setIsOpen] = useState(false);
  const handler = (value: string) => {
    // const currentStatus = row.original.status;
    // if (currentStatus !== value) {
    //   table.options.meta?.updateData(row.index, column.id, value);
    // }
  };
  return (
    <div className="h-full">
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>
          {row.original?.priority ? (
            <div
              style={{ backgroundColor: color }}
              className="h-full cursor-pointer px-4 capitalize text-center leading-9 text-background font-semibold"
            >
              {row.original?.priority}
            </div>
          ) : (
            <div className="w-full h-9 p-1 group">
              <div className="w-full h-full group-hover:border border-grey-500 flex items-center justify-center cursor-pointer">
                <img
                  className="w-5 opacity-0 group-hover:opacity-100 transition"
                  src={priorityIcon}
                  alt="add date"
                />
              </div>
            </div>
          )}
        </PopoverTrigger>
        <PopoverContent className="w-fit rounded-sm shadow-md ">
          <StatusLableList
            //modifie component
            onChange={handler}
            closeHandler={() => setIsOpen(false)}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default PriorityCell;
