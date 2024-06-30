import { UserDetails } from "@/models/userTypes";

export const getInitials = (user: UserDetails | undefined) => {
  if (user?.firstName && user?.lastName)
    return (
      user.firstName[0].toUpperCase() + user.lastName[0].toLocaleUpperCase()
    );
  return "US";
};
