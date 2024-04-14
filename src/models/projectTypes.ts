import { CellContext } from "@tanstack/react-table";

type StatusParams = {
  color: string;
  name: string;
};
type PriorityParams = {
  color: string;
  name: string;
};
export type ProjectParams = {
  id: string | null;
  name: string | null;
  members: string[] | null;
  priority_labels: PriorityParams[] | null;
  status_lables: StatusParams[] | null;
  tablesID: string | null;
  tasksID: string | null;
  tables: TableParams[] | null;
};
export type TableParams = {
  id: string;
  name: string;
  color: string;
  tasks: TaskParams[] | null;
};
export type TaskParams = {
  id: string;
  task: string;
  status: string | "none";
  due_date: string | null;
  priority: string | null;
  notes: string;
  conversation: null;
  tableID: string;
  author: string;
};
export type TaskKeys =
  | "conversation"
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
export type UpdateTaskProps = {
  tableID: string | null;
  taskID: string | null;
  key: TaskKeys;
  value: any;
};
export type CellDefaultProps = {
  options: CellContext<TaskParams, unknown>;
};
export type AddTaskParams = {
  task: string;
  due_date?: string;
  priority?: string;
  status?: string;
};
