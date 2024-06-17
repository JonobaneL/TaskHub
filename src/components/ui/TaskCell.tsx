import { CellContext } from "@tanstack/react-table";
import { TaskParams } from "@/models/projectTypes";
import ExtendedTask from "../ExtendedTask";
import { Sheet, SheetContent, SheetHeader } from "./sheet";
import TaskHeader from "../TaskHeader";
import { useState } from "react";
import TaskEdit from "./TaskEdit";
import ExtendedTaskNav from "../ExtendedTaskNav";
import TaskEditForm from "../TaskEditForm";

type CellProps = {
  options: CellContext<TaskParams, unknown>;
};
type InfoParams = {
  open: boolean;
  tab: "details" | "comments";
};
const TaskCell = ({ options }: CellProps) => {
  const [info, setInfo] = useState<InfoParams>({ open: false, tab: "details" });
  const [isEdit, setIsEdit] = useState(false);
  const sheetHandler = (open: boolean) => {
    setInfo((p) => {
      return { ...p, open };
    });
  };
  return (
    <Sheet open={info.open} onOpenChange={sheetHandler}>
      <TaskHeader options={options} openHandler={setInfo} />
      <SheetContent
        closeBtn={false}
        className="overflow-auto min-w-[32rem]"
        onContextMenu={(e) => {
          e.stopPropagation();
        }}
      >
        <SheetHeader className="mb-4">
          <ExtendedTaskNav
            closeHandler={sheetHandler}
            options={options}
            editHandler={setIsEdit}
            edit={isEdit}
          />
          {!isEdit && (
            <TaskEdit
              options={options}
              className="text-wrap text-primary text-lg font-semibold"
            />
          )}
        </SheetHeader>
        {!isEdit ? (
          <ExtendedTask row={options.row} tab={info.tab} />
        ) : (
          <TaskEditForm options={options} onClose={setIsEdit} />
        )}
      </SheetContent>
    </Sheet>
  );
};

export default TaskCell;
