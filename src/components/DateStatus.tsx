import attentionIcon from "../assets/images/attention.svg";
import doneIcon from "../assets/images/done.svg";
import doneLaterIcon from "../assets/images/done-later.svg";
import { useMemo } from "react";
import { Row } from "@tanstack/react-table";
import { TaskParams } from "@/models/projectTypes";
import { checkDeadline } from "@/utils/checkDeadline";
import Helper from "./ui/Helper";

const statusNotification = [
  {
    name: "attention",
    content: "Deadline Passed",
    icon: attentionIcon,
  },
  {
    name: "done",
    content: "Done on time",
    icon: doneIcon,
  },
  {
    name: "done-later",
    content: "Done after deadline",
    icon: doneLaterIcon,
  },
];

type StatusProps = {
  row: Row<TaskParams>;
};

const DateStatus = ({ row }: StatusProps) => {
  const { status, due_date } = row.original;
  const isDeadlinePassed = checkDeadline(due_date);

  const currentStatus = useMemo(() => {
    if (status == "done" && !isDeadlinePassed) return statusNotification[1];
    if (status == "done" && isDeadlinePassed) return statusNotification[2];
    if (isDeadlinePassed) return statusNotification[0];
    return null;
  }, [status, due_date]);
  return (
    <div className="absolute left-2">
      {currentStatus != null && (
        <Helper side="top" content={currentStatus.content}>
          <img
            src={currentStatus.icon}
            alt={currentStatus.name}
            className="w-[1.1rem] h-[1.1rem]"
          />
        </Helper>
      )}
    </div>
  );
};

export default DateStatus;
