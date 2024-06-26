import { Control, Controller } from "react-hook-form";
import DateSelect from "./ui/DateSelect";
import { TaskFormParams } from "@/models/formTypes";
import { dateFormating } from "@/utils/dateFormating";

type SelectProps = {
  control: Control<TaskFormParams>;
};

const NewTaskDateSelect = ({ control }: SelectProps) => {
  return (
    <div className="flex item-center justify-between">
      <p className="text-sm leading-9">Due Date</p>
      <Controller
        name="due_date"
        control={control}
        render={({ field }) => (
          <DateSelect onChange={field.onChange} defaultValue={field.value}>
            <input
              type="text"
              className="placeholder:text-text placeholder:font-main h-9 w-1/3 border rounded-md text-sm text-center bg-transparent focus:ring-1 focus-visible:ring-1 focus:ring-primary focus:outline-none"
              placeholder="Select Date"
              value={dateFormating(field.value)}
              readOnly
            />
          </DateSelect>
        )}
      />
    </div>
  );
};

export default NewTaskDateSelect;
