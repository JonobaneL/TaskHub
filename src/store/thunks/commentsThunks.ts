import {
  AddCommentProps,
  CommentsResponse,
  fetchCommentsProps,
} from "@/models/taskThunksTypes";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { RootStore } from "../store";
import {
  addCommentMethod,
  getAllComments,
  updateCommentsMethod,
} from "@/firebase/taskAPI";
import { updateTaskAction } from "../reducers/projectsSlice";
import { updateTaskMethod } from "@/firebase/tablesAPI";
import { TaskParams } from "@/models/projectTypes";

export const addComment = createAsyncThunk<
  void,
  AddCommentProps,
  { state: RootStore }
>(
  "project/add-comment",
  async (
    { commentsID, comment, tableID, taskID },
    { rejectWithValue, getState, dispatch }
  ) => {
    try {
      const state = getState();
      const { project } = state.projectReducer;
      const collection = project.id + "_comments";
      const task = project.tables
        ?.find((item) => item.id == tableID)
        ?.tasks?.find((item) => item.id == taskID);
      if (!commentsID) {
        const res = await addCommentMethod(collection, comment);
        dispatch(
          updateTaskAction({
            tableID,
            taskID,
            key: "commentsID",
            value: res.id,
          })
        );

        await updateTaskMethod(project.tasksID, taskID, "commentsID", res.id);
      } else {
        await updateCommentsMethod(collection, commentsID, comment);
      }
      dispatch(
        updateTaskAction({
          tableID,
          taskID,
          key: "comments",
          value: [...(task?.comments || []), comment],
        })
      );
    } catch (err) {
      rejectWithValue(err);
    }
  }
);

export const fetchComments = createAsyncThunk<TaskParams[], fetchCommentsProps>(
  "task/fetch-comments",
  async ({ projectID, tasks }, { rejectWithValue }) => {
    try {
      const collection = `${projectID}_comments`;
      const modifiedTasks = await Promise.all(
        tasks.map(async (item) => {
          if (item.commentsID) {
            const res = await getAllComments(collection, item.commentsID);
            const comments = res.data() as CommentsResponse;
            return { ...item, comments: comments.comments };
          }
          return { ...item, comments: null };
        })
      );
      return modifiedTasks;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);
