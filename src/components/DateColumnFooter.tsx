import { useTypeSelector } from "@/hooks/useReduxHooks";
import { TableTanstack } from "@/models/projectTypes";
import { dateFormating } from "@/utils/dateFormating";
import { getDaysAmount } from "@/utils/getDaysAmount";
import { getStartEndDate } from "@/utils/getStartEndDate";

const DateColumnFooter = ({ table }: TableTanstack) => {
  const { project } = useTypeSelector((state) => state.projectReducer);
  const taskTable = project.tables?.find(
    (item) => item.id === table.options.meta?.tableID
  );
  const date = getStartEndDate(taskTable?.tasks);
  const days = getDaysAmount(date?.startDate, date?.endDate);
  return (
    <div className="h-full w-full p-1.5">
      <div className="group h-full flex items-center justify-center bg-accent-b rounded-[0.2rem] cursor-pointer text-sm">
        <p className="font-normal text-background group-hover:hidden ">
          {dateFormating(date?.startDate)} - {dateFormating(date?.endDate)}
        </p>
        <p className="font-normal text-background hidden group-hover:block">
          {days} days
        </p>
      </div>
    </div>
  );
};

export default DateColumnFooter;
