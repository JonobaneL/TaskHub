import { useRef, useState } from "react";
import Helper from "./ui/Helper";
import { useEventListener } from "@/hooks/useEventListener";
import { TableParams } from "@/models/projectTypes";
import { updateTableMethod } from "@/firebase/tablesAPI";
import { useTypeSelector } from "@/hooks/useReduxHooks";
import TableHeaderEditor from "./TableHeaderEditor";

type NameProps = {
  table: TableParams;
  taskAmount: number; //isn't working for this moment
};

const TableName = ({ table, taskAmount }: NameProps) => {
  const [edit, setEdit] = useState(false);
  const [tableName, setTableName] = useState(table.name);
  const { project } = useTypeSelector((state) => state.projectReducer);
  const nameRef = useRef<HTMLDivElement>(null);
  // modify this component for actual project info
  const handler = (e: React.MouseEvent<HTMLHeadingElement, MouseEvent>) => {
    e.stopPropagation();
    setEdit(true);
  };

  const onBlurHandler = async (e: Event) => {
    const condition = nameRef.current?.contains(e.target as Node);
    console.log(nameRef.current);
    try {
      if (!condition) {
        setEdit(false);
        if (tableName !== table.name) {
          await updateTableMethod(
            project?.tablesID,
            table.id,
            "name",
            tableName
          );
        }
      }
    } catch (err) {
      console.log(err);
    }
  };
  useEventListener("click", onBlurHandler);
  // console.log(table);
  return (
    <div className="group flex items-center gap-2 py-2 w-fit" ref={nameRef}>
      {edit ? (
        <TableHeaderEditor table={table} onClose={() => setEdit(false)} />
      ) : (
        <Helper content="Click to Edit">
          <h3
            onClick={(e) => handler(e)}
            style={{ color: table.color }}
            className="cursor-text font-main font-semibold text-lg hover:ring-1 px-1 hover:ring-gray-300 rounded-[1px] text-${table.color}"
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
