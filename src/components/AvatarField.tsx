import { SingUpFormParams } from "@/data/formOptions";
import { Control, Controller, UseFormSetValue } from "react-hook-form";
import FileField from "./ui/FileField";
import { LuImagePlus } from "react-icons/lu";

type FieldProps = {
  control: Control<SingUpFormParams, any>;
  setValue: UseFormSetValue<SingUpFormParams>;
};

const AvatarField = ({ control, setValue }: FieldProps) => {
  return (
    <Controller
      control={control}
      name="avatar"
      render={({ field }) => (
        <FileField
          icon={<LuImagePlus size="1.2rem" className="text-primary" />}
          file={field.value}
          onChange={(e) =>
            field.onChange(e.target.files ? e.target.files[0] : null)
          }
          clearHandler={() => setValue("avatar", null)}
          accept=".svg,.jpg,.png,.jpeg"
        />
      )}
    />
  );
};

export default AvatarField;
