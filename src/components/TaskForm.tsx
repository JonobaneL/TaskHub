import { useTypeSelector } from "@/hooks/useReduxHooks";
import Field from "./ui/Field";
import { Button } from "./ui/button";
import { useForm } from "react-hook-form";
import { fieldValidation } from "@/data/formOptions";
import { TaskFormParams, TaskFormProps } from "@/models/formTypes";
import NewTaskDateSelect from "./NewTaskDateSelect";
import NewTaskDepSelect from "./NewTaskDepSelect";
import { equalValidation } from "@/utils/formValidations";

const TaskForm = ({
  onClose,
  defaultValues,
  btnContent,
  submitHandler,
}: TaskFormProps) => {
  const { project } = useTypeSelector((state) => state.projectReducer);
  const defaultStatus =
    project.status_labels?.find((item) => item?.role == "none")?.labelID || "";
  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<TaskFormParams>({
    values: defaultValues,
    defaultValues: defaultValues || {
      notes: "",
      status: defaultStatus,
      due_date: null,
      priority: null,
    },
  });
  const onSubmit = (data: TaskFormParams) => {
    const equalCheck = equalValidation<TaskFormParams>(data, defaultValues);
    if (!equalCheck) return;
    submitHandler(data);
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
        labels={project.status_labels}
        name="status"
      />
      <NewTaskDateSelect control={control} />
      <NewTaskDepSelect
        control={control}
        labels={project.priority_labels}
        name="priority"
      />
      <Button
        className="w-fit h-9 text-white font-main self-end mt-2"
        variant="default"
        type="submit"
        disabled={isSubmitting}
      >
        {btnContent}
      </Button>
    </form>
  );
};

export default TaskForm;
