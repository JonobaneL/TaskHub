import { useTableDates } from "@/hooks/useTableDates";
import { dateFormating } from "@/utils/dateFormating";

type ContentProps = {
  type: string;
  tableID: string | undefined;
};

const DateFooterCellContent = ({ type, tableID }: ContentProps) => {
  const { date, days } = useTableDates(tableID);
  if (!date?.startDate && !date?.startDate)
    return (
      <div className="h-full text-center text bg-accent leading-5 rounded-[0.2rem]">
        <p>&#8212;</p>
      </div>
    );
  return (
    <div className="group h-full flex items-center justify-center bg-accent-b rounded-[0.2rem] cursor-pointer text-sm">
      {type == "Range" ? (
        <>
          <p className="font-normal text-background group-hover:hidden ">
            {date.startDate == date.endDate
              ? dateFormating(date.endDate)
              : `${dateFormating(date?.startDate)} - ${dateFormating(
                  date?.endDate
                )}`}
          </p>
          {date?.startDate && (
            <p className="font-normal text-background hidden group-hover:block">
              {days} {days == 1 ? "day" : "days"}
            </p>
          )}
        </>
      ) : (
        <p className="font-normal text-background">
          {type == "Earliest"
            ? dateFormating(date?.startDate)
            : dateFormating(date?.endDate)}
        </p>
      )}
    </div>
  );
};

export default DateFooterCellContent;
