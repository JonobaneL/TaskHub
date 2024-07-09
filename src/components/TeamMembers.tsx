import { useTypeSelector } from "@/hooks/useReduxHooks";
import { MemberDetails, UserDetails } from "@/models/userTypes";
import { useMemo, useState } from "react";
import Loader from "./ui/Loader";
import MembersTable from "./MembersTable";
import { ColumnFiltersParams } from "@/models/TableTypes";
import MemberFilters from "./MembersFilters";

type MembersProps = {
  isLoading: boolean;
  users: UserDetails[] | undefined;
};

const TeamMembers = ({ isLoading, users }: MembersProps) => {
  const { project } = useTypeSelector((state) => state.projectReducer);
  const members = useMemo(() => {
    return users?.map((item) => {
      const details = project?.members?.find(
        (member) => member.memberID == item.id
      );
      return { ...item, ...details };
    });
  }, [users, project.members]) as MemberDetails[];

  const [filters, setFilters] = useState<ColumnFiltersParams>({
    name: "",
    role: [],
  });
  return (
    <div className="p-1 overflow-x-hidden">
      <MemberFilters filters={filters} onChange={setFilters} />
      {isLoading ? (
        <Loader type="fade" />
      ) : (
        <MembersTable members={members} filters={filters} />
      )}
    </div>
  );
};

export default TeamMembers;
