import { cn } from "@/lib/utils";
import { TaskParams } from "@/models/projectTypes";
import { CellContext } from "@tanstack/react-table";
import { useState } from "react";

type EditProps = {
  options: CellContext<TaskParams, unknown>;
  className?: string | undefined;
};

const TaskEdit = ({ options, className }: EditProps) => {
  const { table, row, column } = options;
  const { task } = row.original;
  const [edit, setEdit] = useState(false);
  const blurHandler = (e: React.FocusEvent<HTMLInputElement, Element>) => {
    const updatedTask = e.target.value;
    if (updatedTask && updatedTask !== task)
      table.options.meta?.updateData(row.index, column.id, updatedTask);
    setEdit(false);
  };
  if (edit)
    return (
      <input
        defaultValue={task}
        className={cn(
          "w-full py-0.5 px-1 bg-transparent focus:outline-none ring-1 ring-gray-300 rounded-[2px]",
          className
        )}
        autoFocus
        onBlur={blurHandler}
      />
    );

  return (
    <p
      onClick={(e) => {
        e.stopPropagation();
        setEdit(true);
      }}
      className={cn(
        "w-fit hover:ring-1 ring-gray-300 py-0.5 px-1 rounded-[2px] text-nowrap truncate",
        className
      )}
    >
      {task}
    </p>
  );
};

export default TaskEdit;
