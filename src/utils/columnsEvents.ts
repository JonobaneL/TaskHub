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
import { MemberDetails } from "@/models/userTypes";

dayjs.extend(isToday);
dayjs.extend(isTomorrow);
dayjs.extend(isYesterday);
dayjs.extend(isSameOrBefore);
dayjs.extend(isSameOrAfter);

export const dueDateFilterEvent = (
  row: Row<TaskParams>,
  _: string,
  filter: any
) => {
  if (filter.length == 0) return true;
  const date = row.original.due_date;
  if (filter.includes("blank") && date == null) return true;
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

export const columnFilterEvet = <T>(
  row: Row<T>,
  filter: any,
  field: string,
  includeBlank: boolean = false
) => {
  if (filter.length == 0) return true;
  const columnValue = row.original[field as keyof T];
  if (includeBlank && filter.includes("blank") && columnValue == null)
    return true;
  return filter.includes(columnValue);
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
  }
  if (filter.includes("blank")) {
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

export const nameSortingEvent = (
  rowA: Row<MemberDetails>,
  rowB: Row<MemberDetails>
) => {
  const name1 = `${rowA.original.firstName?.toLowerCase()} ${rowA.original.lastName?.toLowerCase()}`;
  const name2 = `${rowB.original.firstName?.toLowerCase()} ${rowB.original.lastName?.toLowerCase()}`;
  if (name1 < name2) {
    return -1;
  }
  if (name1 > name2) {
    return 1;
  }
  return 0;
};
export const nameSearch = (row: Row<MemberDetails>, _: string, filter: any) => {
  if (filter.length == 0) return true;
  const fullName = `${row.original.firstName?.toLowerCase()} ${row.original.lastName?.toLowerCase()}`;
  const email = row.original.email?.toLowerCase() || "";
  const searchQuery = filter.toLowerCase();
  const searchName = fullName.search(searchQuery) >= 0 ? true : false;
  const searchEmail = email.search(searchQuery) >= 0 ? true : false;
  return searchName || searchEmail;
};
