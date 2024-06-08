import { useComment } from "@/context/CommentContext";
import CommentHeader from "./CommentHeader";
import { Button } from "./ui/button";
import replyIcon from "../assets/images/reply.svg";
import { useEffect } from "react";
import { CommentParams } from "@/models/commentTypes";
import EditCommentForm from "./EditCommentForm";

type CommentProps = {
  commentsID: string | null;
  comment: CommentParams;
};

const Comment = ({ commentsID, comment }: CommentProps) => {
  const { edit, setCommentstID } = useComment();
  console.log(edit);
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
            className="p-2 flex gap-2 items-center mr-0 ml-auto"
          >
            <img src={replyIcon} className="size-4" alt="arrow" />
            <p className="text-sm text-primary font-main leading-9">Reply</p>
          </Button>
        </>
      ) : (
        <EditCommentForm comment={comment} />
      )}
    </div>
  );
};

export default Comment;
