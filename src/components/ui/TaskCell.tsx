import { Row } from "@tanstack/react-table";
import { TaskParams } from "@/models/projectTypes";
import ExtendedTask from "../ExtendedTask";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./sheet";
import TaskHeader from "../TaskHeader";
import { useState } from "react";

type CellProps = {
  row: Row<TaskParams>;
};
const TaskCell = ({ row }: CellProps) => {
  const { task, commentsID } = row.original;
  const [tab, setTab] = useState("details");
  return (
    <Sheet>
      <SheetTrigger asChild>
        <div>
          <TaskHeader task={task} commnets={commentsID} setTab={setTab} />
        </div>
      </SheetTrigger>
      <SheetContent className="overflow-auto min-w-[30rem]">
        <SheetHeader className="mb-4">
          <SheetTitle className="text-primary">{task}</SheetTitle>
        </SheetHeader>
        <ExtendedTask row={row} tab={tab} />
      </SheetContent>
    </Sheet>
  );
};

export default TaskCell;
