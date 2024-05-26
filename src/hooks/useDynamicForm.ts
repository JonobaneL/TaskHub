import { useFieldArray, useForm } from "react-hook-form";

type FormParams<T> = {
  stages: T[];
};

export const useDynamicForm = <T>(defaultValue: T[]) => {
  const { control, handleSubmit, formState } = useForm<FormParams<T>>({
    defaultValues: { stages: defaultValue || [] },
  });
  const { fields, append, remove, update } = useFieldArray({
    control: control,
    name: "stages", //solve this problem
  });
  return { control, handleSubmit, formState, fields, append, remove, update };
};
