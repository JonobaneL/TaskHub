import CommentForm from "./CommentForm";
import { TaskParams } from "@/models/projectTypes";
import CommentsList from "./CommentsList";
import { useEffect } from "react";
import { useTypeDispatch, useTypeSelector } from "@/hooks/useReduxHooks";
import { fetchComments } from "@/store/thunks/commentsThunks";
import { useParams } from "react-router-dom";

type UpdateProps = {
  task: TaskParams;
};

const TaskComments = ({ task }: UpdateProps) => {
  const { comments } = useTypeSelector((state) => state.commentsReducer);
  const pinnedComments = comments?.filter((item) => item.isPinned);
  const restComments = comments?.filter((item) => !item.isPinned);
  const { id } = useParams();
  const dispatch = useTypeDispatch();
  useEffect(() => {
    dispatch(
      fetchComments({ projectID: id || "", commentsID: task.commentsID })
    );
  }, []);
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
