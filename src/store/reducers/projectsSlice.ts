import { getProject } from "@/firebase/projectAPI";
import { getAllTables, updateTableMethod } from "@/firebase/tablesAPI";
import { ProjectParams, TableParams } from "@/models/projectTypes";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootStore } from "../store";

type InitialProps = {
  isLoading: boolean;
  error: string | null;
  project: ProjectParams;
};

const initialState: InitialProps = {
  project: {
    id: null,
    name: null,
    members: null,
    priority_labels: null,
    status_lables: null,
    tablesID: null,
    tables: null,
  },
  isLoading: false,
  error: null,
};
export const fetchProject = createAsyncThunk<ProjectParams, string | undefined>(
  "project/fetch-project",
  async (projectID, { rejectWithValue }) => {
    try {
      const res = await getProject(projectID || "");
      const project = res.data() as ProjectParams;
      const tablesRes = await getAllTables(project?.tablesID);
      const tables = [] as TableParams[];
      tablesRes?.forEach((item) => {
        const table = item.data() as TableParams;
        tables.push({ ...table, id: item.id });
      });
      return { ...project, tables };
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);
type UpdateProps = {
  tableID: string;
  key: "name" | "color";
  value: string;
};
export const updateTableHeader = createAsyncThunk<
  void,
  UpdateProps,
  { state: RootStore }
>(
  "project/update-table",
  async ({ tableID, key, value }, { rejectWithValue, getState, dispatch }) => {
    try {
      const state = getState();
      const { project } = state.projectReducer;
      dispatch(updateTableHeaderAction({ tableID, key, value }));
      await updateTableMethod(project?.tablesID, tableID, key, value);
    } catch (err) {
      return rejectWithValue("something wrong");
    }
  }
);

const projectSlice = createSlice({
  name: "project",
  initialState,
  reducers: {
    updateTableHeaderAction(state, action) {
      const table = action.payload;
      const tables = state.project.tables?.map((item) => {
        if (item.id == table.tableID) {
          return { ...item, [table.key]: table.value };
        }
        return item;
      });
      state.project.tables = tables || null;
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
      });
    // .addCase(updateTableHeader.fulfilled, (state, action) => {
    //   const table = action.payload;
    //   const tables = state.project.tables?.map((item) => {
    //     if (item.id == table.tableID) {
    //       return { ...item, [table.key]: table.value };
    //     }
    //     return item;
    //   });
    //   state.project.tables = tables || null;
    // });
  },
});
export const { updateTableHeaderAction } = projectSlice.actions;

export default projectSlice.reducer;
