import { fakeRequests } from "@/data/fakeRequests";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import TeamMembers from "./TeamMembers";
import { useTypeSelector } from "@/hooks/useReduxHooks";
import { useAsync } from "@/hooks/useAsync";
import { UserDetails } from "@/models/userTypes";
import { getAllMembers } from "@/firebase/projectAPI";

const MembersTabs = () => {
  const { project } = useTypeSelector((state) => state.projectReducer);
  const [isLoading, _, users] = useAsync<UserDetails[]>(
    () => getAllMembers(project.projectID || ""),
    [project.projectID]
  );
  return (
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
      <TabsContent value="requests" className="w-full">
        <div className="p-1 divide-y">
          <div className="flex items-center font-main text-sm font-medium h-10 px-2">
            <p className="min-w-32 w-1/3">Email</p>
            <p>Send Date</p>
          </div>
          {fakeRequests.map((item) => (
            <div key={item.id} className="flex h-11 items-center text-sm px-2">
              <p className="min-w-32 w-1/3">{item.email}</p>
              <p>{item.sendDate}</p>
            </div>
          ))}
        </div>
      </TabsContent>
    </Tabs>
  );
};

export default MembersTabs;
