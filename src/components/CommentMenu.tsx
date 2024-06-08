import { HiDotsHorizontal } from "react-icons/hi";
import { AiOutlineEdit } from "react-icons/ai";
import { AiOutlinePushpin } from "react-icons/ai";
import { AiOutlineDelete } from "react-icons/ai";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Button } from "./ui/button";
import { CommentParams } from "@/models/commentTypes";
import { useTypeDispatch } from "@/hooks/useReduxHooks";
import { modifiComment } from "@/store/thunks/commentsThunks";
import { deleteCommentEvent, pinCommentEvent } from "@/utils/commentMenuEvents";
import { useComment } from "@/context/CommentContext";

type MenuProps = {
  comment: CommentParams;
};

const CommentMenu = ({ comment }: MenuProps) => {
  const { commentsID, setEdit } = useComment();
  const dispatch = useTypeDispatch();
  const deleteHandler = () => {
    dispatch(
      modifiComment({
        commentsID,
        id: comment.id,
        callback: deleteCommentEvent,
      })
    );
  };
  const pinHandler = () => {
    dispatch(
      modifiComment({ commentsID, id: comment.id, callback: pinCommentEvent })
    );
  };
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="p-1 h-fit">
          <HiDotsHorizontal size="1.1rem" className="text-gray-500" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="min-w-36 text-gray-500 font-medium font-main"
      >
        <DropdownMenuItem
          onClick={() => setEdit(true)}
          className="flex justify-between"
        >
          Edit
          <AiOutlineEdit size="1rem" />
        </DropdownMenuItem>
        <DropdownMenuItem onClick={pinHandler} className="flex justify-between">
          {!comment.isPinned ? "Pin" : "Unpin"}
          <AiOutlinePushpin size="1rem" />
        </DropdownMenuItem>
        <DropdownMenuItem
          className="flex justify-between"
          onClick={deleteHandler}
        >
          Delete
          <AiOutlineDelete size="1rem" />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default CommentMenu;
