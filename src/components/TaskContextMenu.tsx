import {
  ContextMenu,
  ContextMenuTrigger,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
} from "./ui/context-menu";
import { useTypeDispatch, useTypeSelector } from "@/hooks/useReduxHooks";
import { addNewTask, deleteTask, updateTask } from "@/store/thunks/tasksThunks";
import {
  addNewTaskAction,
  deleteTaskAction,
} from "@/store/reducers/projectsSlice";
import { TaskContextMenuProps } from "@/models/RareUseTypes";

const TaskContextMenu = ({ table, row, children }: TaskContextMenuProps) => {
  const { project } = useTypeSelector((state) => state.projectReducer);
  const currentTableID = table.options.meta?.tableID || "";
  const currentTaskID = row.original.id;
  const getTaskAndTable = () => {
    const table = project.tables?.find((item) => item.id == currentTableID);
    const task = table?.tasks?.find((item) => item.id == currentTaskID);
    return task;
  };
  const dispatch = useTypeDispatch();
  const deleteHandler = () => {
    dispatch(deleteTask({ taskID: currentTaskID, tableID: currentTableID }));
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
  return (
    <ContextMenu>
      <ContextMenuTrigger asChild>{children}</ContextMenuTrigger>
      <ContextMenuContent className="w-48">
        <ContextMenuItem inset className="font-main" onClick={duplicateHandler}>
          Duplicate
        </ContextMenuItem>
        <ContextMenuSub>
          <ContextMenuSubTrigger
            inset
            className="font-main"
            disabled={project.tables?.length == 1}
          >
            Move to
          </ContextMenuSubTrigger>
          <ContextMenuSubContent className="w-48">
            {project?.tables?.map((item) => (
              <ContextMenuItem
                inset
                className="font-main"
                key={item.id}
                disabled={item.id == currentTableID}
                onClick={() => moveToHandler(item.id)}
              >
                {item.name}
              </ContextMenuItem>
            ))}
          </ContextMenuSubContent>
        </ContextMenuSub>
        <ContextMenuItem inset className="font-main" onClick={deleteHandler}>
          Delete
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  );
};

export default TaskContextMenu;
