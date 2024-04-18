export const dateFormating = (date: string | null | undefined) => {
  const dateString = date?.split(" ") || "";
  const dateToShow = date ? dateString[2] + " " + dateString[1] : "";
  return dateToShow;
};
