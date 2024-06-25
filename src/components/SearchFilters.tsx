import { Button } from "./ui/button";
import magGlass from "../assets/images/mag-glass.svg";
import { useRef, useState } from "react";
import { useEventListener } from "@/hooks/useEventListener";
import { useTableContex } from "@/context/TableContext";
import SearchField from "./ui/searchField";

const SearchFilters = () => {
  const { filters, setFilters } = useTableContex();
  const changeHandler = (value: string) => {
    setFilters((p) => {
      return { ...p, task: value };
    });
  };
  const activeFilter = filters.task.length > 0;
  const searchFilter = useRef<HTMLDivElement>(null);
  const [isActive, setActive] = useState(false);
  useEventListener("click", (e) => {
    if (!searchFilter.current?.contains(e.target as Node)) {
      setActive(false);
    }
  });
  return (
    <div ref={searchFilter}>
      {!isActive ? (
        <Button
          variant="ghost"
          onClick={(e) => {
            e.stopPropagation();
            setActive(true);
          }}
          className={`h-8 p-2 rounded-sm font-medium text-text font-main text-[0.8rem] ${
            activeFilter ? "bg-accent" : ""
          }`}
        >
          <img src={magGlass} alt="mag-glass" className="mr-1" />
          Search
        </Button>
      ) : (
        <SearchField value={filters.task as string} onChange={changeHandler} />
      )}
    </div>
  );
};

export default SearchFilters;
