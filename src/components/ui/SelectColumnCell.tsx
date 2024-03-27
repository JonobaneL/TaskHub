import { Row } from "@tanstack/react-table";
import { TaskType } from "@/data/tableTest";

type SelectProps = {
  row: Row<TaskType>;
};
const SelectColumnCell = ({ row }: SelectProps) => {
  return (
    <div className="flex items-center justify-center size-9">
      <input
        type="checkbox"
        className="w-4 h-4 accent-primary shadow"
        checked={row.getIsSelected()}
        onChange={({ target }) => row.toggleSelected(target.checked)}
        aria-label="Select row"
      />
    </div>
  );
};

export default SelectColumnCell;
