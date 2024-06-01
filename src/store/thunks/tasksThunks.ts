import {
  CommentParams,
  TaskParams,
  UpdateTaskProps,
} from "@/models/projectTypes";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { RootStore } from "../store";
import {
  addNewTaskAction,
  deleteTaskAction,
  updateTaskAction,
} from "../reducers/projectsSlice";
import {
  addTaskMethod,
  deleteTaskMethod,
  getAllTasks,
  updateTaskMethod,
} from "@/firebase/tablesAPI";
import {
  addCommentMethod,
  getAllComments,
  updateCommentsMethod,
} from "@/firebase/taskAPI";

type TaskResponseParams = {
  task: string;
  status: string | "none";
  due_date: string;
  priority: string | null;
  notes: string;
  commentsID: null;
  tableID: string;
};

export const fetchTasks = createAsyncThunk<TaskParams[], string | null>(
  "project/fetch-tasks",
  async (tasksID, { rejectWithValue }) => {
    try {
      if (tasksID == null) return rejectWithValue("tasksID doesn't exist");
      const res = await getAllTasks(tasksID);
      const tasks: TaskParams[] = [];
      res?.forEach((item) => {
        const task = item.data() as TaskResponseParams;
        const date = task.due_date;
        tasks.push({
          ...task,
          id: item.id,
          due_date: date,
        } as TaskParams);
      });
      return tasks;
    } catch (err) {
      console.log(err);
      return rejectWithValue(err);
    }
  }
);
type fetchTasksProps = {
  tasksID: string | null;
  projectID: string | null;
};
type CommentsResponse = {
  id: string;
  comments: CommentParams[];
};
export const fetchTasks1 = createAsyncThunk<TaskParams[], fetchTasksProps>(
  "project/fetch-tasks",
  async ({ tasksID, projectID }, { rejectWithValue }) => {
    try {
      if (tasksID == null) return rejectWithValue("tasksID doesn't exist");

      const res = await getAllTasks(tasksID);
      if (!res) return rejectWithValue("No tasks found");

      const tasks = [] as TaskParams[];
      await Promise.all(
        res.forEach(async (item) => {
          const task = item.data() as TaskResponseParams;
          let comments = [];
          if (task.commentsID) {
            const collection = `${projectID}_comments`;
            const response = (await getAllComments(
              collection,
              task.commentsID
            )) as CommentsResponse;
            comments = response.comments;
          }
          // tasks.push({
          //   ...task,
          //   id: item.id,
          //   comments: comments,
          //   due_date: task.due_date,
          // });
        })
      );

      return tasks;
    } catch (err) {
      console.log(err);
      return rejectWithValue(err);
    }
  }
);

export const updateTask = createAsyncThunk<
  void,
  UpdateTaskProps,
  { state: RootStore }
>(
  "project/udate-task",
  async (
    { tableID, taskID, key, value },
    { rejectWithValue, getState, dispatch }
  ) => {
    try {
      const state = getState();
      const { project } = state.projectReducer;

      dispatch(
        updateTaskAction({
          tableID,
          taskID,
          key,
          value,
        })
      );
      await updateTaskMethod(project.tasksID, taskID, key, value);
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

type AddNewTaskProps = {
  task: string;
  tableID: string;
  author?: string | null;
  due_date?: string | null;
  priority?: string | null;
  status?: string;
  notes?: string | null;
};

export const addNewTask = createAsyncThunk<
  void,
  AddNewTaskProps,
  { state: RootStore }
>("project/add-task", async (task, { rejectWithValue, getState, dispatch }) => {
  try {
    const state = getState();
    const { project } = state.projectReducer;
    const { user } = state.userReducer;
    const defaultTask = {
      due_date: null,
      status: "none",
      priority: null,
      commentsID: null,
      notes: "",
    };
    const currentTask = { ...defaultTask, ...task, author: user.id || "" };
    const res = await addTaskMethod(project.tasksID || "", currentTask);
    dispatch(addNewTaskAction({ id: res.id, ...currentTask }));
  } catch (err) {
    rejectWithValue(err);
  }
});
type DeleteTaskProps = {
  taskID: string;
  tableID: string;
};

export const deleteTask = createAsyncThunk<
  void,
  DeleteTaskProps,
  { state: RootStore }
>(
  "project/delete-task",
  async (props, { rejectWithValue, getState, dispatch }) => {
    try {
      const state = getState();
      const { project } = state.projectReducer;
      dispatch(deleteTaskAction(props));
      await deleteTaskMethod(props.taskID, project.tasksID);
    } catch (err) {
      rejectWithValue(err);
    }
  }
);

type AddCommentProps = {
  tableID: string;
  taskID: string;
  commentsID: string | null;
  comment: CommentParams;
};
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
export const fetchComments = createAsyncThunk<
  void,
  undefined,
  { state: RootStore }
>("task/fetch-comments", async (_, { rejectWithValue, getState, dispatch }) => {
  try {
    const state = getState();
    const { project } = state.projectReducer;
  } catch (err) {
    rejectWithValue(err);
  }
});
