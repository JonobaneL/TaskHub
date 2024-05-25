import { Control, FieldArrayWithId } from "react-hook-form";
import { LableParams } from "./projectTypes";

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

export type LableFormParams = {
  stages: LableParams[];
};

export type LableFieldProps = {
  fieldItem: FieldArrayWithId<LableFormParams, "stages", "id">;
  error: boolean;
  control: Control<LableFormParams, any>;
  index: number;
  update: (ids: string[]) => void;
  remove: () => void;
  addLable: (value: string) => void;
};
