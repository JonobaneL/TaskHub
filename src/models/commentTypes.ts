import { TaskParams } from "./projectTypes";

export type CommentParams = {
  id: string;
  authorID: string;
  content: string;
  date: string;
  reply: null;
  isPinned: boolean;
};
export type CommentProviderParams = {
  edit: boolean;
  setEdit: (value: boolean) => void;
  commentsID: string | null;
  setCommentstID: (value: string | null) => void;
};
export type AddCommentProps = {
  tableID: string;
  taskID: string;
  commentsID: string | null;
  comment: {
    authorID: string;
    content: string;
  };
};
export type fetchCommentsProps = {
  projectID: string | null;
  tasks: TaskParams[];
};
export type CommentsResponse = {
  comments: CommentParams[];
};
export type CommentFormParams = {
  comment: string;
};
