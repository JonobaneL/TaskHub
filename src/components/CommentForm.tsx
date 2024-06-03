import { useState } from "react";
import { Button } from "./ui/button";
import Editor from "./ui/Editor";
import { Controller, useForm } from "react-hook-form";
import { TaskParams } from "@/models/projectTypes";
import { useTypeDispatch } from "@/hooks/useReduxHooks";
import { addComment } from "@/store/thunks/commentsThunks";

type FormParams = {
  comment: string;
};
type FormProps = {
  task: TaskParams;
};

const CommentForm = ({ task }: FormProps) => {
  const [visible, setVisible] = useState(false);
  const { control, handleSubmit } = useForm<FormParams>({});
  const dispatch = useTypeDispatch();
  const onSubmit = (data: FormParams) => {
    dispatch(
      addComment({
        tableID: task.tableID,
        taskID: task.id,
        commentsID: task.commentsID,
        comment: {
          authorID: "author1", //change it later to actual userID
          content: data.comment,
          date: "",
          reply: null, //add those later
        },
      })
    );
    setVisible(false);
  };
  return (
    <div>
      {visible ? (
        <form onSubmit={handleSubmit(onSubmit)}>
          <Controller
            name="comment"
            control={control}
            render={({ field }) => (
              <Editor
                value={field.value}
                onChange={field.onChange}
                onClose={() => setVisible(false)}
              />
            )}
          />
          <Button
            type="submit"
            variant="default"
            onClick={(e) => {
              e.stopPropagation();
            }}
            className="block my-2 mr-0 ml-auto h-8 px-4 py-0 font-medium text-background text-[0.8rem] font-main rounded-sm"
          >
            Send
          </Button>
        </form>
      ) : (
        <Button
          className="w-full justify-start font-main cursor-text font-normal h-10 hover:border hover:border-slate-400"
          variant="outline"
          onClick={(e) => {
            e.stopPropagation();
            setVisible(true);
          }}
        >
          Write a comment...
        </Button>
      )}
    </div>
  );
};

export default CommentForm;
