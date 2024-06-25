import { useTypeSelector } from "@/hooks/useReduxHooks";
import { PopoverContent } from "./ui/popover";
import { useTableContex } from "@/context/TableContext";

type ListProps = {
  callback: (id: string) => void;
};
const GroupsList = ({ callback }: ListProps) => {
  const { project } = useTypeSelector((state) => state.projectReducer);
  const { selectedGroups } = useTableContex();
  const groupCheck = Object.keys(selectedGroups).every(
    (key) => selectedGroups[key].tasks.length > 0
  );
  return (
    <PopoverContent side="top" sideOffset={15} className="max-w-60 space-y-0.5">
      {project.tables?.map((item) => (
        <div
          className="group flex items-center cursor-pointer gap-2 p-1 hover:bg-accent transition-all rounded-sm  aria-disabled:pointer-events-none aria-disabled:bg-gray-50 "
          aria-disabled={
            selectedGroups[item.id].tasks.length > 0 && !groupCheck
          }
          onClick={() => {
            callback(item.id);
          }}
        >
          <div
            style={{ background: item.color }}
            className="size-4 rounded-full group-aria-disabled:contrast-75"
          />
          <p className="group-aria-disabled:contrast-50 font-main text-sm font-medium">
            {item.name}
          </p>
        </div>
      ))}
    </PopoverContent>
  );
};

export default GroupsList;
