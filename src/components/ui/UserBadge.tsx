import { UserDetails } from "@/models/userTypes";
import { Skeleton } from "./skeleton";
import { Avatar, AvatarFallback, AvatarImage } from "./avatar";
import { getInitials } from "@/utils/getInitials";

type BadgeProps = {
  isLoading: boolean;
  user: UserDetails | undefined;
};

const UserBadge = ({ isLoading, user }: BadgeProps) => {
  const initials = getInitials(user);
  return (
    <div className="flex gap-2 items-center p-1 rounded w-fit">
      {isLoading ? (
        <>
          <Skeleton className="size-9 rounded-full bg-gray-200" />
          <Skeleton className="h-4 w-24 rounded-[2px] bg-gray-200" />
        </>
      ) : (
        <>
          <Avatar>
            <AvatarImage
              className="object-cover object-top"
              src={user?.avatar || ""}
            />
            <AvatarFallback className="bg-accent font-main font-medium text-sm">
              {initials}
            </AvatarFallback>
          </Avatar>
          <p className="text-sm font-main">
            {user?.firstName} {user?.lastName}
          </p>
        </>
      )}
    </div>
  );
};

export default UserBadge;
