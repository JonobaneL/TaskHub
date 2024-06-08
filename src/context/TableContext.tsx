import { defaultColumns } from "@/data/defaultColumns";
import { EditColumnsParams } from "@/models/TableTypes";
import { createContext, useContext, useState } from "react";

type TableProviderParams = {
  columns: EditColumnsParams;
  editColumns: {
    [key: string]: boolean;
  };
  setColumns: React.Dispatch<React.SetStateAction<EditColumnsParams>>;
};
const TableContext = createContext<TableProviderParams | null>(null);

export const useTableContex = () => {
  return useContext(TableContext) as TableProviderParams;
};

type ProviderProps = {
  children: React.ReactNode;
};

export const TableProvider = ({ children }: ProviderProps) => {
  const modifiedColumns = defaultColumns.map((item) => {
    return { ...item, checked: true };
  }) as EditColumnsParams;
  const [columns, setColumns] = useState(modifiedColumns);
  const editColumns = columns.reduce((prev, item) => {
    return { ...prev, [item.label]: item.checked };
  }, {});
  const intialValue: TableProviderParams = {
    columns,
    editColumns,
    setColumns,
  };

  return (
    <TableContext.Provider value={intialValue}>
      {children}
    </TableContext.Provider>
  );
};
