import { ColumnFiltersParams, EditColumnsParams } from "./TableTypes";
import { LabelParams, TaskParams } from "./projectTypes";

export type ProviderProps = {
  children: React.ReactNode;
};
export type SelectedTaskParams = {
  [key: string]: {
    tasks: TaskParams[];
    onClose: (value?: boolean | undefined) => void;
    color: string;
  };
};
type columnFilter = {
  id: string;
  value: string[] | string;
};
export type TableProviderParams = {
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
  selectedGroups: SelectedTaskParams;
  addTasks: (
    tableID: string,
    tasks: TaskParams[],
    onClose: (value?: boolean | undefined) => void,
    color: string
  ) => void;
  selectedTasksLength: number;
};
