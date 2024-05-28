import { ColumnDef } from "@tanstack/react-table";
import SelectCell from "@/components/ui/SelectCell";
import TaskCell from "@/components/ui/TaskCell";
import { TaskParams } from "@/models/projectTypes";
import StatusCell from "@/components/ui/StatusCell";
import DueDateCell from "@/components/ui/DueDateCell";
import PriorityCell from "@/components/ui/PriorityCell";
import NoteCell from "@/components/ui/NoteCell";
import StatusFooterCell from "@/components/StatusFooterCell";
import PriorityFooterCell from "@/components/PriorityFooterCell";
import DateFooterCell from "@/components/DateFooterCell";
import SelectHeaderCell from "@/components/ui/SelectHeaderCell";

export const taskTableColumns = [
  {
    accessorKey: "selected",
    header: ({ table }) => <SelectHeaderCell table={table} />,
    cell: ({ row }) => <SelectCell row={row} />,
    enableSorting: false,
    enableHiding: false,
    size: 2.25, //rem
    minSize: 2.25,
  },
  {
    accessorKey: "task",
    header: "Task",
    cell: ({ row }) => <TaskCell row={row} />,
    size: 22, //rem
    minSize: 22,
    enableHiding: false,
  },

  {
    accessorKey: "status",
    header: "Status",
    cell: (props) => <StatusCell options={props} />,
    size: 10, //rem
    minSize: 10,
    footer: ({ table }) => <StatusFooterCell table={table} />,
  },
  {
    accessorKey: "due_date",
    header: "Due date",
    cell: (props) => <DueDateCell options={props} />,
    size: 9, //rem
    minSize: 9,
    footer: ({ table }) => <DateFooterCell table={table} />,
  },
  {
    accessorKey: "priority",
    header: "Priority",
    cell: (props) => <PriorityCell options={props} />,
    size: 9, //rem
    minSize: 9,
    footer: ({ table }) => <PriorityFooterCell table={table} />,
  },
  {
    accessorKey: "notes",
    header: "Note",
    cell: (props) => <NoteCell options={props} />,
    size: 10, //rem
    minSize: 10,
  },
] as ColumnDef<TaskParams>[];
