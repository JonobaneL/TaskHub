import { auth } from "@/firebase";
import { addNewUser, getAllProjects, getUserInfo } from "@/firebase/userAPI";
import { ProjectParams } from "@/models/projectTypes";
import { userDetails } from "@/models/userTypes";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";

type initialStateProps = {
  user: userDetails;
  isLoading: boolean;
  error: null | string;
};
const initialState = {
  user: {
    id: null,
    firstName: null,
    lastName: null,
    email: null,
    projects: null,
  },
  isLoading: false,
  error: null,
} as initialStateProps;

type signUpProps = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
};
type logInProps = {
  email: string;
  password: string;
};
export const logInUser = createAsyncThunk<string, logInProps>(
  "user/log-in",
  async (props, { rejectWithValue }) => {
    try {
      const res = await signInWithEmailAndPassword(
        auth,
        props.email,
        props.password
      );
      return res.user.uid;
    } catch (err) {
      return rejectWithValue("no such user");
    }
  }
);
export const fetchUserInfo = createAsyncThunk<userDetails, string | undefined>(
  "user/fetch-user-info",
  async (userID, { rejectWithValue }) => {
    try {
      const userRes = await getUserInfo(userID || null);
      const userDetails = userRes.data() as userDetails;
      const projectRes = await getAllProjects(userRes.id);
      const projects: ProjectParams[] = [];
      projectRes.forEach((item) => {
        const project = { id: item.id, ...item.data() } as ProjectParams;
        projects.push(project);
      });
      return { ...userDetails, id: userRes.id, projects };
    } catch (err) {
      return rejectWithValue("no such user");
    }
  }
);
export const signUpUser = createAsyncThunk<void, signUpProps>(
  "user/sign-up",
  async (userInfo, { rejectWithValue }) => {
    try {
      const res = await createUserWithEmailAndPassword(
        auth,
        userInfo.email,
        userInfo.password
      );
      await addNewUser(userInfo, res.user.uid);
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);
export const signOutUser = createAsyncThunk<void, undefined>(
  "user/sign-out",
  async (_, { rejectWithValue }) => {
    try {
      await signOut(auth);
    } catch (err) {
      return rejectWithValue(`User wasn't signed out`);
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserInfo.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchUserInfo.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isLoading = false;
      })
      .addCase(fetchUserInfo.rejected, (state) => {
        state.error = "something went wrong";
        state.isLoading = false;
      });
  },
});

export default userSlice.reducer;
