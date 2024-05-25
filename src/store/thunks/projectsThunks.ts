import { getProject, updateLablesMethod } from "@/firebase/projectAPI";
import {
  addNewGroupMethod,
  deleteGroupMethod,
  deleteTaskMethod,
  getAllTables,
  updateTableMethod,
} from "@/firebase/tablesAPI";
import {
  LableParams,
  ProjectParams,
  TableParams,
  UpdateTableProps,
} from "@/models/projectTypes";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { RootStore } from "../store";
import {
  addNewGroupAction,
  deleteGroupAction,
  updateLablesAction,
  updateTableHeaderAction,
} from "../reducers/projectsSlice";
import { NewGroupFormParams } from "@/models/formTypes";
import { LablesTypeParams } from "@/models/RareUseTypes";

export const fetchProject = createAsyncThunk<ProjectParams, string | undefined>(
  "project/fetch-project",
  async (projectID, { rejectWithValue }) => {
    try {
      const res = await getProject(projectID || "");
      const project = res.data() as ProjectParams;
      if (project?.tablesID == null)
        return rejectWithValue("tablesID doesn't exist");
      const tablesRes = await getAllTables(project?.tablesID);
      const tables = [] as TableParams[];
      tablesRes?.forEach((item) => {
        const table = item.data() as TableParams;
        tables.push({ ...table, id: item.id, tasks: null });
      });
      return { ...project, id: res.id, tables };
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
      const tasks = project.tables?.find((item) => item.id == tableID)?.tasks;
      dispatch(deleteGroupAction(tableID));
      await deleteGroupMethod(tableID, project.tablesID);
      tasks?.forEach(async (task) => {
        await deleteTaskMethod(task.id, project.tasksID);
      });
    } catch (err) {
      return rejectWithValue("something wrong project/delete-group");
    }
  }
);

type UpdateLablesProps = {
  type: LablesTypeParams;
  lables: LableParams[];
};
export const updateLables = createAsyncThunk<
  void,
  UpdateLablesProps,
  { state: RootStore }
>(
  "project/update-lables",
  async ({ type, lables }, { rejectWithValue, dispatch, getState }) => {
    try {
      const state = getState();
      const { project } = state.projectReducer;
      dispatch(updateLablesAction({ type, lables }));
      if (!project.id) return rejectWithValue("no projectID");
      await updateLablesMethod(project.id, type, lables);
    } catch (err) {
      console.log(err);
      return rejectWithValue("something wrong project/delete-group");
    }
  }
);
