import { CellDefaultProps } from "@/models/projectTypes";
import edit from "../../assets/images/note-edit.svg";
import { useRef, useState } from "react";
import HoverEditButton from "./HoverEditButton";

const NoteCell = ({ options }: CellDefaultProps) => {
  const noteRef = useRef<HTMLInputElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const { table, column, row } = options;
  const changeHandler = () => {
    const currentValue = noteRef.current?.value;
    if (currentValue && currentValue !== row.original.notes) {
      table.options.meta?.updateData(row.index, column.id, currentValue);
    }
    setIsOpen(false);
  };
  return (
    <div
      style={{ width: `${column.columnDef.size}rem` }}
      className="h-full overflow-hidden"
    >
      {isOpen ? (
        <div className="w-full h-full p-1">
          <input
            defaultValue={row.original.notes}
            ref={noteRef}
            className="w-full h-full px-1 border border-grey-500"
            onBlur={changeHandler}
            autoFocus
          />
        </div>
      ) : row.original.notes ? (
        <div
          className="h-full w-full p-1 group"
          onClick={() => setIsOpen(true)}
        >
          <div className="h-full group-hover:border border-grey-500 flex items-center justify-center cursor-pointer">
            <p className="text-nowrap truncate">{row.original.notes}</p>
          </div>
        </div>
      ) : (
        <div className="h-full" onClick={() => setIsOpen(true)}>
          <HoverEditButton img={edit} />
        </div>
      )}
    </div>
  );
};

export default NoteCell;
