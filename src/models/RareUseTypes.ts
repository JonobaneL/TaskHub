import { Row, Table } from "@tanstack/react-table";
import { TaskParams } from "./projectTypes";

export type DynamicKeyObject = {
  [key: string]: {
    value: number;
    color: string;
  };
};
export type LabelsTypeParams = "status_labels" | "priority_labels";

export type TaskContextMenuProps = {
  children: React.ReactNode;
  table: Table<TaskParams>;
  row: Row<TaskParams>;
};
