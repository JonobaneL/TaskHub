import { LabelParams } from "@/models/projectTypes";
import { useFieldArray, useForm } from "react-hook-form";
import { Button } from "./ui/button";
import NewLabelButton from "./NewLabelButton";
import { LabelFormParams } from "@/models/formTypes";
import { useTypeDispatch, useTypeSelector } from "@/hooks/useReduxHooks";
import { updateLabels } from "@/store/thunks/projectsThunks";
import { LabelsTypeParams } from "@/models/RareUseTypes";
import LabelField from "./LabelField";

type FormProps = {
  labels: LabelParams[] | null;
  type: LabelsTypeParams;
  onClose: () => void;
};

const LabelsForm = ({ labels, type, onClose }: FormProps) => {
  const { control, handleSubmit, formState } = useForm<LabelFormParams>({
    defaultValues: { stages: labels || [] },
  });
  const { fields, append, remove, update } = useFieldArray({
    control: control,
    name: "stages",
  });
  const { project } = useTypeSelector((state) => state.projectReducer);
  const errors = formState.errors.stages ? formState.errors.stages : [];
  const dispatch = useTypeDispatch();
  const submitHandler = (data: LabelFormParams) => {
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
      console.log(value);
      update(index, newLabel);
    }
    const labels = fields.map((item) => {
      const { id, ...rest } = item;
      if (item.labelID === fields[index].labelID) return newLabel;
      return rest;
    });
    dispatch(updateLabels({ type, labels: labels }));
  };

  return (
    <form onSubmit={handleSubmit(submitHandler)}>
      <ul
        className={`grid gap-x-1.5 gap-y-1 ${
          fields.length <= 5 ? "grid-cols-1" : "grid-cols-2"
        }`}
      >
        {fields?.map((item, index) => (
          <LabelField
            key={index}
            control={control}
            error={errors[index] ? true : false}
            fieldItem={item}
            index={index}
            fieldName={type.split("_")[0]}
            remove={() => removeHandler(index)}
            updateLabel={(key: string, value: string) =>
              updateLabel(index, key, value)
            }
          />
        ))}
        {fields.length < 10 && <NewLabelButton append={append} />}
      </ul>
      <div className="h-[1px] w-full bg-accent my-2" />
      <Button
        variant="ghost"
        className="h-9 w-full rounded-sm font-medium text-text"
        type="submit"
      >
        Apply
      </Button>
    </form>
  );
};

export default LabelsForm;
