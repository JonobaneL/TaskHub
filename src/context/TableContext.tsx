import { defaultColumns } from "@/data/defaultColumns";
import { useColumnFilters } from "@/hooks/useColumnFilters";
import { useTypeSelector } from "@/hooks/useReduxHooks";
import { useSelectedGroups } from "@/hooks/useSelectedGroups";
import { EditColumnsParams } from "@/models/TableTypes";
import { ProviderProps, TableProviderParams } from "@/models/tableContextTypes";
import { createContext, useContext, useState } from "react";

const TableContext = createContext<TableProviderParams | null>(null);

export const useTableContex = () => {
  return useContext(TableContext) as TableProviderParams;
};

export const TableProvider = ({ children }: ProviderProps) => {
  const { project } = useTypeSelector((state) => state.projectReducer);
  const doneStatus =
    project?.status_labels?.find((item) => item?.role == "done") || null;
  const [columns, setColumns] = useState<EditColumnsParams>(
    defaultColumns.map((item) => {
      return { ...item, checked: true };
    })
  );
  const selectedGroups = useSelectedGroups();
  const editColumns = columns.reduce((prev, item) => {
    return { ...prev, [item.label]: item.checked };
  }, {});
  const columnsFilter = useColumnFilters();

  const intialValue: TableProviderParams = {
    columns,
    editColumns,
    setColumns,
    ...columnsFilter,
    doneStatus,
    ...selectedGroups,
  };

  return (
    <TableContext.Provider value={intialValue}>
      {children}
    </TableContext.Provider>
  );
};
