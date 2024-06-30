import {
  AddCommentProps,
  CommentsResponse,
  fetchCommentsProps,
  CommentParams,
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
import { TaskParams } from "@/models/projectTypes";
import { getTableTask } from "@/utils/getTableTask";

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
      const { project } = getState().projectReducer;
      const collection = project.projectID + "_comments";
      const currentDate = new Date(Date.now()).toString();
      const modifiedComment = {
        ...comment,
        id: `comment${Date.now()}`,
        date: currentDate.slice(4, 21),
        reply: null,
        isPinned: false,
      };
      const { task } = getTableTask(project, "id", taskID);
      if (!task) return rejectWithValue("cannot find task");
      if (!commentsID) {
        const res = await addCommentsMethod(collection, modifiedComment);
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
        await updateCommentsMethod(collection, commentsID, [
          ...(task?.comments || []),
          modifiedComment,
        ]);
      }
      dispatch(
        updateTaskAction({
          tableID,
          taskID,
          key: "comments",
          value: [...(task?.comments || []), modifiedComment],
        })
      );
    } catch (err) {
      rejectWithValue(err);
    }
  }
);

// export const fetchComments = createAsyncThunk<TaskParams[], fetchCommentsProps>(
//   "task/fetch-comments",
//   async ({ projectID, tasks }, { rejectWithValue }) => {
//     try {
//       const collection = `${projectID}_comments`;
//       const modifiedTasks = await Promise.all(
//         tasks.map(async (item) => {
//           if (item.commentsID) {
//             const res = await getAllComments(collection, item.commentsID);
//             const comments = res.data() as CommentsResponse;
//             return { ...item, comments: comments.comments };
//           }
//           return { ...item, comments: null };
//         })
//       );
//       return modifiedTasks;
//     } catch (err) {
//       return rejectWithValue(err);
//     }
//   }
// );
export const fetchComments = createAsyncThunk<
  CommentParams[],
  fetchCommentsProps
>(
  "comments/fetch-comments",
  async ({ projectID, commentsID }, { rejectWithValue }) => {
    try {
      const collection = `${projectID}_comments`;
      if (commentsID == null) return rejectWithValue("commentsID is null");
      const res = await getAllComments(collection, commentsID);
      const commentsRes = res.data() as CommentsResponse;
      return commentsRes.comments;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

type CommentMenuProps = {
  commentsID: string | null;
  id: string;
  content?: string;
  callback: (
    comments: CommentParams[],
    id: string,
    content?: string
  ) => CommentParams[];
};

export const modifiComment = createAsyncThunk<
  void,
  CommentMenuProps,
  { state: RootStore }
>(
  "task/pin-comment",
  async (
    { commentsID, id, content, callback },
    { rejectWithValue, getState, dispatch }
  ) => {
    if (!commentsID || !id) return rejectWithValue("no such value");
    const { project } = getState().projectReducer;
    const collection = project.projectID + "_comments";
    const { table, task } = getTableTask(project, "commentsID", commentsID);
    const modifiedComments = callback(task?.comments || [], id, content);
    dispatch(
      updateTaskAction({
        tableID: table?.id,
        taskID: task?.id,
        key: "comments",
        value: modifiedComments,
      })
    );
    await updateCommentsMethod(collection, commentsID || "", modifiedComments);
  }
);
