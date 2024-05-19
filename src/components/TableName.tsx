import { useRef, useState } from "react";
import Helper from "./ui/Helper";
import { TableParams } from "@/models/projectTypes";
import TableHeaderEditor from "./TableHeaderEditor";
import TableDropdownMenu from "./TableDropdownMenu";

type NameProps = {
  table: TableParams;
  taskAmount: number;
};

const TableName = ({ table, taskAmount }: NameProps) => {
  const [edit, setEdit] = useState(false);
  const nameRef = useRef<HTMLDivElement>(null);
  const handler = (e: React.MouseEvent<HTMLHeadingElement, MouseEvent>) => {
    e.stopPropagation();
    setEdit(true);
  };
  const conditionHandler = (e: Event) => {
    return nameRef.current?.contains(e.target as Node);
  };

  return (
    <div
      className="group flex items-center gap-2 py-2 w-fit pl-1 overflow-hidden"
      ref={nameRef}
    >
      {edit ? (
        <TableHeaderEditor
          table={table}
          onClose={() => setEdit(false)}
          condition={conditionHandler}
        />
      ) : (
        <div className="flex items-center">
          <TableDropdownMenu table={table} />
          <Helper side="right" content="Click to Edit">
            <h3
              onClick={(e) => handler(e)}
              style={{
                color: table.color,
              }}
              className="cursor-text font-main font-semibold text-lg hover:ring-1 px-1 hover:ring-gray-300 rounded-[1px] -translate-x-7 group-hover:translate-x-1 transition-transform	duration-300"
            >
              {table.name}
            </h3>
          </Helper>
        </div>
      )}
      <p className="cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity duration-100 text-sm  text-xs text-gray-500">
        {taskAmount} Tasks
      </p>
    </div>
  );
};

export default TableName;
