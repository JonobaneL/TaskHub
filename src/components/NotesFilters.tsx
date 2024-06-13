import { useTableContex } from "@/context/TableContext";
import { IoMdCloseCircleOutline } from "react-icons/io";

const NotesFilters = () => {
  const { filters, changeFilters, clearFilter } = useTableContex();
  return (
    <div className="w-fit">
      <div className="flex justify-between mb-3 border-b pb-1 items-center gap-4">
        <h3 className="font-main  text-sm font-medium">Notes</h3>
        {filters.notes.length > 0 ? (
          <IoMdCloseCircleOutline
            className="cursor-pointer"
            size="1.1rem"
            color="#6B6B6B"
            onClick={() => clearFilter("notes")}
          />
        ) : (
          <div className="size-[1.1rem]" />
        )}
      </div>
      <ul className="w-full space-y-1">
        <li
          className={`gap-1.5 px-2 py-1.5 hover:bg-accent rounded-sm transition-colors duration-2 cursor-pointer ${
            filters.notes.includes("filled") ? "bg-accent" : ""
          }`}
          onClick={() => changeFilters("notes", "filled")}
        >
          <p className="font-main text-sm">Filled</p>
        </li>
        <li
          className={`px-2 py-1.5 hover:bg-accent rounded-sm transition-colors duration-2 cursor-pointer ${
            filters.notes.includes("blank") ? "bg-accent" : ""
          }`}
          onClick={() => changeFilters("notes", "blank")}
        >
          <p className="font-main text-sm">Blank</p>
        </li>
      </ul>
    </div>
  );
};

export default NotesFilters;
