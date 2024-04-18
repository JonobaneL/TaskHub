import { useTypeDispatch, useTypeSelector } from "@/hooks/useReduxHooks";
import Field from "./ui/Field";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Button } from "./ui/button";
import DateSelect from "./ui/DateSelect";
import { Controller, useForm } from "react-hook-form";
import { fieldValidation } from "@/data/formOptions";
import { dateFormating } from "@/utils/dateFormating";
import { addNewTask } from "@/store/thunks/tasksThunks";

type NewTaskForm = {
  task: string;
  notes: string;
  status: string;
  due_date: string | null;
  priority: string | null;
};

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
  } = useForm<NewTaskForm>({
    defaultValues: {
      notes: "",
      status: "none",
      due_date: null,
      priority: null,
    },
  });
  const dispatch = useTypeDispatch();
  const onSubmit = (data: NewTaskForm) => {
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
      <div className="flex item-center justify-between">
        <p className="text-sm leading-9">Status</p>
        {/* start */}
        <Controller
          name="status"
          control={control}
          render={({ field }) => (
            <Select
              onValueChange={field.onChange}
              defaultValue={field.value || undefined}
            >
              <SelectTrigger className="w-1/2 focus:ring-primary capitalize">
                <SelectValue
                  className="capitalize"
                  placeholder="Select status"
                />
              </SelectTrigger>
              <SelectContent>
                {project.status_lables?.map((item) => (
                  <SelectItem
                    key={item.color}
                    className="capitalize"
                    value={item.name}
                  >
                    {item.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        />
        {/* end - separate component */}
      </div>
      <div className="flex item-center justify-between">
        <p className="text-sm leading-9">Due Date</p>
        <Controller
          name="due_date"
          control={control}
          render={({ field }) => (
            <DateSelect onChange={field.onChange} defaultValue={field.value}>
              <input
                type="text"
                className="placeholder:text-text placeholder:font-main h-9 w-1/3 border rounded-md text-sm text-center bg-transparent focus:ring-1 focus:ring-primary"
                placeholder="Select Date"
                value={dateFormating(field.value)}
                readOnly
              />
            </DateSelect>
          )}
        />
      </div>
      <div className="flex item-center justify-between">
        <p className="text-sm leading-9">Priority</p>
        {/* start */}
        <Controller
          name="priority"
          control={control}
          render={({ field }) => (
            <Select
              onValueChange={field.onChange}
              defaultValue={field.value || undefined}
            >
              <SelectTrigger className="w-1/2 focus:ring-primary">
                <SelectValue placeholder="Select priority" />
              </SelectTrigger>
              <SelectContent>
                {project.priority_labels?.map((item) => (
                  <SelectItem
                    key={item.color}
                    className="capitalize"
                    value={item.name}
                  >
                    {item.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        />
        {/* end - separate component */}
      </div>
      <Button
        className="w-1/4 h-9 text-white font-main self-end mt-2"
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
