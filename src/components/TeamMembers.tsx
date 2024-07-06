import { getAllMembers } from "@/firebase/projectAPI";
import { useAsync } from "@/hooks/useAsync";
import { useTypeSelector } from "@/hooks/useReduxHooks";
import { UserDetails } from "@/models/userTypes";
import UserBadge from "./ui/UserBadge";

const TeamMembers = () => {
  const { project } = useTypeSelector((state) => state.projectReducer);

  const [isLoading, _, users] = useAsync<UserDetails[]>(
    () => getAllMembers(project.projectID || ""),
    [project.projectID]
  );

  console.log(users);
  return (
    <div>
      <div className="flex flex-col gap-2 w-full">
        <div className="grid gap-4 grid-cols-5 items-center border-b w-full p-2 justify-items-center">
          <p className="font-main text-sm justify-self-start font-medium">
            Name
          </p>
          <p className="font-main text-sm justify-self-start font-medium">
            Email
          </p>
          <p className="font-main text-sm font-medium">Role</p>
          <p className="font-main text-sm font-medium">Joined</p>
          <p className="font-main text-sm font-medium">Last Active</p>
        </div>
        {users?.map((item) => (
          <div
            key={item.id}
            className="grid gap-4 grid-cols-5 items-center hover:bg-background transition-all duration-100 shadow-sm w-full px-2 py-1"
          >
            <UserBadge user={item} />
            <p className="font-main text-sm">{item.email}</p>
            <div className="w-fit h-fit bg-accent-y font-main text-sm rounded-sm px-2 py-1 font-medium justify-self-center">
              Admin
            </div>
            <p className="font-main text-sm justify-self-center">
              16 May, 2024
            </p>
            <p className="font-main text-sm justify-self-center">
              06 Jun, 2024
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TeamMembers;
