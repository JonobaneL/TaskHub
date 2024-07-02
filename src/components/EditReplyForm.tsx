import { useForm } from "react-hook-form";
import { Button } from "./ui/button";
import { fieldValidation } from "@/data/formOptions";
import { useTypeDispatch } from "@/hooks/useReduxHooks";
import { editReply } from "@/store/thunks/replyThunks";
import { ReplyParams } from "@/models/replyTypes";

type FormProps = {
  reply: ReplyParams;
  commentID: string;
  onClose: (value: boolean) => void;
};
type EditForm = {
  reply: string;
};

const EditReplyForm = ({ reply, commentID, onClose }: FormProps) => {
  const { register, formState, handleSubmit } = useForm<EditForm>();
  const dispatch = useTypeDispatch();

  const onSubmit = (data: EditForm) => {
    dispatch(
      editReply({ commentID, reply: { ...reply, content: data.reply } })
    ).then(() => onClose(false));
  };
  return (
    <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
      <textarea
        defaultValue={reply.content}
        autoFocus
        {...register("reply", fieldValidation)}
        className={`w-full h-20 resize-none text-sm p-2 rounded-md border bg-transparent transition-colors focus:ring-1 focus-visible:ring-1 focus:ring-primary focus:outline-none`}
      />
      <div className="flex gap-0.5 w-full justify-end mt-2">
        <Button
          variant="ghost"
          className="h-8 px-4 py-0 font-medium font-main text-[0.8rem] rounded-sm"
          onClick={() => onClose(false)}
        >
          Cancel
        </Button>
        <Button
          type="submit"
          className="h-8 px-4 py-0 font-medium font-main text-background text-[0.8rem] rounded-sm"
          disabled={formState.isSubmitting}
        >
          Save
        </Button>
      </div>
    </form>
  );
};

export default EditReplyForm;
