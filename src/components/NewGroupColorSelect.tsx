import { fieldValidation } from "@/data/formOptions";
import { NewGroupFormParams } from "@/models/formTypes";
import {
  Control,
  Controller,
  FieldError,
  UseFormSetValue,
} from "react-hook-form";
import ColorPicker from "./ui/ColorPicker";
import { table_colors } from "@/data/table_colors";

type SelectProps = {
  control: Control<NewGroupFormParams>;
  setValue: UseFormSetValue<NewGroupFormParams>;
  error: FieldError | undefined;
};

const NewGroupColorSelect = ({ control, setValue, error }: SelectProps) => {
  return (
    <div>
      <div className="flex justify-between mt-4">
        <p className="text-sm">Choose group color</p>
        <Controller
          name="color"
          control={control}
          rules={fieldValidation}
          render={({ field }) => (
            <ColorPicker
              type="round"
              color={field.value || "#2f2f2f"}
              colors={table_colors}
              onChange={(value) => setValue("color", value)}
            />
          )}
        />
      </div>
      {error && (
        <p className="text-red-600 text-xs mt-2 font-main font-medium mx-2">
          {error.message}
        </p>
      )}
    </div>
  );
};

export default NewGroupColorSelect;
