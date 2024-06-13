import { useMemo } from "react";
import { Row } from "@tanstack/react-table";
import { TaskParams } from "@/models/projectTypes";
import Helper from "./ui/Helper";
import { dateStatuses } from "@/data/dateStatuses";
import { isDone, isDoneOverdue, isOverdue } from "@/utils/additionalDateEvents";

type StatusProps = {
  row: Row<TaskParams>;
};

const DateStatus = ({ row }: StatusProps) => {
  const { status, due_date } = row.original;
  const check = due_date
    ? [
        isOverdue(due_date, status),
        isDone(due_date, status),
        isDoneOverdue(due_date, status),
      ]
    : null;

  const currentStatus = useMemo(() => {
    const index = check?.reduce((prev, item, index) => {
      if (item == true) return index;
      return prev;
    }, -1);
    if (index == -1 || due_date == null) return null;
    return index !== undefined ? dateStatuses[index] : null;
  }, [status, due_date]);
  return (
    <div className="absolute left-2">
      {currentStatus != null && (
        <Helper side="top" content={currentStatus.content}>
          <div>{currentStatus.icon}</div>
        </Helper>
      )}
    </div>
  );
};

export default DateStatus;
