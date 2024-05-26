import { DynamicKeyObject } from "@/models/RareUseTypes";
import { LabelParams, TaskKeys, TaskParams } from "@/models/projectTypes";

export const chartGenerating = (
  field: string,
  labels: LabelParams[],
  tasks: TaskParams[]
) => {
  const initial: DynamicKeyObject =
    labels?.reduce(
      (prev, current) => {
        return { ...prev, [current.name]: { value: 0, color: current.color } };
      },
      { empty: { value: 0, color: "#fff" } }
    ) || {};
  tasks?.forEach((task) => {
    const status = task[field as TaskKeys] || "empty";
    initial[status].value = initial[status].value + 1;
  });

  return initial;
};
