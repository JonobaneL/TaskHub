import { useMemo } from "react";
import { Row } from "@tanstack/react-table";
import { TaskParams } from "@/models/projectTypes";
import { checkDeadline } from "@/utils/checkDeadline";
import Helper from "./ui/Helper";
import { dateStatuses } from "@/data/dateStatuses";

type StatusProps = {
  row: Row<TaskParams>;
};

const DateStatus = ({ row }: StatusProps) => {
  const { status, due_date } = row.original;
  const isDeadlinePassed = checkDeadline(due_date);
  const currentStatus = useMemo(() => {
    if (status == "done" && !isDeadlinePassed) return dateStatuses[1];
    if (status == "done" && isDeadlinePassed) return dateStatuses[2];
    if (isDeadlinePassed) return dateStatuses[0];
    return null;
  }, [status, due_date]);
  return (
    <div className="absolute left-2">
      {currentStatus != null && (
        <Helper side="top" content={currentStatus.content}>
          {currentStatus.icon}
        </Helper>
      )}
    </div>
  );
};

export default DateStatus;
