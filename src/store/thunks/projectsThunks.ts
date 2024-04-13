import { getProject } from "@/firebase/projectAPI";
import { getAllTables, updateTableMethod } from "@/firebase/tablesAPI";
import {
  ProjectParams,
  TableParams,
  UpdateTableProps,
} from "@/models/projectTypes";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { RootStore } from "../store";
import { updateTableHeaderAction } from "../reducers/projectsSlice";

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
      return rejectWithValue("something wrong");
    }
  }
);
