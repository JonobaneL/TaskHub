import { RowData } from "@tanstack/react-table";
import { AddTaskParams } from "./projectTypes";

declare module "@tanstack/react-table" {
  interface TableMeta<TData extends RowData> {
    updateData: (rowIndex: number, columnId: string, value: unknown) => void;
    addTask: (task: AddTaskParams) => void;
    tableID: string;
  }
}