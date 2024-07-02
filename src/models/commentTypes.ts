import { TaskParams } from "./projectTypes";
import { ReplyParams } from "./replyTypes";

export type CommentParams = {
  id: string;
  authorID: string;
  content: string;
  date: string;
  reply: null | ReplyParams[];
  isPinned: boolean;
};

export type CommentProviderParams = {
  edit: boolean;
  setEdit: (value: boolean) => void;
  commentsID: string | null;
  setCommentstID: (value: string | null) => void;
};
export type AddCommentProps = {
  task: TaskParams;
  comment: {
    authorID: string;
    content: string;
  };
};

export type CommentsResponse = {
  comments: CommentParams[];
};
export type CommentFormParams = {
  comment: string;
};
export type CommentModifieProps = {
  commentsID: string | null;
  id: string;
  content?: string;
  callback: (
    comments: CommentParams[],
    id: string,
    content?: string
  ) => CommentParams[];
};
