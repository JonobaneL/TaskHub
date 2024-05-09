import { Popover, PopoverContent, PopoverTrigger } from "./popover";
import LablesList from "../LablesList";
import { useState } from "react";
import { CellDefaultProps } from "@/models/projectTypes";
import { useTypeSelector } from "@/hooks/useReduxHooks";
import priorityIcon from "../../assets/images/priority-add.svg";
import HoverEditButton from "./HoverEditButton";

const PriorityCell = ({ options }: CellDefaultProps) => {
  const { project } = useTypeSelector((state) => state.projectReducer);
  const { table, column, row } = options;
  const color = project.priority_lables?.find(
    (item) => item.name === row.original.priority
  )?.color;
  const [isOpen, setIsOpen] = useState(false);
  const handler = (value: string) => {
    const currentPriority = row.original.priority;
    if (currentPriority !== value) {
      table.options.meta?.updateData(row.index, column.id, value);
    }
  };
  return (
    <div className="h-full">
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>
          {row.original?.priority ? (
            <div
              style={{ backgroundColor: color }}
              className="h-full cursor-pointer px-4 capitalize text-center leading-9 text-background"
            >
              {row.original?.priority}
            </div>
          ) : (
            <div className="h-full">
              <HoverEditButton img={priorityIcon} />
            </div>
          )}
        </PopoverTrigger>
        <PopoverContent className="w-fit rounded-sm shadow-md ">
          <LablesList
            lables={project.priority_lables}
            onChange={handler}
            closeHandler={() => setIsOpen(false)}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default PriorityCell;
