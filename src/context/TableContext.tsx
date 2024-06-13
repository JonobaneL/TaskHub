import { defaultColumns } from "@/data/defaultColumns";
import { useTypeSelector } from "@/hooks/useReduxHooks";
import { ColumnFiltersParams, EditColumnsParams } from "@/models/TableTypes";
import { LabelParams } from "@/models/projectTypes";
import { createContext, useContext, useState } from "react";

type columnFilter = {
  id: string;
  value: string[] | string;
};
type TableProviderParams = {
  columns: EditColumnsParams;
  editColumns: {
    [key: string]: boolean;
  };
  setColumns: React.Dispatch<React.SetStateAction<EditColumnsParams>>;
  filters: ColumnFiltersParams;
  setFilters: React.Dispatch<React.SetStateAction<ColumnFiltersParams>>;
  changeFilters: (key: string, value: string) => void;
  clearFilter: (key: string) => void;
  groupsFilter: string[];
  setGroupsFilter: React.Dispatch<React.SetStateAction<string[]>>;
  columnFilters: columnFilter[];
  doneStatus: LabelParams | null;
};
const TableContext = createContext<TableProviderParams | null>(null);

export const useTableContex = () => {
  return useContext(TableContext) as TableProviderParams;
};

type ProviderProps = {
  children: React.ReactNode;
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
  const editColumns = columns.reduce((prev, item) => {
    return { ...prev, [item.label]: item.checked };
  }, {});
  const [filters, setFilters] = useState<ColumnFiltersParams>(
    defaultColumns.reduce(
      (prev, item) => {
        return { ...prev, [item.label]: [] };
      },
      { task: "" }
    )
  );

  const columnFilters = Object.keys(filters).map((key) => {
    return { id: key, value: filters[key] };
  });
  const [groupsFilter, setGroupsFilter] = useState<string[]>([]);
  const changeFilters = (key: string, value: string) => {
    setFilters((p) => {
      if (p[key].includes(value))
        return {
          ...p,
          [key]: p[key].filter((item) => item != value), //check later how to remove this warning
        };
      return { ...p, [key]: [...p[key], value] };
    });
  };
  const clearFilter = (key: string) => {
    setFilters((p) => {
      return { ...p, [key]: [] };
    });
  };

  const intialValue: TableProviderParams = {
    columns,
    editColumns,
    setColumns,
    filters,
    setFilters,
    changeFilters,
    clearFilter,
    groupsFilter,
    setGroupsFilter,
    columnFilters,
    doneStatus,
  };

  return (
    <TableContext.Provider value={intialValue}>
      {children}
    </TableContext.Provider>
  );
};
