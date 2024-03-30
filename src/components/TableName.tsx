import { useRef, useState } from "react";
import Helper from "./ui/Helper";
import ColorPicker from "./ui/ColorPicker";
import { table_colors } from "@/data/table_colors";
import { useEventListener } from "@/hooks/useEventListener";

type NameProps = {
  table: {
    name: string;
    color: string;
  };
  taskAmount: number;
};

const TableName = ({ table, taskAmount }: NameProps) => {
  const [edit, setEdit] = useState(false);
  const [tableName, setTableName] = useState(table.name);
  const nameRef = useRef<HTMLDivElement>(null);
  // modify this component for actual project info
  const handler = (e: React.MouseEvent<HTMLHeadingElement, MouseEvent>) => {
    e.stopPropagation();
    setEdit(true);
  };

  const onBlurHandler = (e: Event) => {
    const condition = nameRef.current?.contains(e.target as Node);
    if (!condition) {
      setEdit(false);
    }
  };
  useEventListener("click", onBlurHandler);
  return (
    <div className="group flex items-center gap-2 py-2 w-fit" ref={nameRef}>
      {edit ? (
        <>
          <ColorPicker color={table.color} colors={table_colors} type="round" />
          <input
            autoFocus
            className="max-w-56 font-main font-semibold text-lg ring-1 px-1 ring-gray-300 rounded-[1px]"
            value={tableName}
            onChange={(e) => setTableName(e.target.value)}
            type="text"
          />
        </>
      ) : (
        <Helper content="Click to Edit">
          <h3
            onClick={(e) => handler(e)}
            className="cursor-text font-main font-semibold text-lg hover:ring-1 px-1 hover:ring-gray-300 rounded-[1px] text-primary"
          >
            {tableName}
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
