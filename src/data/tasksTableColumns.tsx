import { ColumnDef, Row } from "@tanstack/react-table";
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
import {
  dueDateFilterEvent,
  dueDateSortingEvent,
  notesFilterEvent,
  priorityFilterEvent,
  statusFilterEvent,
} from "@/utils/columnsEvents";

export const taskTableColumns = [
  {
    accessorKey: "selected",
    header: ({ table }) => <SelectHeaderCell table={table} />,
    cell: ({ row }) => <SelectCell row={row} />,
    enableSorting: false,
    enableHiding: false,
    enableColumnFilter: false,
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
    enableColumnFilter: true,
    enableSorting: true,
    filterFn: "includesString",
  },

  {
    accessorKey: "status",
    header: "Status",
    cell: (props) => <StatusCell options={props} />,
    size: 10, //rem
    minSize: 10,
    footer: ({ table }) => <StatusFooterCell table={table} />,
    enableColumnFilter: true,
    enableSorting: false,
    filterFn: statusFilterEvent,
  },
  {
    accessorKey: "due_date",
    header: "Due date",
    cell: (props) => <DueDateCell options={props} />,
    size: 9, //rem
    minSize: 9,
    footer: ({ table }) => <DateFooterCell table={table} />,
    enableColumnFilter: true,
    sortingFn: dueDateSortingEvent,
    filterFn: dueDateFilterEvent,
  },
  {
    accessorKey: "priority",
    header: "Priority",
    cell: (props) => <PriorityCell options={props} />,
    size: 9, //rem
    minSize: 9,
    enableColumnFilter: true,
    sortingFn: "text",
    footer: ({ table }) => <PriorityFooterCell table={table} />,
    filterFn: priorityFilterEvent,
  },
  {
    accessorKey: "notes",
    header: "Notes",
    cell: (props) => <NoteCell options={props} />,
    size: 10, //rem
    minSize: 10,
    enableColumnFilter: true,
    enableSorting: false,
    filterFn: notesFilterEvent,
  },
] as ColumnDef<TaskParams>[];
