import { useTableContex } from "@/context/TableContext";
import { useState } from "react";
import { IoMdCloseCircleOutline } from "react-icons/io";

const DueDateFilters = () => {
  const { filters, changeFilters, clearFilter } = useTableContex();
  const [limit, setLimit] = useState(6);
  const statusFilters = ["Overdue", "Done on time", "Done overdue"];
  const periodFilters = [
    "Today",
    "Tommorow",
    "Yesterday",
    "Last week",
    "This week",
    "Next week",
    "Last month",
    "This month",
    "Next month",
    "Blank",
  ];

  return (
    <div className="w-fit max-w-52">
      <div className="flex justify-between mb-3 border-b pb-1 items-center">
        <h3 className="font-main  text-sm font-medium">Due Date</h3>
        {filters.due_date.length > 0 && (
          <IoMdCloseCircleOutline
            className="cursor-pointer"
            size="1.1rem"
            color="#6B6B6B"
            onClick={() => clearFilter("due_date")}
          />
        )}
      </div>
      <div>
        <ul className="w-fit flex flex-wrap gap-1 mb-2">
          {statusFilters.map((item, index) => (
            <li
              key={index}
              className={`px-2 py-1.5 hover:bg-accent rounded-sm transition-colors duration-2 cursor-pointer ${
                filters.due_date.includes(item.toLowerCase()) ? "bg-accent" : ""
              }`}
              onClick={() => changeFilters("due_date", item.toLowerCase())}
            >
              <p className="font-main text-sm">{item}</p>
            </li>
          ))}
        </ul>
        <ul className="w-fit flex flex-wrap gap-1">
          {periodFilters.map((item, index) =>
            index < limit ? (
              <li
                key={index}
                className={`px-2 py-1.5 hover:bg-accent rounded-sm transition-colors duration-2 cursor-pointer ${
                  filters.due_date.includes(item.toLowerCase())
                    ? "bg-accent"
                    : ""
                }`}
                onClick={() => changeFilters("due_date", item.toLowerCase())}
              >
                <p className="font-main text-sm">{item}</p>
              </li>
            ) : null
          )}
        </ul>
        {limit == 6 && (
          <div
            onClick={() => setLimit(periodFilters.length)}
            className="flex justify-center text-primary cursor-pointer text-sm font-main underline"
          >
            Show more
          </div>
        )}
      </div>
    </div>
  );
};

export default DueDateFilters;
