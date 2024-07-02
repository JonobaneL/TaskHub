import { useComment } from "@/context/CommentContext";
import CommentHeader from "./CommentHeader";
import { Button } from "./ui/button";
import { CommentParams } from "@/models/commentTypes";
import EditCommentForm from "./EditCommentForm";
import { CgMailReply } from "react-icons/cg";
import CommentReply from "./CommentReply";

type CommentProps = {
  comment: CommentParams;
};

const Comment = ({ comment }: CommentProps) => {
  const { edit, setReply } = useComment();
  return (
    <div className="rounded border p-2">
      <CommentHeader comment={comment} />
      {!edit ? (
        <>
          <div
            className="my-2 mx-2 pl-5 list-disc [&_ul_li]:list-disc [&_ol_li]:list-decimal text-sm"
            dangerouslySetInnerHTML={{ __html: comment.content }}
          />
          <Button
            variant="ghost"
            className="p-2 flex gap-0.5 items-center mr-0 ml-auto"
            onClick={(e) => {
              e.stopPropagation();
              setReply(true);
            }}
          >
            <CgMailReply size="1.3rem" className="text-primary" />
            <p className="text-sm text-primary font-main leading-9">Reply</p>
          </Button>
        </>
      ) : (
        <EditCommentForm comment={comment} />
      )}
      <CommentReply comment={comment} />
    </div>
  );
};

export default Comment;
