import { useComment } from "@/context/CommentContext";
import { fakeMembers } from "@/data/fakeMembers";
import { Button } from "./ui/button";
import { useRef, useState } from "react";

const CommentReply = () => {
  const { reply, setReply } = useComment();
  const replyRef = useRef(null);
  const [isFocused, setIsFocused] = useState(false);
  if (!reply) return null;
  return (
    <div className="border-t mt-2 pt-2">
      {/* <div className="my-5">List</div> */}
      <div className="flex gap-4 mb-2">
        <img
          className="w-9 h-9 rounded-full"
          src={fakeMembers[0].image}
          alt="avatar"
        />
        <textarea
          ref={replyRef}
          autoFocus
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
    </div>
  );
};

export default CommentReply;
