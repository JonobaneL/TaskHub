import { useTableContex } from "@/context/TableContext";
import { useTypeSelector } from "@/hooks/useReduxHooks";
import { IoMdCloseCircleOutline } from "react-icons/io";

const PriorityFilters = () => {
  const { project } = useTypeSelector((state) => state.projectReducer);
  const { filters, changeFilters, clearFilter } = useTableContex();
  return (
    <div className="w-fit">
      <div className="flex justify-between mb-3 border-b pb-1 items-center gap-4">
        <h3 className="font-main  text-sm font-medium">Priority</h3>
        {filters.priority.length > 0 ? (
          <IoMdCloseCircleOutline
            className="cursor-pointer"
            size="1.1rem"
            color="#6B6B6B"
            onClick={() => clearFilter("priority")}
          />
        ) : (
          <div className="size-[1.1rem]" />
        )}
      </div>
      <ul className="w-full space-y-1">
        {project.priority_labels?.map((item) => (
          <li
            key={item.labelID}
            className={`flex items-center gap-1.5 px-2 py-1.5 hover:bg-accent rounded-sm transition-colors duration-2 cursor-pointer ${
              filters.priority.includes(item.labelID) ? "bg-accent" : ""
            }`}
            onClick={() => changeFilters("priority", item.labelID)}
          >
            <div
              style={{ background: item.color }}
              className="size-3 rounded-full"
            />
            <p className="font-main text-sm capitalize">{item.name}</p>
          </li>
        ))}
        <li
          className={`flex items-center gap-1.5 px-2 py-1.5 hover:bg-accent rounded-sm transition-colors duration-2 cursor-pointer ${
            filters.priority.includes("blank") ? "bg-accent" : ""
          }`}
          onClick={() => changeFilters("priority", "blank")}
        >
          <div className="size-3 rounded-full border bg-white" />
          <p className="font-main text-sm capitalize">Blank</p>
        </li>
      </ul>
    </div>
  );
};

export default PriorityFilters;
