import { useTypeDispatch, useTypeSelector } from "@/hooks/useReduxHooks";
import Field from "./ui/Field";
import { Button } from "./ui/button";
import { useForm } from "react-hook-form";
import { fieldValidation } from "@/data/formOptions";
import { addNewTask } from "@/store/thunks/tasksThunks";
import { NewTaskFormParams } from "@/models/formTypes";
import NewTaskDateSelect from "./NewTaskDateSelect";
import NewTaskDepSelect from "./NewTaskDepSelect";

type FormProps = {
  onClose: () => void;
};
const NewTaskForm = ({ onClose }: FormProps) => {
  const { project } = useTypeSelector((state) => state.projectReducer);
  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<NewTaskFormParams>({
    defaultValues: {
      notes: "",
      status: "none",
      due_date: null,
      priority: null,
    },
  });
  const dispatch = useTypeDispatch();
  const onSubmit = (data: NewTaskFormParams) => {
    const tableID =
      project?.tables?.find((item) => item.main == true)?.id || "";
    dispatch(addNewTask({ ...data, tableID: tableID }));
    onClose();
  };
  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
      <Field
        variant="standart"
        placeholder="Task"
        errors={errors.task}
        {...register("task", fieldValidation)}
      />
      <textarea
        className="w-full h-[12rem] resize-none text-sm p-2 rounded-md border bg-transparent transition-colors focus:ring-1 focus-visible:ring-1 focus:ring-primary focus:outline-none"
        placeholder="Notes"
        {...register("notes")}
      />
      <NewTaskDepSelect
        control={control}
        lables={project.status_lables}
        name="status"
      />
      <NewTaskDateSelect control={control} />
      <NewTaskDepSelect
        control={control}
        lables={project.priority_lables}
        name="priority"
      />
      <Button
        className="w-fit h-9 text-white font-main self-end mt-2"
        variant="default"
        type="submit"
        disabled={isSubmitting}
      >
        Add Task
      </Button>
    </form>
  );
};

export default NewTaskForm;
