import { useTypeDispatch } from "@/hooks/useReduxHooks";
import { AddTaskParams, TableParams, TaskKeys } from "@/models/projectTypes";
import { addNewTask, updateTask } from "@/store/thunks/tasksThunks";

export const generateTableMeta = (table: TableParams) => {
  const dispatch = useTypeDispatch();
  return {
    updateData: (rowIndex: number, columnId: string, value: any) => {
      dispatch(
        updateTask({
          tableID: table.id,
          taskID: table.tasks ? table.tasks[rowIndex].id : null,
          key: columnId as TaskKeys,
          value,
        })
      );
    },
    addTask: (task: AddTaskParams) => {
      dispatch(addNewTask({ ...task, tableID: table.id }));
    },
    tableID: table.id,
  };
};
