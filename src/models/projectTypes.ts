type StatusParams = {
  color: string;
  name: string;
};
export type ProjectParams = {
  id: string | null;
  name: string | null;
  members: string[] | null;
  priority_labels: string[] | null;
  status_lables: StatusParams[] | null;
  tablesID: string | null;
  tables: TableParams[] | null;
};
export type TableParams = {
  id: string;
  name: string;
  color: string;
  tasks: string;
};
