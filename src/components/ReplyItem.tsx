import { ReplyParams } from "@/models/commentTypes";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { useAsync } from "@/hooks/useAsync";
import { getUserInfo } from "@/firebase/userAPI";
import { UserDetails } from "@/models/userTypes";
import { getInitials } from "@/utils/getInitials";
import TimeBadge from "./ui/TimeBadge";
import ReplySkeleton from "./ui/ReplySkeleton";

type ReplyProps = {
  reply: ReplyParams;
};

const ReplyItem = ({ reply }: ReplyProps) => {
  const [isLoading, _, user] = useAsync<UserDetails>(() =>
    getUserInfo(reply.authorID)
  );
  const initials = getInitials(user);
  if (isLoading) return <ReplySkeleton />;
  return (
    <div className="flex item-start gap-2.5 flex-wrap">
      <Avatar className="size-9">
        <AvatarImage
          src={user?.avatar || ""}
          className="object-cover object-top"
        />
        <AvatarFallback>{initials}</AvatarFallback>
      </Avatar>
      <div>
        <div className="bg-accent text-sm rounded-md py-2 px-3 mb-2">
          <p className="text-primary font-main font-medium mb-1 cursor-pointer">
            {user?.firstName} {user?.lastName}
          </p>
          <p>{reply.content}</p>
        </div>
        <div className="flex gap-1">
          <TimeBadge date={reply.date} />
          <p className="text-sm text-gray-500 hover:text-primary font-main font-medium border-l pl-1 cursor-pointer">
            Reply
          </p>
        </div>
      </div>
    </div>
  );
};

export default ReplyItem;
