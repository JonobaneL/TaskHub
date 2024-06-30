import { CommentParams } from "@/models/commentTypes";
import CommentMenu from "./CommentMenu";
import PinBadge from "./ui/PinBadge";
import { useComment } from "@/context/CommentContext";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { useAsync } from "@/hooks/useAsync";
import { getUserInfo } from "@/firebase/userAPI";
import { UserDetails } from "@/models/userTypes";
import UserBadge from "./ui/UserBadge";
import { localeParams } from "@/data/dayjsLocaleParams";
import TimeBadge from "./ui/TimeBadge";

type HeaderProps = {
  comment: CommentParams;
};

dayjs.extend(relativeTime);
dayjs.locale("en-my-settings", localeParams);

const CommentHeader = ({ comment }: HeaderProps) => {
  const { edit } = useComment();
  const [isLoading, _, user] = useAsync<UserDetails>(() =>
    getUserInfo(comment.authorID)
  );
  return (
    <div className="flex items-center justify-between mb-5 relative">
      <UserBadge isLoading={isLoading} user={user} />
      <PinBadge triger={comment.isPinned} />
      {!edit ? (
        <div className="flex items-center gap-1 cursor-default">
          <TimeBadge date={comment.date} />
          <CommentMenu comment={comment} />
        </div>
      ) : null}
    </div>
  );
};

export default CommentHeader;
