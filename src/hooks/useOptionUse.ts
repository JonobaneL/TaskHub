import { TaskKeys } from "@/models/projectTypes";
import { useTypeSelector } from "./useReduxHooks";
import { useMemo } from "react";

type IDParams = {
  taskID: string;
  tableID: string;
};
export const useOptionUse = (key: TaskKeys, value: string) => {
  const { project } = useTypeSelector((state) => state.projectReducer);
  const taskIDs = useMemo(() => {
    const ids = [] as IDParams[];
    project.tables?.forEach((table) => {
      table.tasks?.forEach((item) => {
        if (item[key] === value) {
          ids.push({ tableID: table.id, taskID: item.id });
        }
      });
    });
    return ids;
  }, []);
  return taskIDs;
};
