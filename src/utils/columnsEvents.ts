import { TaskParams } from "@/models/projectTypes";
import { Row } from "@tanstack/react-table";
import dayjs from "dayjs";
import isToday from "dayjs/plugin/isToday";
import isTomorrow from "dayjs/plugin/isTomorrow";
import isYesterday from "dayjs/plugin/isYesterday";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";
import isSameOrAfter from "dayjs/plugin/isSameOrAfter";
import {
  isDone,
  isDoneOverdue,
  isOverdue,
  isSomePeriod,
} from "./additionalDateEvents";

dayjs.extend(isToday);
dayjs.extend(isTomorrow);
dayjs.extend(isYesterday);
dayjs.extend(isSameOrBefore);
dayjs.extend(isSameOrAfter);

export const statusFilterEvent = (
  row: Row<TaskParams>,
  _: string,
  filter: any
) => {
  if (filter.length == 0) return true;
  const status = row.original.status;
  return filter.includes(status);
};

export const dueDateFilterEvent = (
  row: Row<TaskParams>,
  _: string,
  filter: any
) => {
  if (filter.length == 0) return true;
  const date = row.original.due_date;
  if (filter.includes("blank")) return date == null;
  if (date == null) return false;
  const status = row.original.status;
  return filter.some((item: string) => {
    const currentDay = dayjs(date);
    switch (item) {
      case "overdue":
        return isOverdue(date, status);
      case "done on time":
        return isDone(date, status);
      case "done overdue":
        return isDoneOverdue(date, status);
      case "today":
        return currentDay.isToday();
      case "tommorow":
        return currentDay.isTomorrow();
      case "yesterday":
        return currentDay.isYesterday();
      case "last week":
        return isSomePeriod(currentDay, -1, "week");
      case "this week":
        return isSomePeriod(currentDay, 0, "week");
      case "next week":
        return isSomePeriod(currentDay, 1, "week");
      case "last month":
        return isSomePeriod(currentDay, -1, "month");
      case "this month":
        return isSomePeriod(currentDay, 0, "month");
      case "next month":
        return isSomePeriod(currentDay, 1, "month");
    }
  });
};
export const priorityFilterEvent = (
  row: Row<TaskParams>,
  _: string,
  filter: any
) => {
  if (filter.length == 0) return true;
  const priority = row.original.priority;
  if (filter.includes("blank")) return priority ? false : true;
  return filter.includes(priority);
};
export const notesFilterEvent = (
  row: Row<TaskParams>,
  _: string,
  filter: any
) => {
  if (filter.length == 0 || filter.length == 2) return true;
  const notes = row.original.notes as string | null;
  if (filter.includes("filled")) {
    return notes ? notes.length > 0 : false;
  } else if (filter.includes("blank")) {
    return notes ? notes.length === 0 : true;
  }
};
export const dueDateSortingEvent = (
  rowA: Row<TaskParams>,
  rowB: Row<TaskParams>
) => {
  const first = rowA.original.due_date;
  const second = rowB.original.due_date;
  if (first == null) return -1;
  if (second == null) return 1;
  const date1 = dayjs(first);
  const date2 = dayjs(second);
  return date1.diff(date2);
};
