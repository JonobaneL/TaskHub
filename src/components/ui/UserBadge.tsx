import { UserDetails } from "@/models/userTypes";
import { Skeleton } from "./skeleton";
import { Avatar, AvatarFallback, AvatarImage } from "./avatar";
import { getInitials } from "@/utils/getInitials";

type BadgeProps = {
  isLoading?: boolean;
  user: UserDetails | undefined;
  mode?: "short" | "default";
  size?: string;
};

const UserBadge = ({
  isLoading = false,
  user,
  mode = "default",
  size = "",
}: BadgeProps) => {
  const initials = getInitials(user);
  return (
    <div
      className={`flex gap-2 ${
        mode == "default" ? "p-1 items-center" : "items-start"
      } rounded w-fit`}
    >
      {isLoading ? (
        <>
          <Skeleton
            className={`size-10 rounded-full bg-gray-200 ${
              size ? `size-${size}` : ""
            }`}
          />
          {mode == "default" && (
            <Skeleton className="h-4 w-24 rounded-[2px] bg-gray-200" />
          )}
        </>
      ) : (
        <>
          <Avatar className={size ? `size-${size}` : ""}>
            <AvatarImage
              className="object-cover object-top"
              src={user?.avatar || ""}
            />
            <AvatarFallback className="bg-accent font-main font-medium text-sm">
              {initials}
            </AvatarFallback>
          </Avatar>
          {mode == "default" && (
            <p className="text-sm font-main">
              {user?.firstName} {user?.lastName}
            </p>
          )}
        </>
      )}
    </div>
  );
};

export default UserBadge;
