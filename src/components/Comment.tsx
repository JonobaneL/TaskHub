import { useComment } from "@/context/CommentContext";
import CommentHeader from "./CommentHeader";
import { Button } from "./ui/button";
import { useEffect } from "react";
import { CommentParams } from "@/models/commentTypes";
import EditCommentForm from "./EditCommentForm";
import { CgMailReply } from "react-icons/cg";
import CommentReply from "./CommentReply";

type CommentProps = {
  commentsID: string | null;
  comment: CommentParams;
};

const Comment = ({ commentsID, comment }: CommentProps) => {
  const { edit, setCommentstID, setReply } = useComment();
  useEffect(() => setCommentstID(commentsID), []);
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
            onClick={() => setReply((p) => !p)}
          >
            <CgMailReply size="1.3rem" className="text-primary" />
            <p className="text-sm text-primary font-main leading-9">Reply</p>
          </Button>
        </>
      ) : (
        <EditCommentForm comment={comment} />
      )}
      <CommentReply />
    </div>
  );
};

export default Comment;
