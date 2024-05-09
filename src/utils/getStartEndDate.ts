import { TaskParams } from "@/models/projectTypes";

export const getStartEndDate = (tasks: TaskParams[] | null | undefined) => {
  if (!tasks) return null;
  const filteredDays = tasks
    .filter((item) => item.due_date !== null)
    .map((item) => item.due_date);
  const convertedDate = filteredDays.map((item) =>
    new Date(item || "").getTime()
  );
  const min = Math.min.apply(null, convertedDate);
  const max = Math.max.apply(null, convertedDate);
  const startDate = new Date(min).toDateString();
  const endDate = new Date(max).toDateString();
  return { startDate, endDate };
};
