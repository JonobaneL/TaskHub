import { TaskParams } from "@/models/projectTypes";
import { SelectedTaskParams } from "@/models/tableContextTypes";
import { useState } from "react";

export const useSelectedGroups = () => {
  const [selectedGroups, setSelectedGroups] = useState<SelectedTaskParams>({});
  const selectedTasksLength = Object.keys(selectedGroups).reduce(
    (prev, item) => {
      return prev + selectedGroups[item].tasks.length;
    },
    0
  );
  const addTasks = (
    tableID: string,
    tasks: TaskParams[],
    onClose: (value?: boolean | undefined) => void,
    color: string
  ) => {
    setSelectedGroups((p) => {
      return { ...p, [tableID]: { tasks, onClose, color } };
    });
  };
  return {
    selectedGroups,
    selectedTasksLength,
    addTasks,
  };
};
