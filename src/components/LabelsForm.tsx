import { LabelParams } from "@/models/projectTypes";
import { Button } from "./ui/button";
import NewLabelButton from "./NewLabelButton";
import { LabelsTypeParams } from "@/models/RareUseTypes";
import LabelField from "./LabelField";
import { useLabelForm } from "@/hooks/useLabelForm";

type FormProps = {
  labels: LabelParams[] | null;
  type: LabelsTypeParams;
  onClose: () => void;
};

const LabelsForm = ({ labels, type, onClose }: FormProps) => {
  const {
    control,
    handleSubmit,
    formState,
    fields,
    append,
    removeHandler,
    updateLabel,
    submitHandler,
  } = useLabelForm(labels, type, onClose);
  const errors = formState.errors.stages ? formState.errors.stages : [];

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
