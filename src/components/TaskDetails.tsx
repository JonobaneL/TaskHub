import { TaskParams } from "@/models/projectTypes";
import { Textarea } from "./ui/textarea";
import { Row } from "@tanstack/react-table";
import { dateFormating } from "@/utils/dateFormating";
import { getLabelsColors } from "@/utils/getLabelsColors";
type TaskProps = {
  row: Row<TaskParams>;
};

const TaskDetails = ({ row }: TaskProps) => {
  const { notes, status, priority, due_date } = row.original;
  const { statusColor, priorityColor } = getLabelsColors(status, priority);
  // think about content in this component
  return (
    <div>
      <div className="text-right my-2">
        <p className="text-sm text-slate-600 font-main">
          Last Update: <span className="font-medium">27 May</span>
        </p>
      </div>
      <Textarea value={notes} className="min-h-32" readOnly />
      <div className="my-5 flex justify-between">
        <div className="space-y-2">
          <p className="text-sm text-slate-600 font-main">Status</p>
          <div
            className="px-4 py-1 w-fit rounded-sm text-white capitalize text-sm"
            style={{ background: statusColor }}
          >
            {status}
          </div>
        </div>
        <div className="space-y-2">
          <p className="text-sm text-slate-600 font-main">Due date</p>
          <div className="py-1 w-fit rounded-sm capitalize text-sm">
            {dateFormating(due_date)}
          </div>
        </div>
        <div className="space-y-2">
          <p className="text-sm text-slate-600 font-main">Priority</p>
          <div
            className="px-4 py-1 w-fit rounded-sm text-white capitalize text-sm"
            style={{ background: priorityColor }}
          >
            {priority}
          </div>
        </div>
      </div>

      <div className="text-right mt-2">
        <p className="text-sm text-slate-600 font-main">
          Author: <span className="font-medium">Nick Grayson</span>
        </p>
      </div>
    </div>
  );
};

export default TaskDetails;
