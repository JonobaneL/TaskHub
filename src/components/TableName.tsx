import { useRef, useState } from "react";
import Helper from "./ui/Helper";
import { TableParams } from "@/models/projectTypes";
import TableHeaderEditor from "./TableHeaderEditor";

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
      className="group flex items-center gap-2 py-2 w-fit pl-1"
      ref={nameRef}
    >
      {edit ? (
        <TableHeaderEditor
          table={table}
          onClose={() => setEdit(false)}
          condition={conditionHandler}
        />
      ) : (
        <Helper side="right" content="Click to Edit">
          <h3
            onClick={(e) => handler(e)}
            style={{ color: table.color }}
            className="cursor-text font-main font-semibold text-lg hover:ring-1 px-1 hover:ring-gray-300 rounded-[1px] text-${table.color}"
          >
            {table.name}
          </h3>
        </Helper>
      )}
      <p className="cursor-pointer opacity-0 group-hover:opacity-100 transition duration-100 text-sm leading-7 text-xs text-gray-500">
        {taskAmount} Tasks
      </p>
    </div>
  );
};

export default TableName;
