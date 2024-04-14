import { TableCell } from "./ui/table";
import addIcon from "../assets/images/add-icon.svg";
import { useState } from "react";
import { Table } from "@tanstack/react-table";
import { TaskParams } from "@/models/projectTypes";

type CellProps = {
  table: Table<TaskParams>;
};

const AddTaskCell = ({ table }: CellProps) => {
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
        <img className="w-4 h-4" src={addIcon} alt="add" />
        <input
          value={task}
          onChange={(e) => setTask(e.target.value)}
          onBlur={addTaskHandler}
          type="text"
          placeholder="Add task"
          className="bg-transparent font-normal w-full"
        />
      </div>
    </TableCell>
  );
};

export default AddTaskCell;
