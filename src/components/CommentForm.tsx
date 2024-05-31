import { useState } from "react";
import { Button } from "./ui/button";
import Editor from "./ui/Editor";
import { Controller, useForm } from "react-hook-form";

type FormParams = {
  comment: string;
};

const CommentForm = () => {
  const [visible, setVisible] = useState(false);
  const { control, handleSubmit } = useForm<FormParams>({});
  const onSubmit = (data: FormParams) => {
    console.log(data);
  };
  return (
    <div>
      {visible ? (
        <div>
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
              // onClick={() => console.log("chekc")}
              onClick={(e) => {
                e.stopPropagation();
                // setVisible(true);
              }}
              className="block my-2 mr-0 ml-auto h-8 px-4 py-0 font-medium text-background text-[0.8rem] font-main rounded-sm"
            >
              Send
            </Button>
          </form>
        </div>
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
