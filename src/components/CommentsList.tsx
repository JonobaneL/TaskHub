import { CommentParams } from "@/models/commentTypes";
import Comment from "./Comment";
import { CommentProvider } from "@/context/CommentContext";
type ListProps = {
  comments: CommentParams[] | undefined;
};

const CommentsList = ({ comments }: ListProps) => {
  return (
    <div className="space-y-4">
      {comments?.map((item, index) => (
        <CommentProvider key={index}>
          <Comment comment={item} />
        </CommentProvider>
      ))}
    </div>
  );
};

export default CommentsList;
