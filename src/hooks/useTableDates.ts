import { getStartEndDate } from "@/utils/getStartEndDate";
import { useTypeSelector } from "./useReduxHooks";
import { getDaysAmount } from "@/utils/getDaysAmount";

export const useTableDates = (tableID: string | undefined) => {
  if (!tableID) return { date: null, days: 0 };
  const { project } = useTypeSelector((state) => state.projectReducer);
  const taskTable = project.tables?.find((item) => item.id === tableID);
  const date = getStartEndDate(taskTable?.tasks);
  const days = getDaysAmount(date?.startDate, date?.endDate);
  return { date, days };
};
