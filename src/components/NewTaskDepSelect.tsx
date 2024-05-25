import { Control, Controller, FieldPath } from "react-hook-form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { NewTaskFormParams } from "@/models/formTypes";
import { LabelParams } from "@/models/projectTypes";

type SelectProps = {
  control: Control<NewTaskFormParams>;
  labels: LabelParams[] | null;
  name: FieldPath<NewTaskFormParams>;
};

const NewTaskDepSelect = ({ control, labels, name }: SelectProps) => {
  return (
    <div className="flex item-center justify-between">
      <p className="text-sm leading-9 capitalize">{name}</p>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <Select
            onValueChange={field.onChange}
            defaultValue={field.value || undefined}
          >
            <SelectTrigger className="w-1/2 focus:ring-primary capitalize">
              <SelectValue placeholder={`Select ${name}`} />
            </SelectTrigger>
            <SelectContent>
              {labels?.map((item) => (
                <SelectItem
                  key={item.color}
                  className="capitalize"
                  value={item.name}
                >
                  {item.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}
      />
    </div>
  );
};

export default NewTaskDepSelect;
