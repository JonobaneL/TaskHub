import { IoIosArrowDown } from "react-icons/io";
import TableDropdownMenu from "./TableDropdownMenu";
import Helper from "./ui/Helper";
import { TableParams } from "@/models/projectTypes";

type ContentProps = {
  table: TableParams;
  editHandler: React.Dispatch<React.SetStateAction<boolean>>;
  defaultHandler: React.Dispatch<React.SetStateAction<boolean>>;
  collapse: boolean;
  collapseHandler: React.Dispatch<React.SetStateAction<boolean>>;
};

const TableNameContent = ({
  table,
  collapse,
  editHandler,
  defaultHandler,
  collapseHandler,
}: ContentProps) => {
  const handler = (e: React.MouseEvent<HTMLHeadingElement, MouseEvent>) => {
    e.stopPropagation();
    editHandler(true);
  };
  return (
    <div className="flex items-center">
      <TableDropdownMenu
        table={table}
        editHandler={editHandler}
        colorHandler={defaultHandler}
        collapseHandler={collapseHandler}
      />
      <div className=" flex items-center -translate-x-7 group-hover:translate-x-1 transition-transform	duration-300">
        <IoIosArrowDown
          style={{ color: table.color }}
          size="1.2rem"
          className={`cursor-pointer ${collapse ? "-rotate-90" : ""}`}
          onClick={() => collapseHandler((p) => !p)}
        />
        <Helper side="right" content="Click to Edit">
          <h3
            onClick={(e) => handler(e)}
            style={{
              color: table.color,
            }}
            className="cursor-text font-main font-semibold text-lg hover:ring-1 px-1 hover:ring-gray-300 rounded-[2px]"
          >
            {table.name}
          </h3>
        </Helper>
      </div>
    </div>
  );
};

export default TableNameContent;
