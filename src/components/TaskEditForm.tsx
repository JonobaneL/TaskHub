import { CellContext } from "@tanstack/react-table";
import TaskForm from "./TaskForm";
import { TaskKeys, TaskParams } from "@/models/projectTypes";
import { TaskFormParams } from "@/models/formTypes";
import { useTypeDispatch } from "@/hooks/useReduxHooks";
import { updateTask } from "@/store/thunks/tasksThunks";

type FormProps = {
  options: CellContext<TaskParams, unknown>;
  onClose: (value: boolean) => void;
};

const TaskEditForm = ({ options, onClose }: FormProps) => {
  const dispatch = useTypeDispatch();
  const { task, due_date, status, priority, notes } = options.row.original;
  const editHandler = (data: TaskFormParams) => {
    const tableID = options.table.options?.meta?.tableID || null;
    const taskID = options.row.original.id;
    const update = Object.keys(data).map((key) => {
      if (
        data[key as keyof TaskFormParams] !==
        options.row.original[key as TaskKeys]
      )
        return dispatch(
          updateTask({
            tableID,
            taskID,
            key: key as TaskKeys,
            value: data[key as keyof TaskFormParams],
          })
        );
      return null;
    });
    Promise.all(update);
  };
  return (
    <TaskForm
      onClose={() => onClose(false)}
      defaultValues={{
        task,
        due_date,
        status,
        priority,
        notes,
      }}
      btnContent="Save"
      submitHandler={editHandler}
    />
  );
};

export default TaskEditForm;
