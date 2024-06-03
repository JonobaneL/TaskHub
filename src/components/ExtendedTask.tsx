import { Row } from "@tanstack/react-table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { TaskParams } from "@/models/projectTypes";
import TaskDetails from "./TaskDetails";
import TaskComments from "./TaskComments";

type TaskProps = {
  row: Row<TaskParams>;
  tab: string;
};

const ExtendedTask = ({ row, tab }: TaskProps) => {
  return (
    <Tabs defaultValue={tab}>
      <TabsList className="grid w-full grid-cols-2 h-fit rounded-md">
        <TabsTrigger value="details" className="h-8 rounded-md">
          Details
        </TabsTrigger>
        <TabsTrigger value="comments" className="h-8 rounded-md">
          Comments
        </TabsTrigger>
      </TabsList>
      <TabsContent value="details">
        <TaskDetails row={row} />
      </TabsContent>
      <TabsContent value="comments">
        <TaskComments task={row.original} />
      </TabsContent>
    </Tabs>
  );
};

export default ExtendedTask;
