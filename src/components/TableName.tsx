import { useRef, useState } from "react";
import { TableParams } from "@/models/projectTypes";
import TableHeaderEditor from "./TableHeaderEditor";
import TableNameContent from "./TableNameContent";

type NameProps = {
  table: TableParams;
  taskAmount: number;
  collapse: boolean;
  collapseHandler: React.Dispatch<React.SetStateAction<boolean>>;
};

const TableName = ({
  table,
  collapse,
  taskAmount,
  collapseHandler,
}: NameProps) => {
  const [edit, setEdit] = useState(false);
  const [defaultOpen, setDefault] = useState(false);
  const nameRef = useRef<HTMLDivElement>(null);

  const conditionHandler = (e: Event) => {
    return nameRef.current?.contains(e.target as Node);
  };

  return (
    <div
      className={`group flex ${
        collapse ? "flex-col" : "items-center"
      } py-2 gap-2 w-fit pl-1 sticky left-0`}
      ref={nameRef}
    >
      {edit ? (
        <TableHeaderEditor
          table={table}
          onClose={() => {
            setDefault(false);
            setEdit(false);
          }}
          condition={conditionHandler}
          defaultOpen={defaultOpen}
        />
      ) : (
        <TableNameContent
          collapse={collapse}
          editHandler={setEdit}
          defaultHandler={setDefault}
          collapseHandler={collapseHandler}
          table={table}
        />
      )}
      <p
        className={`cursor-pointer ${
          !collapse ? "opacity-0" : "ml-6"
        } group-hover:opacity-100 transition-opacity duration-100 text-sm  text-xs text-gray-500`}
      >
        {taskAmount} Tasks
      </p>
    </div>
  );
};

export default TableName;
