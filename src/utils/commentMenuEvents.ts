import { CommentParams } from "@/models/commentTypes";

export const pinCommentEvent = (comments: CommentParams[], id: string) => {
  if (!comments) return [];
  const modifiedComments = comments.map((item) => {
    if (item.id == id) {
      return { ...item, isPinned: !item.isPinned };
    }
    return item;
  });
  return modifiedComments;
};
export const deleteCommentEvent = (comments: CommentParams[], id: string) => {
  if (!comments) return [];
  const modifiedComments = comments?.filter((item) => item.id !== id);
  return modifiedComments;
};
export const editCommentEvent = (
  comments: CommentParams[],
  id: string,
  value: string | undefined
) => {
  if (!comments || !value) return [];
  const modifiedComments = comments?.map((item) => {
    if (item.id == id) {
      return { ...item, content: value };
    }
    return item;
  });
  return modifiedComments;
};
