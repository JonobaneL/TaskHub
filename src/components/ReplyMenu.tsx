import { useTypeDispatch, useTypeSelector } from "@/hooks/useReduxHooks";
import { ReplyParams } from "@/models/replyTypes";
import { deleteReply } from "@/store/thunks/replyThunks";
import { IoIosClose } from "react-icons/io";

type MenuProps = {
  commentID: string;
  reply: ReplyParams;
  editHandler: () => void;
};

const ReplyMenu = ({ commentID, reply, editHandler }: MenuProps) => {
  const dispatch = useTypeDispatch();
  const { user } = useTypeSelector((state) => state.userReducer);
  const deleteHandler = () => {
    dispatch(deleteReply({ commentID, replyID: reply.replyID }));
  };
  if (user.id !== reply.authorID) return null;
  return (
    <div className="absolute opacity-0 invisible group-hover:visible group-hover:opacity-100 transition-all duration-150 flex gap-1 -top-4 right-0">
      <button
        onClick={editHandler}
        className="bg-accent-b text-xs text-white font-main font-medium h-5 px-2 rounded-lg shadow-sm"
      >
        Edit
      </button>
      <button
        onClick={deleteHandler}
        className="size-5 flex items-center justify-center bg-accent-b text-xs text-white rounded-full shadow-sm"
      >
        <IoIosClose size="1.3rem" />
      </button>
    </div>
  );
};

export default ReplyMenu;
