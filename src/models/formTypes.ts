export type NewTaskFormParams = {
  task: string;
  notes: string;
  status: string;
  due_date: string | null;
  priority: string | null;
};

export type NewGroupFormParams = {
  name: string;
  color: string;
};