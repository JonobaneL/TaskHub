export const getDaysAmount = (
  startDate: string | null | undefined,
  endDate: string | null | undefined
) => {
  if (!startDate || !endDate) return 0;
  const start = new Date(startDate).getTime();
  const end = new Date(endDate).getTime();
  const difference = end - start;
  const converted = Math.ceil(difference / (1000 * 60 * 60 * 24)) + 1;
  return converted;
};
