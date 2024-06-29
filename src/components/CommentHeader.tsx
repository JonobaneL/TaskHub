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
import { useAsync } from "@/hooks/useAsync";
import { getUserInfo } from "@/firebase/userAPI";
import { Skeleton } from "./ui/skeleton";
import { UserDetails } from "@/models/userTypes";

type HeaderProps = {
  comment: CommentParams;
};
dayjs.extend(relativeTime);

const CommentHeader = ({ comment }: HeaderProps) => {
  const d = dayjs(comment.date);
  const timeFromNow = d.fromNow(true);
  const { edit } = useComment();
  const [isLoading, _, user] = useAsync<UserDetails>(() =>
    getUserInfo(comment.authorID)
  );
  return (
    <div className="flex items-center justify-between mb-5 relative">
      <div className="flex gap-2 items-center p-1 rounded w-fit">
        {isLoading ? (
          <>
            <Skeleton className="size-9 rounded-full bg-gray-200" />
            <Skeleton className="h-4 w-24 rounded-[2px] bg-gray-200" />
          </>
        ) : (
          <>
            <img
              className="size-9 rounded-full object-top object-cover"
              src={user?.avatar || ""}
              alt="avatar"
            />
            <p className="text-sm font-main">
              {user?.firstName} {user?.lastName}
            </p>
          </>
        )}
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
