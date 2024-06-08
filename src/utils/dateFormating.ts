export const dateFormating = (
  date: string | null | undefined,
  time: boolean = false
) => {
  if (!date) return "";
  const dateString = date?.split(" ");
  const currentYear = new Date(Date.now()).getFullYear().toString();
  const dateToShow = `${dateString[1]} ${dateString[0]} ${
    currentYear !== dateString[2] ? dateString[2] : ""
  } ${time ? `at ${dateString[dateString.length - 1]}` : ""}`;

  return dateToShow;
};
