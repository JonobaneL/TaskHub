import TeamMembers from "@/components/TeamMembers";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BiPlus } from "react-icons/bi";

const MembersPage = () => {
  return (
    <section className="p-5">
      <h2 className="font-main text-[1.5rem] font-semibold text-text ">
        Members
      </h2>
      <div className="my-4">
        <h3 className="font-main">
          To add another member to the team, simply click on the "Invite" button
          below
        </h3>
        <Button className="h-fit px-3 py-2 font-medium text-background font-main rounded-sm flex items-center mt-2">
          <BiPlus size="1rem" />
          Invite
        </Button>
      </div>
      <Tabs defaultValue="team" orientation="vertical" className="flex gap-2">
        <TabsList className="flex flex-col w-1/6 h-fit flex-fix bg-transparent rounded-none p-0">
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
        <TabsContent value="team" className="w-full overflow-x-scroll">
          <TeamMembers />
        </TabsContent>
        <TabsContent value="requests">Join Request</TabsContent>
      </Tabs>
    </section>
  );
};

export default MembersPage;
