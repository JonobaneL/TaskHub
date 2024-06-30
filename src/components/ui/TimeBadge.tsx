import { dateFormating } from "@/utils/dateFormating";
import Helper from "./Helper";
import { TbClockHour8 } from "react-icons/tb";
import dayjs from "dayjs";

type BadgeProps = {
  date: string;
};

const TimeBadge = ({ date }: BadgeProps) => {
  const d = dayjs(date);
  const timeFromNow = d.fromNow(true);
  return (
    <Helper content={dateFormating(date, true)}>
      <div className="flex gap-0.5 items-center w-fit">
        <TbClockHour8 className="size-4 text-gray-500" />
        <p className="text-sm font-main text-gray-500 font-medium pointer-events-none">
          {timeFromNow}
        </p>
      </div>
    </Helper>
  );
};

export default TimeBadge;
