import { Popover, PopoverContent, PopoverTrigger } from "./popover";
import Labels from "../Labels";
import { useState } from "react";
import { CellDefaultProps } from "@/models/projectTypes";
import { useTypeSelector } from "@/hooks/useReduxHooks";
import priorityIcon from "../../assets/images/priority-add.svg";
import HoverEditButton from "./HoverEditButton";
import { getLabelsColors } from "@/utils/getLabelsColors";

const PriorityCell = ({ options }: CellDefaultProps) => {
  const { project } = useTypeSelector((state) => state.projectReducer);
  const { table, column, row } = options;
  const { priorityColor } = getLabelsColors(null, row.original.priority);
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
              style={{ backgroundColor: priorityColor }}
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
          <Labels
            type="priority_labels"
            labels={project.priority_labels}
            onChange={handler}
            closeHandler={() => setIsOpen(false)}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default PriorityCell;
