import { useTableContex } from "@/context/TableContext";
import { useTypeSelector } from "@/hooks/useReduxHooks";
import { IoMdCloseCircleOutline } from "react-icons/io";

const GroupFilters = () => {
  const { project } = useTypeSelector((state) => state.projectReducer);
  const { groupsFilter, setGroupsFilter } = useTableContex();
  const changeHandler = (id: string) => {
    setGroupsFilter((p) => {
      if (p.includes(id)) return p.filter((item) => item != id);
      return [...p, id];
    });
  };
  return (
    <div className="w-fit">
      <div className="flex justify-between mb-3 border-b pb-1 items-center gap-4">
        <h3 className="font-main  text-sm font-medium">Groups</h3>
        {groupsFilter.length > 0 ? (
          <IoMdCloseCircleOutline
            className="cursor-pointer"
            size="1.1rem"
            color="#6B6B6B"
            onClick={() => setGroupsFilter([])}
          />
        ) : (
          <div className="size-[1.1rem]" />
        )}
      </div>
      <ul className="w-full space-y-1">
        {project.tables?.map((item) => (
          <li
            key={item.id}
            className={`flex items-center gap-1.5 px-2 py-1.5 hover:bg-accent rounded-sm transition-colors duration-2 cursor-pointer ${
              groupsFilter.includes(item.id) ? "bg-accent" : ""
            }`}
            onClick={() => changeHandler(item.id)}
          >
            <p className="font-main text-sm capitalize">{item.name}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default GroupFilters;
