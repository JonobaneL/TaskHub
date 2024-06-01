import CommentForm from "./CommentForm";
import { CommentParams, TaskParams } from "@/models/projectTypes";
import { useTypeSelector } from "@/hooks/useReduxHooks";
import CommentsList from "./CommentsList";

type UpdateProps = {
  task: TaskParams;
};
type CommentsResponse = {
  id: string;
  comments: CommentParams[];
};

const TaskUpdates = ({ task }: UpdateProps) => {
  const { project } = useTypeSelector((state) => state.projectReducer);
  console.log(task.comments);
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

export default TaskUpdates;
