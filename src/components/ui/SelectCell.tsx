import { Row } from "@tanstack/react-table";
import { TaskParams } from "@/models/projectTypes";

type SelectProps = {
  row: Row<TaskParams>;
};
const SelectCell = ({ row }: SelectProps) => {
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

export default SelectCell;
