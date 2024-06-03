import CommentForm from "./CommentForm";
import { TaskParams } from "@/models/projectTypes";
import CommentsList from "./CommentsList";

type UpdateProps = {
  task: TaskParams;
};

const TaskComments = ({ task }: UpdateProps) => {
  return (
    <div className="mt-4">
      <CommentForm task={task} />
      <div className="h-4" />
      {!task.commentsID ? (
        <div className="w-full min-h-16 font-main flex items-center justify-center">
          No comments yet
        </div>
      ) : (
        <CommentsList comments={task.comments || []} />
      )}
    </div>
  );
};

export default TaskComments;
