import { LabelParams } from "@/models/projectTypes";
import { useFieldArray, useForm } from "react-hook-form";
import { Button } from "./ui/button";
import NewLabelButton from "./NewLabelButton";
import { LabelFormParams } from "@/models/formTypes";
import { useTypeDispatch, useTypeSelector } from "@/hooks/useReduxHooks";
import { updateLabels } from "@/store/thunks/projectsThunks";
import { LabelsTypeParams } from "@/models/RareUseTypes";
import { checkArrays } from "@/utils/checkArrays";
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
  const { fields, append, remove } = useFieldArray({
    control: control,
    name: "stages",
  });
  const { project } = useTypeSelector((state) => state.projectReducer);
  const errors = formState.errors.stages ? formState.errors.stages : [];
  const dispatch = useTypeDispatch();
  const submitHandler = (data: LabelFormParams) => {
    const isChanged = checkArrays<LabelParams>(
      data.stages,
      project[type] || []
    );
    if (isChanged) {
      dispatch(updateLabels({ type, labels: data.stages }));
    }
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
  const addLabel = (index: number, value: string) => {
    const newLabel = {
      color: fields[index].color,
      name: value,
      labelID: fields[index].labelID,
    };
    const updatedLabel = [...(project[type] || []), newLabel];
    const labelContains = project[type]?.[index] ?? null;
    if (!labelContains) {
      dispatch(updateLabels({ type, labels: updatedLabel }));
    }
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
            remove={() => removeHandler(index)}
            addLabel={(value) => addLabel(index, value)}
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
