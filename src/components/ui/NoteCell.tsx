import { CellDefaultProps } from "@/models/projectTypes";
import edit from "../../assets/images/note-edit.svg";
import { useRef, useState } from "react";
import HoverEditButton from "./HoverEditButton";
import removeIcon from "../../assets/images/remove.svg";

const NoteCell = ({ options }: CellDefaultProps) => {
  const noteRef = useRef<HTMLInputElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const { table, column, row } = options;
  const { notes } = row.original;
  const changeHandler = () => {
    const currentValue = noteRef.current?.value;
    if (currentValue && currentValue !== notes) {
      table.options.meta?.updateData(row.index, column.id, currentValue);
    }
    setIsOpen(false);
  };
  const removeHandler = (e: React.MouseEvent<HTMLImageElement, MouseEvent>) => {
    e.stopPropagation();
    table.options.meta?.updateData(row.index, column.id, null);
  };
  return (
    <div
      style={{ width: `${column.columnDef.size}rem` }}
      className="h-full overflow-hidden group"
    >
      {isOpen ? (
        <div className="w-full h-full p-1">
          <input
            defaultValue={notes}
            ref={noteRef}
            className="w-full h-full px-1 border border-grey-500"
            onBlur={changeHandler}
            autoFocus
          />
        </div>
      ) : notes ? (
        <div
          className="h-full w-full px-1 flex items-center relative"
          onClick={() => setIsOpen(true)}
        >
          <p className="text-nowrap truncate">{notes}</p>
          <div className="bg-background absolute right-2 opacity-0 group-hover:opacity-100 cursor-pointer">
            <img
              src={removeIcon}
              onClick={(e) => removeHandler(e)}
              className="w-[1.1rem] h-[1.1rem]"
              alt="remove"
            />
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
