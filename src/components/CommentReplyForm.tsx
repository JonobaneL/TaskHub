import { useState } from "react";
import { useTypeDispatch, useTypeSelector } from "@/hooks/useReduxHooks";
import { Button } from "./ui/button";
import { useComment } from "@/context/CommentContext";
import { CommentParams } from "@/models/commentTypes";
import { addReply } from "@/store/thunks/replyThunks";
import { useForm } from "react-hook-form";
import { fieldValidation } from "@/data/formOptions";
import UserBadge from "./ui/UserBadge";

type FormProps = {
  comment: CommentParams;
};
type ReplyForm = {
  content: string;
};

const CommentReplyForm = ({ comment }: FormProps) => {
  const { user } = useTypeSelector((state) => state.userReducer);
  const { reply, setReply } = useComment();
  const dispatch = useTypeDispatch();
  const [isFocused, setIsFocused] = useState(false);
  const { register, handleSubmit, reset } = useForm<ReplyForm>();
  const onSubmit = (data: ReplyForm) => {
    dispatch(addReply({ commentID: comment.id, replyContent: data.content }));
    reset();
    setIsFocused(false);
    setReply(false);
  };

  return (
    <form
      onBlur={() => {
        setIsFocused(false);
        setReply(false);
      }}
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="flex gap-4 mb-2">
        <UserBadge user={user} mode="short" />
        <textarea
          autoFocus={reply}
          className={`w-full ${
            isFocused ? "h-24" : "h-10"
          } resize-none text-sm p-2 rounded-md border bg-transparent transition-colors focus:ring-1 focus-visible:ring-1 focus:ring-primary focus:outline-none`}
          placeholder="Write a reply..."
          {...register("content", fieldValidation)}
          onMouseDown={() => setIsFocused(true)}
          onFocus={() => setIsFocused(true)}
        />
      </div>
      {isFocused && (
        <Button
          onMouseDown={(e) => e.preventDefault()}
          type="submit"
          className="h-8 px-4 py-0 font-medium font-main text-background text-[0.8rem] rounded-sm block mr-0 ml-auto"
        >
          Reply
        </Button>
      )}
    </form>
  );
};

export default CommentReplyForm;
