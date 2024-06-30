import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { useTypeSelector } from "@/hooks/useReduxHooks";
import { Button } from "./ui/button";
import { getInitials } from "@/utils/getInitials";
import { useComment } from "@/context/CommentContext";

const CommentReplyForm = () => {
  const { user } = useTypeSelector((state) => state.userReducer);
  const { reply } = useComment();
  const initials = getInitials(user);
  const [isFocused, setIsFocused] = useState(false);
  return (
    <form>
      <div className="flex gap-4 mb-2">
        <Avatar>
          <AvatarImage
            className="object-cover object-top"
            src={user.avatar || ""}
          />
          <AvatarFallback className="bg-accent font-main font-medium text-sm">
            {initials}
          </AvatarFallback>
        </Avatar>
        <textarea
          autoFocus={reply}
          className={`w-full ${
            isFocused ? "h-24" : "h-10"
          } resize-none text-sm p-2 rounded-md border bg-transparent transition-colors focus:ring-1 focus-visible:ring-1 focus:ring-primary focus:outline-none`}
          placeholder="Write a reply..."
          onBlur={() => setIsFocused(false)}
          onFocus={() => setIsFocused(true)}
        />
      </div>
      {isFocused && (
        <Button className="h-8 px-4 py-0 font-medium font-main text-background text-[0.8rem] rounded-sm block mr-0 ml-auto">
          Reply
        </Button>
      )}
    </form>
  );
};

export default CommentReplyForm;
