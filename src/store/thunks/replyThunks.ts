import { createAsyncThunk } from "@reduxjs/toolkit";
import { RootStore } from "../store";
import { CommentParams } from "@/models/commentTypes";
import { updateCommentsAction } from "../reducers/commentsSlice";
import { updateCommentsMethod } from "@/firebase/taskAPI";
import {
  ReplyParams,
  UpdateReplyProps,
  addReplyProps,
  deleteReplyProps,
  editReplyProps,
} from "@/models/replyTypes";

const commentsUpdate = createAsyncThunk<void, UpdateReplyProps>(
  "comments/update",
  async ({ collection, commentsID, comments }, { dispatch }) => {
    dispatch(updateCommentsAction(comments));
    await updateCommentsMethod(collection || "", commentsID || "", comments);
  }
);
export const addReply = createAsyncThunk<
  void,
  addReplyProps,
  { state: RootStore }
>(
  "comments/add-reply",
  async (
    { commentID, replyContent },
    { rejectWithValue, dispatch, getState }
  ) => {
    try {
      const currentDate = new Date(Date.now()).toString();
      const { comments, commentsID } = getState().commentsReducer;
      const { user } = getState().userReducer;
      const { project } = getState().projectReducer;
      const reply = {
        replyID: `reply${Date.now()}`,
        authorID: user.id,
        content: replyContent,
        date: currentDate.slice(4, 21),
      } as ReplyParams;
      const modifiedComments = comments?.map((item) => {
        if (item.id == commentID)
          return { ...item, reply: [...(item.reply || []), reply] };
        return item;
      }) as CommentParams[];
      dispatch(
        commentsUpdate({
          collection: project.commentsID,
          comments: modifiedComments,
          commentsID,
        })
      );
    } catch (err) {
      return rejectWithValue("something went wrong");
    }
  }
);

export const deleteReply = createAsyncThunk<
  void,
  deleteReplyProps,
  { state: RootStore }
>(
  "comments/delete-reply",
  async ({ commentID, replyID }, { rejectWithValue, dispatch, getState }) => {
    try {
      const { comments, commentsID } = getState().commentsReducer;
      const { project } = getState().projectReducer;
      const modifiedComments = comments?.map((item) => {
        if (item.id == commentID) {
          const modifiedReply = item.reply?.filter(
            (reply) => reply.replyID !== replyID
          );
          return {
            ...item,
            reply: modifiedReply?.length != 0 ? modifiedReply : null,
          };
        }
        return item;
      }) as CommentParams[];
      dispatch(
        commentsUpdate({
          collection: project.commentsID,
          comments: modifiedComments,
          commentsID,
        })
      );
    } catch (err) {
      return rejectWithValue("something went wrong");
    }
  }
);

export const editReply = createAsyncThunk<
  void,
  editReplyProps,
  { state: RootStore }
>(
  "comments/edit-reply",
  async ({ commentID, reply }, { rejectWithValue, dispatch, getState }) => {
    try {
      const { comments, commentsID } = getState().commentsReducer;
      const { project } = getState().projectReducer;
      const modifiedComments = comments?.map((comment) => {
        if (comment.id == commentID) {
          console.log("comment");
          const modifiedReply = comment.reply?.map((item) => {
            if (item.replyID == reply.replyID)
              return { ...item, content: reply.content };
            return item;
          });
          return { ...comment, reply: modifiedReply };
        }
        return comment;
      }) as CommentParams[];

      dispatch(
        commentsUpdate({
          collection: project.commentsID,
          comments: modifiedComments,
          commentsID,
        })
      );
    } catch (err) {
      return rejectWithValue("something went wrong");
    }
  }
);
