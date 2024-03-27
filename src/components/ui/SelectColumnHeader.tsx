import { Table } from "@tanstack/react-table";
import { Checkbox } from "./checkbox";
import { TaskType } from "@/data/tableTest";

type SelectProps = {
  table: Table<TaskType>;
};

const SelectColumnHeader = ({ table }: SelectProps) => {
  return (
    <div className="size-9 flex justify-center items-center">
      <input
        type="checkbox"
        className="w-4 h-4 accent-primary shadow"
        checked={
          table.getIsAllPageRowsSelected() || table.getIsSomePageRowsSelected()
        }
        onChange={({ target }) =>
          table.toggleAllPageRowsSelected(target.checked)
        }
        aria-label="Select All"
      />
    </div>
  );
};

export default SelectColumnHeader;
