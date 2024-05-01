import { Popover, PopoverContent, PopoverTrigger } from "./popover";
import LablesList from "../LablesList";
import { useState } from "react";
import { CellDefaultProps } from "@/models/projectTypes";
import { useTypeSelector } from "@/hooks/useReduxHooks";

const StatusCell = ({ options }: CellDefaultProps) => {
  const { project } = useTypeSelector((state) => state.projectReducer);
  const { table, column, row } = options;
  const color = project.status_lables?.find(
    (item) => item.name === row.original.status
  )?.color;
  const [isOpen, setIsOpen] = useState(false);
  const handler = (value: string) => {
    const currentStatus = row.original.status;
    if (currentStatus !== value) {
      table.options.meta?.updateData(row.index, column.id, value);
    }
  };
  return (
    <div className="h-full">
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>
          <div
            style={{ backgroundColor: color }}
            className="h-full cursor-pointer px-4 capitalize text-center leading-9 text-background font-semibold"
          >
            {row.original.status}
          </div>
        </PopoverTrigger>
        <PopoverContent className="w-fit rounded-sm shadow-md ">
          <LablesList
            lables={project.status_lables}
            onChange={handler}
            closeHandler={() => setIsOpen(false)}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default StatusCell;
