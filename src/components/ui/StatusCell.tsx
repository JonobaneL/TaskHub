import { statusLables } from "@/data/statusLables";
import { CellContext } from "@tanstack/react-table";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";
import StatusLableList from "../StatusLableList";
import { useState } from "react";
import { TaskParams } from "@/models/projectTypes";

type ColumnProps = {
  options: CellContext<TaskParams, unknown>;
};

const StatusCell = ({ options }: ColumnProps) => {
  const { table, column, row } = options;
  const color = statusLables.find(
    (item) => item.name === row.original.status
  )?.color; //change it
  const [isOpen, setIsOpen] = useState(false);
  const handler = (value: string) => {
    table.options.meta?.updateData(row.index, column.id, value);
  };
  return (
    <div className="min-w-32">
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>
          <div
            style={{ backgroundColor: color }}
            className=" h-9 cursor-pointer px-4 capitalize text-center leading-9 text-background font-semibold"
          >
            {row.original.status}
          </div>
        </PopoverTrigger>
        <PopoverContent className="w-fit rounded-sm shadow-md ">
          <StatusLableList
            onChange={handler}
            closeHandler={() => setIsOpen(false)}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default StatusCell;
