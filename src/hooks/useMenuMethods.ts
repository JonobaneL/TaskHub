import { addNewTask, deleteTask, updateTask } from "@/store/thunks/tasksThunks";
import { useTypeDispatch, useTypeSelector } from "./useReduxHooks";
import {
  addNewTaskAction,
  deleteTaskAction,
} from "@/store/reducers/projectsSlice";

export const useMenuMethods = (
  currentTaskID: string,
  currentTableID: string
) => {
  const dispatch = useTypeDispatch();
  const deleteHandler = () => {
    dispatch(deleteTask({ taskID: currentTaskID, tableID: currentTableID }));
  };
  const { project } = useTypeSelector((state) => state.projectReducer);
  const getTaskAndTable = () => {
    const table = project.tables?.find((item) => item.id == currentTableID);
    const task = table?.tasks?.find((item) => item.id == currentTaskID);
    return task;
  };
  const moveToHandler = (tableID: string) => {
    const task = getTaskAndTable();
    dispatch(
      updateTask({
        tableID: currentTableID,
        taskID: task?.id || "",
        key: "tableID",
        value: tableID,
      })
    );
    dispatch(addNewTaskAction({ ...task, tableID: tableID }));
    dispatch(
      deleteTaskAction({ tableID: currentTableID, taskID: task?.id || "" })
    );
  };
  const duplicateHandler = () => {
    const task = getTaskAndTable();
    dispatch(
      addNewTask({
        task: task?.task + " (copy)",
        tableID: currentTableID,
        notes: task?.notes || null,
        status: task?.status,
        due_date: task?.due_date,
        priority: task?.priority,
      })
    );
  };
  return { deleteHandler, moveToHandler, duplicateHandler };
};
