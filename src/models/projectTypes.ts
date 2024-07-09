import { CellContext, Table } from "@tanstack/react-table";

export type LabelParams = {
  color: string;
  name: string;
  labelID: string;
  role?: string;
};

export type MemberParams = {
  memberID: string | null;
  role: "admin" | "member" | "guest" | null;
  joined: string | null;
  last_active: string | null;
};
export type ProjectParams = {
  projectID: string | null;
  name: string | null;
  members: MemberParams[] | null;
  priority_labels: LabelParams[] | null;
  status_labels: LabelParams[] | null;
  tablesID: string | null;
  tasksID: string | null;
  commentsID: string | null;
  tables: TableParams[] | null;
  color: string;
};
export type TableParams = {
  id: string;
  name: string;
  color: string;
  tasks: TaskParams[] | null;
  main: boolean;
};
export type TaskParams = {
  id: string;
  task: string;
  status: string | "none";
  due_date: string | null;
  priority: string | null;
  notes: string;
  commentsID: null;
  tableID: string;
  author: string;
};

export type TaskKeys =
  | "id"
  | "commentsID"
  | "due_date"
  | "notes"
  | "priority"
  | "status"
  | "tableID"
  | "task";
export type UpdateTableProps = {
  tableID: string;
  key: "name" | "color";
  value: string;
};

export type CellDefaultProps = {
  options: CellContext<TaskParams, unknown>;
};
export type TableTanstack = {
  table: Table<TaskParams>;
};
export type AddTaskParams = {
  task: string;
  due_date?: string;
  priority?: string;
  status?: string;
};
