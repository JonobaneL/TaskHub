import { ColumnDef } from "@tanstack/react-table";
import {
  columnFilterEvet,
  dueDateSortingEvent,
  nameSearch,
  nameSortingEvent,
} from "@/utils/columnsEvents";
import { MemberDetails } from "@/models/userTypes";
import UserBadge from "@/components/ui/UserBadge";
import RoleCell from "@/components/ui/RoleCell";

export const membersTableColumns = [
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => <UserBadge user={row.original} />,
    size: 14, //rem
    minSize: 14,
    enableColumnFilter: true,
    enableSorting: true,
    sortingFn: nameSortingEvent,
    filterFn: nameSearch,
    meta: {
      align: "start",
    },
  },
  {
    accessorKey: "email",
    header: "Email",
    cell: ({ row }) => (
      <p className="font-main text-sm">{row.original.email}</p>
    ),
    size: 12, //rem
    minSize: 12,
    enableSorting: true,
    sortingFn: "text",
    meta: {
      align: "start",
    },
  },
  {
    accessorKey: "role",
    header: "Role",
    cell: ({ row }) => <RoleCell role={row.original.role} />,
    size: 10, //rem
    minSize: 10,
    enableColumnFilter: true,
    enableSorting: false,
    filterFn: (row, _, filter) =>
      columnFilterEvet<MemberDetails>(row, filter, "role"),
  },
  {
    accessorKey: "joined",
    header: "Joined",
    cell: ({ row }) => (
      <p className="font-main text-sm text-center">{row.original.joined}</p>
    ),
    size: 10, //rem
    minSize: 10,
    enableColumnFilter: true,
    enableSorting: true,
    sortingFn: dueDateSortingEvent,
    filterFn: "includesString",
  },
  {
    accessorKey: "last_active",
    header: "Last Active",
    cell: ({ row }) => (
      <p className="font-main text-sm text-center">
        {row.original.last_active}
      </p>
    ),
    size: 10, //rem
    minSize: 10,
    enableColumnFilter: true,
    enableSorting: true,
    sortingFn: dueDateSortingEvent,
    filterFn: "includesString",
  },
] as ColumnDef<MemberDetails>[];
