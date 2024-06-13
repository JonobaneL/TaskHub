import { CellContext, Table } from "@tanstack/react-table";
import { CommentParams } from "./commentTypes";

export type LabelParams = {
  color: string;
  name: string;
  labelID: string;
  role?: string;
};

export type ProjectParams = {
  id: string | null;
  name: string | null;
  members: string[] | null;
  priority_labels: LabelParams[] | null;
  status_labels: LabelParams[] | null;
  tablesID: string | null;
  tasksID: string | null;
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
  comments: null | CommentParams[];
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
