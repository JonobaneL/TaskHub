import { useAsync } from "@/hooks/useAsync";
import { getUserInfo } from "@/firebase/userAPI";
import { UserDetails } from "@/models/userTypes";
import TimeBadge from "./ui/TimeBadge";
import ReplySkeleton from "./ui/ReplySkeleton";
import { ReplyParams } from "@/models/replyTypes";
import ReplyMenu from "./ReplyMenu";
import { useState } from "react";
import EditReplyForm from "./EditReplyForm";
import UserBadge from "./ui/UserBadge";

type ReplyProps = {
  reply: ReplyParams;
  commentID: string;
};

const ReplyItem = ({ reply, commentID }: ReplyProps) => {
  const [isLoading, _, user] = useAsync<UserDetails>(() =>
    getUserInfo(reply.authorID)
  );
  const [edit, setEdit] = useState(false);
  if (isLoading) return <ReplySkeleton />;
  return (
    <div className="flex item-start gap-2.5">
      <UserBadge isLoading={isLoading} user={user} size="9" mode="short" />
      {!edit ? (
        <div className="relative group">
          <ReplyMenu
            commentID={commentID}
            reply={reply}
            editHandler={() => setEdit(true)}
          />
          <div className="bg-accent text-sm rounded-md py-2 px-3 mb-2">
            <p className="text-primary font-main font-medium mb-1 cursor-pointer">
              {user?.firstName} {user?.lastName}
            </p>
            <p>{reply.content}</p>
          </div>
          <div className="flex justify-end">
            <TimeBadge date={reply.date} />
          </div>
        </div>
      ) : (
        <EditReplyForm commentID={commentID} reply={reply} onClose={setEdit} />
      )}
    </div>
  );
};

export default ReplyItem;
