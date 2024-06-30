import { useComment } from "@/context/CommentContext";
import CommentReplyForm from "./CommentReplyForm";
import { CommentParams } from "@/models/commentTypes";
import ReplyItem from "./ReplyItem";

type ReplyProps = {
  comment: CommentParams;
};

const CommentReply = ({ comment }: ReplyProps) => {
  const { reply } = useComment();
  return (
    <div className="border-t mt-2 pt-2">
      <div className="mt-3 mb-5 mx-2 space-y-4">
        {comment.reply?.map((item) => (
          <ReplyItem key={item.replyID} reply={item} />
        ))}
      </div>
      {(reply || comment.reply) && <CommentReplyForm />}
    </div>
  );
};

export default CommentReply;
