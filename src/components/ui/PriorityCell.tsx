import { Popover, PopoverContent, PopoverTrigger } from "./popover";
import StatusLableList from "../StatusLableList";
import { useState } from "react";
import { CellDefaultProps } from "@/models/projectTypes";
import { useTypeSelector } from "@/hooks/useReduxHooks";

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
          <div
            style={{ backgroundColor: color || "transparent" }}
            className="h-full cursor-pointer px-4 capitalize text-center leading-9 text-background font-semibold"
          >
            {row.original?.priority}
          </div>
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
