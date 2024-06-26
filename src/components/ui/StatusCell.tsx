import { Popover, PopoverContent, PopoverTrigger } from "./popover";
import Labels from "../Labels";
import { useState } from "react";
import { CellDefaultProps } from "@/models/projectTypes";
import { useTypeSelector } from "@/hooks/useReduxHooks";
import { getLabel } from "@/utils/getLabel";

const StatusCell = ({ options }: CellDefaultProps) => {
  const { project } = useTypeSelector((state) => state.projectReducer);
  const { table, column, row } = options;
  const { statusLabel } = getLabel(row.original.status, null);
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
            style={{ backgroundColor: statusLabel?.color }}
            className="h-full cursor-pointer px-4 capitalize text-center leading-9 text-background"
          >
            {statusLabel?.name}
          </div>
        </PopoverTrigger>
        <PopoverContent className="w-fit rounded-sm shadow-md ">
          <Labels
            type="status_labels"
            labels={project.status_labels}
            onChange={handler}
            closeHandler={() => setIsOpen(false)}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default StatusCell;
