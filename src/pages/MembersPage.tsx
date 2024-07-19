import InviteModal from "@/components/InviteModal";
import MembersTabs from "@/components/MembersTabs";

const MembersPage = () => {
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
      <MembersTabs />
    </section>
  );
};

export default MembersPage;
