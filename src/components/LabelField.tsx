import { LabelFieldProps } from "@/models/formTypes";
import { Controller } from "react-hook-form";
import ColorPicker from "./ui/ColorPicker";
import { labelColors } from "@/data/table_colors";
import { fieldValidation } from "@/data/formOptions";
import { useLableField } from "@/hooks/useLableField";
import LabelRemoveButton from "./LabelRemoveButton";

const LabelField = ({
  fieldItem,
  index,
  error,
  control,
  remove,
  updateLabel,
  fieldName,
}: LabelFieldProps) => {
  const { ids, removeHandler, blurHandler, colorHandler } = useLableField(
    fieldName,
    fieldItem,
    updateLabel,
    remove
  );
  return (
    <li
      key={fieldItem.id}
      className={`group w-[10.5rem] h-9 rounded-sm border ${
        error ? "border-red-500" : "border-slate-200"
      } relative flex gap-2 p-1 items-center`}
    >
      {fieldItem?.name?.length > 0 && (
        <LabelRemoveButton
          idsLength={ids.length}
          handler={removeHandler}
          role={fieldItem?.role}
        />
      )}
      <Controller
        name={`stages.${index}.color`}
        control={control}
        rules={fieldValidation}
        render={({ field }) => (
          <ColorPicker
            type="square"
            colors={labelColors}
            color={field.value}
            disableContent={
              fieldItem?.role == "none" || fieldItem?.role == "done"
            }
            onChange={(value) => {
              field.onChange(value);
              colorHandler(value);
            }}
            asChild={true}
          />
        )}
      />
      <Controller
        name={`stages.${index}.name`}
        control={control}
        rules={fieldValidation}
        render={({ field }) => (
          <input
            className="w-full h-full text-sm"
            type="text"
            disabled={fieldItem?.role == "none"}
            {...field}
            autoComplete="off"
            onBlur={(e) => {
              field.onBlur();
              blurHandler(e.target.value);
            }}
          />
        )}
      />
    </li>
  );
};

export default LabelField;
