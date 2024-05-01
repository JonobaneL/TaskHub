import { Button } from "./ui/button";
import magGlass from "../assets/images/mag-glass.svg";
import filter from "../assets/images/filter.svg";
import edit from "../assets/images/edit.svg";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import NewTaskForm from "./NewTaskForm";
import { useState } from "react";

const TablesNav = () => {
  const [newTask, setNewTask] = useState(false);
  return (
    <nav className="flex justify-between w-full space-x-2 mt-4 mb-4">
      <div className="w-fit space-x-2">
        <Sheet open={newTask} onOpenChange={setNewTask}>
          <SheetTrigger asChild>
            <Button className="h-8 p-2 font-medium text-background text-[0.8rem] font-main rounded-sm">
              New task
            </Button>
          </SheetTrigger>
          <SheetContent
            style={{ width: "26rem", maxWidth: "28rem" }}
            className="overflow-auto"
          >
            <SheetHeader className="mb-4">
              <SheetTitle className="text-primary">New Task</SheetTitle>
              <SheetDescription>
                Fill out the form below to add a new task to your project. Stay
                organized and keep track of your tasks with TaskHub!
              </SheetDescription>
            </SheetHeader>
            <NewTaskForm onClose={() => setNewTask(false)} />
          </SheetContent>
        </Sheet>

        <Button
          variant="secondary"
          className="h-8 p-2 rounded-sm font-medium text-text font-main text-[0.8rem] bg-secondary/20"
        >
          New group
        </Button>
      </div>
      <div className="w-fit h-10 space-x-1.5">
        <Button
          variant="ghost"
          className="h-8 p-2 rounded-sm font-medium text-text font-main text-[0.8rem]"
        >
          <img src={magGlass} alt="mag-glass" className="mr-1" />
          Search
        </Button>
        <Button
          variant="ghost"
          className="h-8 p-2 rounded-sm font-medium text-text font-main text-[0.8rem]"
        >
          <img src={filter} alt="filter" className="mr-1" />
          Filter
        </Button>
        <Button
          variant="ghost"
          className="h-8 p-2 rounded-sm font-medium text-text font-main text-[0.8rem]"
        >
          <img src={edit} alt="edit" className="mr-1" />
          Edit
        </Button>
      </div>
    </nav>
  );
};

export default TablesNav;
