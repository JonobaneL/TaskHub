import { TaskParams } from "@/models/projectTypes";
import { Header, flexRender } from "@tanstack/react-table";
import Helper from "./Helper";
import { PiArrowsDownUpBold } from "react-icons/pi";
import dayjs from "dayjs";

type HeaderProps = {
  header: Header<TaskParams, unknown>;
};

const HeaderCellContent = ({ header }: HeaderProps) => {
  const canSort = header.column.getCanSort();
  const isSorted = header.column.getIsSorted();
  //   const date1 = dayjs("2019-01-25");
  //   const date2 = dayjs("2018-06-05");
  //   console.log(date2.diff(date1));
  const content = !isSorted
    ? "Sort"
    : isSorted == "asc"
    ? "Ascending"
    : "Descending";
  return (
    <div className="flex items-center justify-center gap-1">
      <span
        className={`${
          canSort
            ? "translate-x-2 group-hover:translate-x-0 transition-all duration-1"
            : ""
        }`}
      >
        {header.isPlaceholder
          ? null
          : flexRender(header.column.columnDef.header, header.getContext())}
      </span>

      {canSort && (
        <Helper content={content}>
          <div>
            <PiArrowsDownUpBold
              onClick={header.column.getToggleSortingHandler()}
              size="1rem"
              className="text-primary transition-all duration-1 -translate-x-4 group-hover:translate-x-0 cursor-pointer opacity-0 invisible group-hover:visible group-hover:opacity-100"
            />
          </div>
        </Helper>
      )}
    </div>
  );
};

export default HeaderCellContent;
