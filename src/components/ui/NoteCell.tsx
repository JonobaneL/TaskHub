import { CellDefaultProps } from "@/models/projectTypes";
import edit from "../../assets/images/note-edit.svg";
import { useState } from "react";
import HoverEditButton from "./HoverEditButton";

const NoteCell = ({ options }: CellDefaultProps) => {
  // finish
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="h-full">
      {isOpen ? (
        <div className="w-full h-full p-1">
          <input
            className="w-full h-full border border-grey-500"
            onBlur={() => setIsOpen(false)}
            autoFocus
          />
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
