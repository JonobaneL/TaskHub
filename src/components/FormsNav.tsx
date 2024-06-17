import { useState } from "react";
import { Button } from "./ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import TaskForm from "./TaskForm";
import NewGroupForm from "./NewGroupForm";
import { TaskFormParams } from "@/models/formTypes";
import { useTypeDispatch, useTypeSelector } from "@/hooks/useReduxHooks";
import { addNewTask } from "@/store/thunks/tasksThunks";

const FormsNav = () => {
  const [newTask, setNewTask] = useState(false);
  const [newGroup, setNewGroup] = useState(false);
  const { project } = useTypeSelector((state) => state.projectReducer);
  const dispatch = useTypeDispatch();
  const addTaskHandler = (data: TaskFormParams) => {
    const tableID =
      project?.tables?.find((item) => item.main == true)?.id || "";
    dispatch(addNewTask({ ...data, tableID: tableID }));
  };
  return (
    <div className="w-fit space-x-2">
      <Sheet open={newTask} onOpenChange={setNewTask}>
        <SheetTrigger asChild>
          <Button className="h-8 p-2 font-medium text-background text-[0.8rem] font-main rounded-sm">
            New task
          </Button>
        </SheetTrigger>
        <SheetContent
          style={{ minWidth: "26rem", maxWidth: "28rem" }}
          className="overflow-auto"
        >
          <SheetHeader className="mb-4">
            <SheetTitle className="text-primary">New Task</SheetTitle>
            <SheetDescription>
              Fill out the form below to add a new task to your project. Stay
              organized and keep track of your tasks with TaskHub!
            </SheetDescription>
          </SheetHeader>
          <TaskForm
            onClose={() => setNewTask(false)}
            btnContent="Add Task"
            submitHandler={addTaskHandler}
          />
        </SheetContent>
      </Sheet>

      <Sheet open={newGroup} onOpenChange={setNewGroup}>
        <SheetTrigger asChild>
          <Button
            variant="secondary"
            className="h-8 p-2 rounded-sm font-medium text-text font-main text-[0.8rem] bg-secondary/20"
          >
            New group
          </Button>
        </SheetTrigger>
        <SheetContent
          style={{ width: "26rem", maxWidth: "28rem" }}
          className="overflow-auto"
        >
          <SheetHeader className="mb-4">
            <SheetTitle className="text-primary">New Group</SheetTitle>
            <SheetDescription>
              Fill out the form below to add a new table to your project. Stay
              organized and keep track of your tasks with TaskHub!
            </SheetDescription>
          </SheetHeader>
          <NewGroupForm onClose={() => setNewGroup(false)} />
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default FormsNav;
