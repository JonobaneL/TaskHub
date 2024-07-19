import { Popover, PopoverContent, PopoverTrigger } from "./popover";
import Labels from "../Labels";
import { useState } from "react";
import { CellDefaultProps } from "@/models/projectTypes";
import { useTypeSelector } from "@/hooks/useReduxHooks";
import { getLabel } from "@/utils/getLabel";
import { useCellEvent } from "@/hooks/useCellEvent";

const StatusCell = ({ options }: CellDefaultProps) => {
  const { project } = useTypeSelector((state) => state.projectReducer);
  const { table, column, row } = options;
  const { statusLabel } = getLabel(row.original.status, null);
  const [isOpen, setIsOpen] = useState(false);
  const { updateEvent } = useCellEvent(table, row.index, column.id);
  const handler = (value: string) => {
    updateEvent(row.original.status, value);
  };
  const isSelected = row.getIsSelected();
  return (
    <div
      className={`h-full ${isSelected ? "hover:border-2 border-accent-b" : ""}`}
    >
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>
          <div
            style={{ backgroundColor: statusLabel?.color }}
            className="h-full cursor-pointer px-4 capitalize flex items-center justify-center text-background"
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
