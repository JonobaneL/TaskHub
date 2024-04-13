import { TaskParams, UpdateTaskProps } from "@/models/projectTypes";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { RootStore } from "../store";
import { updateTaskAction } from "../reducers/projectsSlice";
import { getAllTasks, updateTaskMethod } from "@/firebase/tablesAPI";

type TaskResponseParams = {
  task: string;
  status: string | "none";
  due_date: string;
  priority: string | null;
  note: string;
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
