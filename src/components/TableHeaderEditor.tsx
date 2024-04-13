import { useRef } from "react";
import ColorPicker from "./ui/ColorPicker";
import { table_colors } from "@/data/table_colors";
import { TableParams } from "@/models/projectTypes";
import { useTypeDispatch } from "@/hooks/useReduxHooks";
import { useEventListener } from "@/hooks/useEventListener";
import { updateTableHeader } from "@/store/thunks/projectsThunks";

type EditorParams = {
  table: TableParams;
  onClose: () => void;
  condition: (e: Event) => boolean | undefined;
};
const TableHeaderEditor = ({ table, onClose, condition }: EditorParams) => {
  const nameRef = useRef<HTMLInputElement>(null);
  const dispatch = useTypeDispatch();
  const colorHandler = async (name: string) => {
    dispatch(
      updateTableHeader({
        tableID: table.id,
        key: "color",
        value: name,
      })
    );
  };
  const onBlurHandler = async (e: Event) => {
    const triger = condition(e);
    if (!triger) {
      onClose();
      if (nameRef.current?.value !== table.name) {
        dispatch(
          updateTableHeader({
            tableID: table.id,
            key: "name",
            value: nameRef.current?.value || "",
          })
        );
      }
    }
  };
  useEventListener("click", onBlurHandler);

  return (
    <>
      <ColorPicker
        color={table.color}
        colors={table_colors}
        type="round"
        onChange={colorHandler}
      />
      <input
        autoFocus
        className="max-w-56 font-main font-semibold text-lg ring-1 px-1 ring-gray-300 rounded-[1px]"
        defaultValue={table.name}
        ref={nameRef}
        type="text"
      />
    </>
  );
};

export default TableHeaderEditor;
