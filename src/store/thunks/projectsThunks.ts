import { getProject } from "@/firebase/projectAPI";
import {
  addNewGroupMethod,
  deleteGroupMethod,
  getAllTables,
  updateTableMethod,
} from "@/firebase/tablesAPI";
import {
  ProjectParams,
  TableParams,
  UpdateTableProps,
} from "@/models/projectTypes";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { RootStore } from "../store";
import {
  addNewGroupAction,
  deleteGroupAction,
  updateTableHeaderAction,
} from "../reducers/projectsSlice";
import { NewGroupFormParams } from "@/models/formTypes";

export const fetchProject = createAsyncThunk<ProjectParams, string | undefined>(
  "project/fetch-project",
  async (projectID, { rejectWithValue }) => {
    try {
      const res = await getProject(projectID || "");
      const project = res.data() as ProjectParams;
      const tablesRes = await getAllTables(project?.tablesID);
      const tables = [] as TableParams[];
      tablesRes?.forEach((item) => {
        //check this later
        const table = item.data() as TableParams;
        tables.push({ ...table, id: item.id, tasks: null });
      });
      return { ...project, tables };
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

export const updateTableHeader = createAsyncThunk<
  void,
  UpdateTableProps,
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
      return rejectWithValue("something wrong project/update-table");
    }
  }
);
export const addNewGroup = createAsyncThunk<
  void,
  NewGroupFormParams,
  { state: RootStore }
>(
  "project/add-new-group",
  async (table, { rejectWithValue, getState, dispatch }) => {
    try {
      const state = getState();
      const { project } = state.projectReducer;
      const id = "table" + Date.now();
      dispatch(addNewGroupAction({ id, ...table, tasks: [] }));
      await addNewGroupMethod(project?.tablesID, { id, ...table });
    } catch (err) {
      return rejectWithValue("something wrong project/add-new-group");
    }
  }
);
export const deleteGroup = createAsyncThunk<void, string, { state: RootStore }>(
  "project/delete-group",
  async (tableID, { rejectWithValue, dispatch, getState }) => {
    try {
      const state = getState();
      const { project } = state.projectReducer;
      dispatch(deleteGroupAction(tableID));
      await deleteGroupMethod(tableID, project.tablesID);
    } catch (err) {
      return rejectWithValue("something wrong project/delete-group");
    }
  }
);
