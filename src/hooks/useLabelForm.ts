import { LabelParams } from "@/models/projectTypes";
import { useDynamicForm } from "./useDynamicForm";
import { useTypeDispatch, useTypeSelector } from "./useReduxHooks";
import { LabelsTypeParams } from "@/models/RareUseTypes";
import { updateLabels } from "@/store/thunks/projectsThunks";

export const useLabelForm = (
  labels: LabelParams[] | null,
  type: LabelsTypeParams,
  onClose: () => void
) => {
  const { control, handleSubmit, formState, fields, append, remove, update } =
    useDynamicForm<LabelParams>(labels || []);
  const { project } = useTypeSelector((state) => state.projectReducer);
  const dispatch = useTypeDispatch();
  const submitHandler = () => {
    onClose();
  };

  const removeHandler = (index: number) => {
    const removedLabel = fields[index];
    remove(index);
    const updatedLabel =
      project[type]?.filter((item) => item.labelID !== removedLabel.labelID) ||
      [];
    dispatch(updateLabels({ type, labels: updatedLabel }));
  };

  const updateLabel = (index: number, key: string, value: string) => {
    const { id, ...field } = fields[index];
    const newLabel = {
      ...field,
      [key]: value,
    };
    if (value.length > 0) {
      update(index, newLabel);
    }
    const labels = fields.map((item) => {
      const { id, ...rest } = item;
      if (item.labelID === fields[index].labelID) return newLabel;
      return rest;
    });
    dispatch(updateLabels({ type, labels: labels }));
  };
  return {
    control,
    handleSubmit,
    formState,
    fields,
    append,
    removeHandler,
    updateLabel,
    submitHandler,
  };
};
