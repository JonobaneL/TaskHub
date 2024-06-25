import { useTableContex } from "@/context/TableContext";
import { useTypeDispatch } from "./useReduxHooks";
import { addNewTask, deleteTask, updateTask } from "@/store/thunks/tasksThunks";
import {
  addNewTaskAction,
  deleteTaskAction,
} from "@/store/reducers/projectsSlice";

export const useSelectedMenuMethods = () => {
  const dispatch = useTypeDispatch();
  const { selectedGroups } = useTableContex();
  const deleteAllTasks = () => {
    Object.keys(selectedGroups).map((key) =>
      selectedGroups[key].tasks.forEach((item) =>
        dispatch(deleteTask({ taskID: item.id, tableID: key }))
      )
    );
  };
  const moveAllTo = (tableID: string) => {
    Object.keys(selectedGroups).map((key) =>
      selectedGroups[key].tasks.forEach((item) => {
        if (item.tableID !== tableID) {
          dispatch(
            updateTask({
              tableID: key,
              taskID: item.id,
              key: "tableID",
              value: tableID,
            })
          );
          dispatch(addNewTaskAction({ ...item, tableID: tableID }));
          dispatch(deleteTaskAction({ tableID: key, taskID: item.id }));
        }
      })
    );
  };
  const duplicateAll = () => {
    Object.keys(selectedGroups).map((key) =>
      selectedGroups[key].tasks.forEach((task) =>
        dispatch(
          addNewTask({
            task: task?.task + " (copy)",
            tableID: key,
            notes: task?.notes || null,
            status: task?.status,
            due_date: task?.due_date,
            priority: task?.priority,
          })
        )
      )
    );
  };
  return { duplicateAll, moveAllTo, deleteAllTasks };
};
