import SelectColumnHeader from "@/components/ui/SelectColumnHeader";
import { TaskType } from "./tableTest";
import { ColumnDef } from "@tanstack/react-table";
import SelectColumnCell from "@/components/ui/SelectColumnCell";
import TaskColumn from "@/components/ui/TaskColumn";
import StatusColumn from "@/components/ui/StatusColumn";

export const todoColumns = [
  {
    accessorKey: "selected",
    header: ({ table }) => <SelectColumnHeader table={table} />,
    cell: ({ row }) => <SelectColumnCell row={row} />,
    enableSorting: false,
    enableHiding: false,
    maxSize: 9,
  },
  {
    accessorKey: "task",
    header: "Task",
    cell: ({ row }) => <TaskColumn row={row} />,
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: (props) => <StatusColumn options={props} />,
  },
  {
    accessorKey: "due-date",
    header: "Due-date",
    cell: (props) => {
      const newDate = props.getValue() as string;
      return (
        <div className="min-w-28 px-4 h-full leading-9 text-center">
          {newDate.slice(0, 10)}
        </div>
      );
    },
  },
  {
    accessorKey: "priority",
    header: "Priority",
    cell: (props) => (
      <div className="min-w-24 capitalize px-4 text-center">
        {props.getValue() as string}
      </div>
    ),
  },
  {
    accessorKey: "note",
    header: "Note",
    cell: (props) => (
      <div className="min-w-28 px-4 text-center min-w-24">
        {props.getValue() as string}
      </div>
    ),
  },
] as ColumnDef<TaskType>[];
