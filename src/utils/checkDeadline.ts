export const checkDeadline = (date: string | null) => {
  if (date == null) return false;
  const convertedDate = new Date(date).getTime();
  const today = new Date(Date.now()).getTime();
  const todayObject = new Date(Date.now()).toDateString();
  if (date == todayObject) return false;
  if (convertedDate > today) return false;
  return true;
};
