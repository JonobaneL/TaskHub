import { LabelFieldProps } from "@/models/formTypes";
import { Controller } from "react-hook-form";
import ColorPicker from "./ui/ColorPicker";
import { labelColors } from "@/data/table_colors";
import { fieldValidation } from "@/data/formOptions";
import removeIcon from "../assets/images/remove.svg";
import { useOptionUse } from "@/hooks/useOptionUse";
import Helper from "./ui/Helper";

const LabelField = ({
  fieldItem,
  index,
  error,
  control,
  remove,
  addLabel,
}: LabelFieldProps) => {
  const ids = useOptionUse("status", fieldItem.name);
  const removeHandler = () => {
    if (ids.length === 0) remove();
  };
  const blurHandler = (value: string) => {
    if (value == "") {
      if (ids.length === 0) remove();
      return;
    }
    addLabel(value);
  };
  return (
    <li
      key={fieldItem.id}
      className={`group w-[10.5rem] h-9 rounded-sm border ${
        error ? "border-red-500" : "border-slate-200"
      } relative flex gap-2 p-1 items-center`}
    >
      {fieldItem.name.length > 0 && (
        <div
          onClick={removeHandler}
          className="absolute right-1.5 bg-background cursor-pointer opacity-0 invisible group-hover:opacity-100  group-hover:visible"
        >
          <Helper
            side="right"
            content="Can't be deleted while in use"
            disableContent={ids.length == 0}
          >
            <img src={removeIcon} alt="remove" className="size-4" />
          </Helper>
        </div>
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
            onChange={field.onChange}
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
