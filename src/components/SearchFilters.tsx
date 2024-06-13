import { IoIosClose } from "react-icons/io";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import magGlass from "../assets/images/mag-glass.svg";
import { useRef, useState } from "react";
import { useEventListener } from "@/hooks/useEventListener";
import { useTableContex } from "@/context/TableContext";

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
        <div className="relative w-52">
          <img
            src={magGlass}
            alt="search"
            className="absolute w-4 left-2 top-1/2 -translate-y-1/2"
          />
          <Input
            className="pl-8"
            autoFocus
            value={filters.task}
            onChange={(e) => changeHandler(e.target.value)}
          />
          {activeFilter && (
            <IoIosClose
              onClick={(e) => {
                e.stopPropagation();
                changeHandler("");
              }}
              className="absolute right-1 top-1/2 -translate-y-1/2 cursor-pointer"
              size="1.2rem"
            />
          )}
        </div>
      )}
    </div>
  );
};

export default SearchFilters;
