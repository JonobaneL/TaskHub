import SelectColumnHeader from "@/components/ui/SelectColumnHeader";
import { ColumnDef } from "@tanstack/react-table";
import SelectCell from "@/components/ui/SelectCell";
import TaskCell from "@/components/ui/TaskCell";
import { TaskParams } from "@/models/projectTypes";
import StatusCell from "@/components/ui/StatusCell";
import DueDateCell from "@/components/ui/DueDateCell";
import PriorityCell from "@/components/ui/PriorityCell";

export const taskTableColumns = [
  {
    accessorKey: "selected",
    header: ({ table }) => <SelectColumnHeader table={table} />,
    cell: ({ row }) => <SelectCell row={row} />,
    enableSorting: false,
    enableHiding: false,
    size: 2.25,
    minSize: 2.25,
  },
  {
    accessorKey: "task",
    header: "Task",
    cell: ({ row }) => <TaskCell row={row} />,
    size: 22,
    minSize: 22,
  },

  {
    accessorKey: "status",
    header: "Status",
    cell: (props) => <StatusCell options={props} />,
    size: 11,
    minSize: 10,
  },
  {
    accessorKey: "due_date",
    header: "Due-date",
    cell: (props) => <DueDateCell options={props} />,
    size: 10,
    minSize: 10,
  },
  {
    accessorKey: "priority",
    header: "Priority",
    cell: (props) => <PriorityCell options={props} />,
    size: 10,
    minSize: 10,
  },
  {
    accessorKey: "notes",
    header: "Note",
    cell: (props) => (
      <div className="min-w-36 px-4 text-center min-w-24">
        {props.getValue() as string}
      </div>
    ),
    size: 10,
    minSize: 10,
  },
] as ColumnDef<TaskParams>[];
