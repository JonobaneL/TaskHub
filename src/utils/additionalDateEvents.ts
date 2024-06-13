import dayjs from "dayjs";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";
import isSameOrAfter from "dayjs/plugin/isSameOrAfter";
import { useTableContex } from "@/context/TableContext";

dayjs.extend(isSameOrBefore);
dayjs.extend(isSameOrAfter);

type PeriodProps = "week" | "month";
export const isSomePeriod = (
  date: dayjs.Dayjs,
  indicator: number,
  period: PeriodProps
) => {
  const point = dayjs(new Date(Date.now())).add(indicator, period);
  const start = point.startOf(period);
  const end = point.endOf(period);
  return date.isSameOrAfter(start) && date.isSameOrBefore(end);
};
export const isDone = (date: string, status: string) => {
  const modifiedDate = dayjs(date);
  const today = dayjs(new Date(Date.now()));
  const { doneStatus } = useTableContex();
  return (
    (modifiedDate.isSameOrAfter(today) || modifiedDate.isToday()) &&
    status == doneStatus?.labelID
  );
};
export const isOverdue = (date: string, status: string) => {
  const modifiedDate = dayjs(date);
  const yesterday = dayjs(new Date(Date.now())).add(-1, "day");
  const { doneStatus } = useTableContex();
  return (
    modifiedDate.isSameOrBefore(yesterday) && status != doneStatus?.labelID
  );
};
export const isDoneOverdue = (date: string, status: string) => {
  const modifiedDate = dayjs(date);
  const yesterday = dayjs(new Date(Date.now())).add(-1, "day");
  const { doneStatus } = useTableContex();
  return (
    modifiedDate.isSameOrBefore(yesterday) && status == doneStatus?.labelID
  );
};
