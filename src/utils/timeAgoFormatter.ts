export const timeAgoFormatter = (time: string) => {
  if (time == "a minute") return "just now";
  const converted = time.split(" ");
  const shortUnit = converted[1] == "month" ? "mth" : converted[1].slice(0, 1);
  return `${converted[0]}${shortUnit}`;
};
