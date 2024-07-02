import { Controller, useForm } from "react-hook-form";
import Editor from "./ui/Editor";
import { useComment } from "@/context/CommentContext";
import { Button } from "./ui/button";
import { useTypeDispatch, useTypeSelector } from "@/hooks/useReduxHooks";
import { modifieComment } from "@/store/thunks/commentsThunks";
import { CommentFormParams, CommentParams } from "@/models/commentTypes";
import { editCommentEvent } from "@/utils/commentMenuEvents";

type FormProps = {
  comment: CommentParams;
};

const EditCommentForm = ({ comment }: FormProps) => {
  const { setEdit } = useComment();
  const { commentsID } = useTypeSelector((state) => state.commentsReducer);
  const { control, handleSubmit, formState } = useForm<CommentFormParams>({
    defaultValues: {
      comment: comment.content,
    },
  });
  const dispatch = useTypeDispatch();
  const onSubmit = (data: CommentFormParams) => {
    dispatch(
      modifieComment({
        commentsID,
        id: comment.id,
        content: data.comment,
        callback: editCommentEvent,
      })
    );
    setEdit(false);
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Controller
        name="comment"
        control={control}
        rules={{
          validate: (value) => {
            if (value == comment.content) return false;
          },
        }}
        render={({ field }) => (
          <Editor value={field.value} onChange={field.onChange} />
        )}
      />
      <div className="flex gap-0.5 w-full justify-end mt-2">
        <Button
          variant="ghost"
          className="h-8 px-4 py-0 font-medium font-main text-[0.8rem] rounded-sm"
          onClick={() => setEdit(false)}
        >
          Cancel
        </Button>
        <Button
          className="h-8 px-4 py-0 font-medium font-main text-background text-[0.8rem] rounded-sm"
          disabled={formState.isSubmitting}
        >
          Save
        </Button>
      </div>
    </form>
  );
};

export default EditCommentForm;
