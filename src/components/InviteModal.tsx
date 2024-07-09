import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { BiPlus } from "react-icons/bi";
import InviteMemberForm from "./InviteMemberForm";

const InviteModal = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="h-fit px-3 py-2 font-medium text-background font-main rounded-sm flex items-center">
          <BiPlus size="1rem" />
          Invite
        </Button>
      </DialogTrigger>
      <DialogContent className="gap-1">
        <DialogHeader className="mb-4">
          <DialogTitle className="font-main text-primary mb-1">
            Invite to your project
          </DialogTitle>
          <DialogDescription>
            Use this form to add new members to your project and assign
            appropriate roles for them.
          </DialogDescription>
        </DialogHeader>
        <InviteMemberForm />
      </DialogContent>
    </Dialog>
  );
};

export default InviteModal;
