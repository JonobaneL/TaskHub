import { TaskParams } from "@/models/projectTypes";
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
  AddNewTaskProps,
  DeleteTaskProps,
  TaskResponseParams,
  UpdateTaskProps,
} from "@/models/taskThunksTypes";

export const fetchTasks = createAsyncThunk<TaskParams[], string | null>(
  "project/fetch-tasks",
  async (tasksID, { rejectWithValue }) => {
    try {
      if (tasksID == null) return rejectWithValue("tasksID doesn't exist");

      const res = await getAllTasks(tasksID);
      const tasks: TaskParams[] = [];
      res?.forEach(async (item) => {
        const task = item.data() as TaskResponseParams;
        tasks.push({
          ...task,
          id: item.id,
        } as TaskParams);
      });
      return tasks;
    } catch (err) {
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

export const addNewTask = createAsyncThunk<
  void,
  AddNewTaskProps,
  { state: RootStore }
>("project/add-task", async (task, { rejectWithValue, getState, dispatch }) => {
  try {
    const state = getState();
    const { project } = state.projectReducer;
    const noneStatus = project.status_labels?.find(
      (item) => item.role == "none"
    );
    const { user } = state.userReducer;
    const defaultTask = {
      due_date: null,
      status: noneStatus?.labelID || "",
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
