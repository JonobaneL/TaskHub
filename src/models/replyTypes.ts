import { CommentParams } from "./commentTypes";

export type ReplyParams = {
  replyID: string;
  authorID: string;
  content: string;
  date: string;
};
export type addReplyProps = {
  commentID: string;
  replyContent: string;
};

export type UpdateReplyProps = {
  collection: string | null;
  commentsID: string | null;
  comments: CommentParams[];
};

export type deleteReplyProps = {
  commentID: string;
  replyID: string;
};

export type editReplyProps = {
  commentID: string;
  reply: { replyID: string; content: string };
};
