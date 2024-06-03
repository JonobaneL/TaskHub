import {
  ProjectParams,
  TaskParams,
  UpdateTableProps,
} from "@/models/projectTypes";
import { createSlice } from "@reduxjs/toolkit";
import { fetchTasks } from "../thunks/tasksThunks";
import { fetchProject } from "../thunks/projectsThunks";
import { LabelsTypeParams } from "@/models/RareUseTypes";
import { fetchComments } from "../thunks/commentsThunks";

type InitialProps = {
  isLoading: boolean;
  isTasksLoading: boolean;
  error: string | null;
  project: ProjectParams;
};

const initialState: InitialProps = {
  project: {
    id: null,
    name: null,
    members: null,
    priority_labels: null,
    status_labels: null,
    tablesID: null,
    tables: null,
    tasksID: null,
    color: "",
  },
  isTasksLoading: false,
  isLoading: false,
  error: null,
};

const projectSlice = createSlice({
  name: "project",
  initialState,
  reducers: {
    updateTableHeaderAction(state, action) {
      const table = action.payload as UpdateTableProps;
      const tables = state.project.tables?.map((item) => {
        if (item.id == table.tableID) {
          return { ...item, [table.key]: table.value };
        }
        return item;
      });
      state.project.tables = tables || null;
    },

    updateTaskAction(state, action) {
      const { tableID, taskID, key, value } = action.payload;
      const tables = state.project.tables?.map((table) => {
        if (table.id !== tableID) return table;
        const updatedTasks =
          table.tasks?.map((task) => {
            if (task.id !== taskID) return task;
            return { ...task, [key]: value };
          }) ?? [];
        return { ...table, tasks: updatedTasks };
      });
      state.project.tables = tables || null;
    },
    addNewTaskAction(state, action) {
      const props = action.payload;
      const tables = state.project.tables?.map((item) => {
        if (item.id == props.tableID) {
          return { ...item, tasks: [...(item.tasks || []), props] };
        }
        return item;
      });
      state.project.tables = tables || null;
    },
    deleteTaskAction(state, action) {
      const props = action.payload;
      const tables = state.project.tables?.map((item) => {
        if (item.id == props.tableID) {
          const tasks = item.tasks?.filter((task) => task.id !== props.taskID);
          return { ...item, tasks: tasks || [] };
        }
        return item;
      });
      state.project.tables = tables || null;
    },
    addNewGroupAction(state, action) {
      state.project.tables = [...(state?.project.tables || []), action.payload];
    },
    deleteGroupAction(state, action) {
      state.project.tables =
        state.project.tables?.filter((item) => item.id !== action.payload) ||
        null;
    },
    updateLabelsAction(state, action) {
      const type = action.payload.type as LabelsTypeParams;
      state.project[type] = action.payload.labels;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProject.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchProject.fulfilled, (state, action) => {
        state.project = action.payload;
        state.isLoading = false;
      })
      .addCase(fetchProject.rejected, (state) => {
        state.error = "No such project";
        state.isLoading = false;
      })
      .addCase(fetchTasks.pending, (state) => {
        state.isTasksLoading = true;
      })
      .addCase(fetchComments.fulfilled, (state, action) => {
        const allTasks = action.payload as TaskParams[];
        const tables = state.project.tables?.map((table) => {
          const tasks = allTasks.filter((item) => item.tableID === table.id);
          return { ...table, tasks };
        });
        state.project.tables = tables || [];
        state.isTasksLoading = false;
      });
  },
});
export const {
  updateTableHeaderAction,
  updateTaskAction,
  addNewTaskAction,
  addNewGroupAction,
  deleteGroupAction,
  deleteTaskAction,
  updateLabelsAction,
} = projectSlice.actions;

export default projectSlice.reducer;
