import { UserDetails } from "@/models/userTypes";
import { Skeleton } from "./skeleton";

type BadgeProps = {
  isLoading: boolean;
  user: UserDetails;
};

const UserBadge = ({ isLoading, user }: BadgeProps) => {
  return (
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
  );
};

export default UserBadge;
