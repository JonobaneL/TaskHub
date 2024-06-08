import TimeAgo from "react-timeago";

export const timeAgoFormatter = (value: number, unit: TimeAgo.Unit) => {
  const shortUnit = unit == "month" ? "mth" : unit.slice(0, 1);
  return `${value}${shortUnit}`;
};
