import { Row } from "@tanstack/react-table";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "./ui/sheet";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { TaskParams } from "@/models/projectTypes";
import TaskDetails from "./TaskDetails";
import TaskChat from "./TaskChat";
import TaskUpdates from "./TaskUpdates";

type TaskProps = {
  row: Row<TaskParams>;
};

const ExtendedTask = ({ row }: TaskProps) => {
  const { task, conversation } = row.original;
  return (
    <Sheet>
      <SheetTrigger>
        <p className="h-fit">{task}</p>
      </SheetTrigger>
      <SheetContent style={{ minWidth: "30rem" }} className="overflow-auto">
        <SheetHeader className="mb-4">
          <SheetTitle className="text-primary">{task}</SheetTitle>
          <div className="h-4"></div>
          <Tabs defaultValue="details">
            <TabsList className="grid w-full grid-cols-2 h-fit rounded-md">
              <TabsTrigger value="details" className="h-8 rounded-md">
                Details
              </TabsTrigger>
              <TabsTrigger value="chat" className="h-8 rounded-md">
                Updates
              </TabsTrigger>
            </TabsList>
            <TabsContent value="details">
              <TaskDetails row={row} />
            </TabsContent>
            <TabsContent value="chat">
              {/* <TaskChat /> */}
              <TaskUpdates />
            </TabsContent>
          </Tabs>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
};

export default ExtendedTask;
