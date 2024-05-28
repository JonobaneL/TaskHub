import { TableTanstack } from "@/models/projectTypes";

const SelectHeaderCell = ({ table }: TableTanstack) => {
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

export default SelectHeaderCell;
