import { CommentParams } from "@/models/commentTypes";
import Comment from "./Comment";
import { CommentProvider } from "@/context/CommentContext";
type ListProps = {
  commentsID: string | null;
  comments: CommentParams[] | undefined;
};

const CommentsList = ({ commentsID, comments }: ListProps) => {
  return (
    <div className="space-y-4">
      {comments?.map((item, index) => (
        <CommentProvider key={index}>
          <Comment comment={item} commentsID={commentsID} />
        </CommentProvider>
      ))}
    </div>
  );
};

export default CommentsList;
