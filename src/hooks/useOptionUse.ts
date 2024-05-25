import { TaskKeys } from "@/models/projectTypes";
import { useTypeSelector } from "./useReduxHooks";
import { useMemo } from "react";

export const useOptionUse = (key: TaskKeys, value: string) => {
  const { project } = useTypeSelector((state) => state.projectReducer);
  const taskIDs = useMemo(() => {
    const ids = [] as string[];
    project.tables?.forEach((table) => {
      table.tasks?.forEach((item) => {
        if (item[key] === value) {
          ids.push(item.id);
        }
      });
    });
    return ids;
  }, []);
  return taskIDs;
};
