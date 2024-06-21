import CommentForm from "./CommentForm";
import { TaskParams } from "@/models/projectTypes";
import CommentsList from "./CommentsList";

type UpdateProps = {
  task: TaskParams;
};

const TaskComments = ({ task }: UpdateProps) => {
  const pinnedComments = task.comments?.filter((item) => item.isPinned);
  const restComments = task.comments?.filter((item) => !item.isPinned);
  return (
    <div className="mt-4">
      <CommentForm task={task} />
      <div className="h-4" />
      {!task.commentsID ? (
        <div className="w-full min-h-16 font-main flex items-center justify-center">
          No comments yet
        </div>
      ) : (
        <div className="space-y-4">
          <CommentsList
            commentsID={task.commentsID}
            comments={pinnedComments || []}
          />
          <CommentsList
            commentsID={task.commentsID}
            comments={restComments || []}
          />
        </div>
      )}
    </div>
  );
};

export default TaskComments;