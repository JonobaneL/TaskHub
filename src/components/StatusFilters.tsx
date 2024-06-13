import { useTableContex } from "@/context/TableContext";
import { useTypeSelector } from "@/hooks/useReduxHooks";
import { IoMdCloseCircleOutline } from "react-icons/io";

const StatusFilters = () => {
  const { project } = useTypeSelector((state) => state.projectReducer);
  const { filters, changeFilters, clearFilter } = useTableContex();
  return (
    <div className="w-fit">
      <div className="flex justify-between mb-3 border-b pb-1 items-center">
        <h3 className="font-main  text-sm font-medium">Status</h3>
        {filters.status.length > 0 && (
          <IoMdCloseCircleOutline
            className="cursor-pointer"
            size="1.1rem"
            color="#6B6B6B"
            onClick={() => clearFilter("status")}
          />
        )}
      </div>
      <ul className="w-fit space-y-1">
        {project.status_labels?.map((item) => (
          <li
            key={item.labelID}
            className={`flex items-center gap-1.5 px-2 py-1.5 hover:bg-accent rounded-sm transition-colors duration-2 cursor-pointer ${
              filters.status.includes(item.labelID) ? "bg-accent" : ""
            }`}
            onClick={() => changeFilters("status", item.labelID)}
          >
            <div
              style={{ background: item.color }}
              className="size-3 rounded-full"
            />
            <p className="font-main text-sm capitalize">{item.name}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default StatusFilters;
