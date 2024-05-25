import { Control, FieldArrayWithId } from "react-hook-form";
import { LabelParams } from "./projectTypes";

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

export type LabelFormParams = {
  stages: LabelParams[];
};

export type LabelFieldProps = {
  fieldItem: FieldArrayWithId<LabelFormParams, "stages", "id">;
  error: boolean;
  control: Control<LabelFormParams, any>;
  index: number;
  remove: () => void;
  updateLabel: (key: string, value: string) => void;
  fieldName: string;
};
