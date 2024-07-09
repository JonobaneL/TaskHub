import InviteModal from "@/components/InviteModal";
import TeamMembers from "@/components/TeamMembers";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getAllMembers } from "@/firebase/projectAPI";
import { useAsync } from "@/hooks/useAsync";
import { useTypeSelector } from "@/hooks/useReduxHooks";
import { UserDetails } from "@/models/userTypes";

const MembersPage = () => {
  const { project } = useTypeSelector((state) => state.projectReducer);
  const [isLoading, _, users] = useAsync<UserDetails[]>(
    () => getAllMembers(project.projectID || ""),
    [project.projectID]
  );
  return (
    <section className="p-5">
      <h2 className="font-main text-[1.5rem] font-semibold text-text ">
        Members
      </h2>
      <div className="mb-4 mt-1 flex justify-between items-center gap-4">
        <h4 className="font-main">
          To add another member to the team, simply click on the "Invite" button
          below
        </h4>
        <InviteModal />
      </div>
      <Tabs defaultValue="team" orientation="vertical" className="flex gap-2">
        <TabsList className="flex flex-col w-1/6 min-w-40 h-fit flex-fix bg-transparent rounded-none p-0">
          <TabsTrigger
            value="team"
            className="font-main w-full justify-start h-10 text-[0.9rem] border-r-2 rounded-none data-[state=active]:border-r-2 data-[state=active]:bg-inherit data-[state=active]:border-accent-b transition-all duration-150"
          >
            Team
          </TabsTrigger>
          <TabsTrigger
            value="requests"
            className="font-main w-full justify-start h-10 text-[0.9rem] border-r-2 rounded-none data-[state=active]:border-r-2 data-[state=active]:bg-inherit data-[state=active]:border-accent-b transition-all duration-150"
          >
            Join Request
          </TabsTrigger>
        </TabsList>
        <TabsContent value="team" className="w-full overflow-x-hidden">
          <TeamMembers users={users} isLoading={isLoading} />
        </TabsContent>
        <TabsContent value="requests">Join Request</TabsContent>
      </Tabs>
    </section>
  );
};

export default MembersPage;
