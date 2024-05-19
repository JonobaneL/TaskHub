import { TaskParams, UpdateTaskProps } from "@/models/projectTypes";
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

type TaskResponseParams = {
  task: string;
  status: string | "none";
  due_date: string;
  priority: string | null;
  notes: string;
  conversation: null;
  tableID: string;
};

export const fetchTasks = createAsyncThunk<TaskParams[], string | null>(
  "project/fetch-tasks",
  async (tasksID, { rejectWithValue }) => {
    try {
      const res = await getAllTasks(tasksID);
      const tasks: TaskParams[] = [];
      res?.forEach((item) => {
        //check this later
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

export const updateTask = createAsyncThunk<
  void,
  UpdateTaskProps,
  { state: RootStore }
>(
  "project/udate-task",
  async (props, { rejectWithValue, getState, dispatch }) => {
    try {
      const state = getState();
      const { project } = state.projectReducer;
      const table = project.tables?.find((item) => item.id === props.tableID);
      const modifiedTasks = table?.tasks?.map((task) => {
        if (task.id === props.taskID)
          return { ...task, [props.key]: props.value };
        return task;
      });
      dispatch(
        updateTaskAction({
          tableID: props.tableID,
          tasks: modifiedTasks,
        })
      );
      await updateTaskMethod(
        project.tasksID,
        props.taskID,
        props.key,
        props.value
      );
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
      conversation: null,
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
