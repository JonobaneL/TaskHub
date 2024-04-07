import { useState } from "react";
import ColorPicker from "./ui/ColorPicker";
import { table_colors } from "@/data/table_colors";
import { TableParams } from "@/models/projectTypes";
import { useTypeDispatch } from "@/hooks/useReduxHooks";
import { updateTableHeader } from "@/store/reducers/projectsSlice";

type EditorParams = {
  table: TableParams;
  onClose: () => void;
};
const TableHeaderEditor = ({ table }: EditorParams) => {
  const [tableName, setTableName] = useState(table.name);
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
        value={tableName}
        onChange={(e) => setTableName(e.target.value)}
        type="text"
      />
    </>
  );
};

export default TableHeaderEditor;
