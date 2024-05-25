import { LableParams } from "@/models/projectTypes";
import { useFieldArray, useForm } from "react-hook-form";
import { Button } from "./ui/button";
import NewLableButton from "./NewLableButton";
import { LableFormParams } from "@/models/formTypes";
import LableField from "./LableField";
import { useTypeDispatch, useTypeSelector } from "@/hooks/useReduxHooks";
import { updateLables } from "@/store/thunks/projectsThunks";
import { LablesTypeParams } from "@/models/RareUseTypes";
import { checkArrays } from "@/utils/checkArrays";

type FormProps = {
  lables: LableParams[] | null;
  type: LablesTypeParams;
  onClose: () => void;
};

const LablesForm = ({ lables, type, onClose }: FormProps) => {
  const { control, handleSubmit, formState } = useForm<LableFormParams>({
    defaultValues: { stages: lables || [] },
  });
  const { fields, append, remove } = useFieldArray({
    control: control,
    name: "stages",
  });
  const { project } = useTypeSelector((state) => state.projectReducer);
  const errors = formState.errors.stages ? formState.errors.stages : [];
  const dispatch = useTypeDispatch();
  const submitHandler = (data: LableFormParams) => {
    const isChanged = checkArrays<LableParams>(
      data.stages,
      project[type] || []
    );
    console.log(fields);
    if (isChanged) {
      dispatch(updateLables({ type, lables: data.stages }));
    }
    onClose();
  };
  const removeHandler = (index: number) => {
    const removedLable = fields[index];
    remove(index);
    const updatedLables =
      project[type]?.filter((item) => item.lableID !== removedLable.lableID) ||
      [];
    dispatch(updateLables({ type, lables: updatedLables }));
  };
  const addLable = (index: number, value: string) => {
    const newLable = {
      color: fields[index].color,
      name: value,
      lableID: fields[index].lableID,
    };
    const updatedLables = [...(project[type] || []), newLable];
    const lableContains = project[type] == null ? null : project[type][index]; //don't get why I have this message
    if (!lableContains) {
      dispatch(updateLables({ type, lables: updatedLables }));
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
          <LableField
            key={index}
            control={control}
            error={errors[index] ? true : false}
            fieldItem={item}
            index={index}
            remove={() => removeHandler(index)}
            addLable={(value) => addLable(index, value)}
          />
        ))}
        {fields.length < 10 && <NewLableButton append={append} />}
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

export default LablesForm;
