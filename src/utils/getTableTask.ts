import { ProjectParams, TaskKeys } from "@/models/projectTypes";

export const getTableTask = (
  project: ProjectParams,
  key: TaskKeys,
  value: string
) => {
  const table = project.tables?.find((tableItem) =>
    tableItem.tasks?.find((item) => item[key] == value)
  );
  const task = table?.tasks?.find((item) => item[key] == value);
  return { table, task };
};
