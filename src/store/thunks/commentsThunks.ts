import {
  AddCommentProps,
  CommentsResponse,
  CommentParams,
  CommentModifieProps,
} from "@/models/commentTypes";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { RootStore } from "../store";
import {
  addCommentsMethod,
  getAllComments,
  updateCommentsMethod,
} from "@/firebase/taskAPI";
import { updateTaskAction } from "../reducers/projectsSlice";
import { updateTaskMethod } from "@/firebase/tablesAPI";
import {
  addCommentAction,
  updateCommentsAction,
} from "../reducers/commentsSlice";

export const addComment = createAsyncThunk<
  void,
  AddCommentProps,
  { state: RootStore }
>(
  "comments/add-comment",
  async ({ task, comment }, { rejectWithValue, getState, dispatch }) => {
    try {
      const { project } = getState().projectReducer;
      const { comments } = getState().commentsReducer;
      const currentDate = new Date(Date.now()).toString();
      const modifiedComment = {
        ...comment,
        id: `comment${Date.now()}`,
        date: currentDate.slice(4, 21),
        reply: null,
        isPinned: false,
      };
      dispatch(addCommentAction(modifiedComment));

      if (!task.commentsID) {
        const res = await addCommentsMethod(
          project.commentsID || "",
          modifiedComment
        );
        await updateTaskMethod(project.tasksID, task.id, "commentsID", res.id);
        dispatch(
          updateTaskAction({
            tableID: task.tableID,
            taskID: task.id,
            key: "commentsID",
            value: res.id,
          })
        );
      } else {
        await updateCommentsMethod(project.commentsID || "", task.commentsID, [
          ...(comments || []),
          modifiedComment,
        ]);
      }
    } catch (err) {
      rejectWithValue(err);
    }
  }
);

type fetchCommentsRes = {
  commentsID: string | null;
  comments: CommentParams[];
};
export const fetchComments = createAsyncThunk<
  fetchCommentsRes,
  string | null,
  {
    state: RootStore;
  }
>(
  "comments/fetch-comments",
  async (commentsID, { rejectWithValue, getState }) => {
    try {
      const { project } = getState().projectReducer;
      if (commentsID == null) return { commentsID, comments: [] };
      const res = await getAllComments(project.commentsID || "", commentsID);
      const commentsRes = res.data() as CommentsResponse;
      return { commentsID, comments: commentsRes.comments };
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

export const modifieComment = createAsyncThunk<
  void,
  CommentModifieProps,
  { state: RootStore }
>(
  "comments/modifie-comment",
  async (
    { commentsID, id, content, callback },
    { rejectWithValue, getState, dispatch }
  ) => {
    if (!commentsID || !id) return rejectWithValue("no such value");
    const { project } = getState().projectReducer;
    const { comments } = getState().commentsReducer;
    const modifiedComments = callback(comments || [], id, content);
    dispatch(updateCommentsAction(modifiedComments));
    await updateCommentsMethod(
      project.commentsID || "",
      commentsID || "",
      modifiedComments
    );
  }
);
