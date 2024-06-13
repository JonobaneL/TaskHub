import { fakeMembers } from "@/data/fakeMembers";
import { dateFormating } from "@/utils/dateFormating";
import Helper from "./ui/Helper";
import { TbClockHour8 } from "react-icons/tb";
import { timeAgoFormatter } from "@/utils/timeAgoFormatter";
import { CommentParams } from "@/models/commentTypes";
import CommentMenu from "./CommentMenu";
import PinBadge from "./ui/PinBadge";
import { useComment } from "@/context/CommentContext";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

type HeaderProps = {
  comment: CommentParams;
};
dayjs.extend(relativeTime);

const CommentHeader = ({ comment }: HeaderProps) => {
  const d = dayjs(comment.date);
  const timeFromNow = d.fromNow(true);
  const { edit } = useComment();
  return (
    <div className="flex items-center justify-between mb-5 relative">
      <div className="flex gap-2 items-center p-1 rounded w-fit">
        <img
          className="w-9 h-9 rounded-full"
          src={fakeMembers[0].image}
          alt="avatar"
        />
        <p className="text-sm font-main">{fakeMembers[0].name}</p>
      </div>
      <PinBadge triger={comment.isPinned} />
      {!edit ? (
        <div className="flex items-center gap-1 cursor-default">
          <Helper content={dateFormating(comment.date, true)}>
            <div className="flex gap-0.5 items-center">
              <TbClockHour8 className="size-4 text-gray-500" />
              <p className="text-sm font-main text-gray-500 font-medium pointer-events-none">
                {timeAgoFormatter(timeFromNow)}
              </p>
            </div>
          </Helper>
          <CommentMenu comment={comment} />
        </div>
      ) : null}
    </div>
  );
};

export default CommentHeader;
