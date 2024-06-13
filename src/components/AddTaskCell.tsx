import { TableCell } from "./ui/table";
import { useState } from "react";
import { TableTanstack } from "@/models/projectTypes";

const AddTaskCell = ({ table }: TableTanstack) => {
  const [task, setTask] = useState("");
  const addTaskHandler = async () => {
    if (task) {
      table.options.meta?.addTask({ task });
      setTask("");
    }
  };
  return (
    <TableCell className="p-1 h-9">
      <div className="w-full h-full hover:ring-1 px-1 hover:ring-gray-300 rounded-[1px] flex items-center cursor-text gap-2">
        <input
          value={task}
          onChange={(e) => setTask(e.target.value)}
          onBlur={addTaskHandler}
          type="text"
          placeholder="+ Add task"
          className="bg-transparent font-normal w-full focus:outline-none focus:ring-0"
        />
      </div>
    </TableCell>
  );
};

export default AddTaskCell;
