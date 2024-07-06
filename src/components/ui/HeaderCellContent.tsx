import { TaskParams } from "@/models/projectTypes";
import { Header, flexRender } from "@tanstack/react-table";
import Helper from "./Helper";
import { PiArrowsDownUpBold } from "react-icons/pi";
import { TbSortAscending2, TbSortDescending2 } from "react-icons/tb";

type HeaderProps<T> = {
  header: Header<T, unknown>;
};

const HeaderCellContent = <T,>({ header }: HeaderProps<T>) => {
  const canSort = header.column.getCanSort();
  const isSorted = header.column.getIsSorted();
  const content = !isSorted ? (
    "Sort"
  ) : isSorted == "asc" ? (
    <div className="flex gap-0.5 items-center text-white font-main">
      <TbSortAscending2 /> Ascending
    </div>
  ) : (
    <div className="flex gap-0.5 items-center text-white font-main">
      <TbSortDescending2 />
      Descending
    </div>
  );
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
              className="text-accent-b transition-all duration-1 -translate-x-4 group-hover:translate-x-0 cursor-pointer opacity-0 invisible group-hover:visible group-hover:opacity-100"
            />
          </div>
        </Helper>
      )}
    </div>
  );
};

export default HeaderCellContent;
