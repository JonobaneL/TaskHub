import { useTableContex } from "@/context/TableContext";
import { TaskParams } from "@/models/projectTypes";
import { Table } from "@tanstack/react-table";

export const useCellEvent = (
  table: Table<TaskParams>,
  rowIndex: number,
  columnId: string
) => {
  const { selectedGroups, selectedTasksLength } = useTableContex();
  const updateEvent = (prevValue: string | null, value: string) => {
    if (selectedTasksLength > 1) {
      for (let key in selectedGroups) {
        selectedGroups[key].tasks.forEach((task) => {
          if (task[columnId as keyof TaskParams] !== value) {
            table.options.meta?.updateCellByID(key, task.id, columnId, value);
          }
        });
      }
      return;
    }
    if (prevValue !== value) {
      table.options.meta?.updateData(rowIndex, columnId, value);
    }
  };
  const removeEvent = () => {
    if (selectedTasksLength > 1) {
      for (let key in selectedGroups) {
        selectedGroups[key].tasks.forEach((task) => {
          table.options.meta?.updateCellByID(key, task.id, columnId, null);
        });
      }
      return;
    }
    table.options.meta?.updateData(rowIndex, columnId, null);
  };
  return { updateEvent, removeEvent };
};
