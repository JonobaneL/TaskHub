import { auth } from "@/firebase";
import { addNewUser, getUserInfo } from "@/firebase/userAPI";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
type userDetails = {
  id: null | string;
  firstName: null | string;
  lastName: null | string;
  email: null | string;
};
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
  },
  isLoading: false,
  error: null,
} as initialStateProps;

type userProps = {
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
export const fetchUserInfo = createAsyncThunk<userDetails, string | null>(
  "user/fetch-user-info",
  async (userID, { rejectWithValue }) => {
    if (userID == null) return initialState.user;
    const userRes = await getUserInfo(userID);
    if (!userRes) return rejectWithValue("No such user");
    const userDetails = userRes.data() as userDetails;
    return { ...userDetails, id: userID };
  }
);
export const signUpUser = createAsyncThunk<void, userProps>(
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
      rejectWithValue(err);
    }
  }
);
export const signOutUser = createAsyncThunk<void, undefined>(
  "user/sign-out",
  async (_, { rejectWithValue }) => {
    try {
      await signOut(auth);
    } catch (err) {
      rejectWithValue(`User wasn't signed out`);
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
