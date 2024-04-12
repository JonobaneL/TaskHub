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
  tables: TableParams[] | null;
};
export type TableParams = {
  id: string;
  name: string;
  color: string;
  tasksID: string;
  tasks: TaskParams[] | null;
};
export type TaskParams = {
  id: string;
  task: string;
  status: string | "none";
  "due-date": string | null;
  priority: string | null;
  note: string;
  conversation: null;
};
