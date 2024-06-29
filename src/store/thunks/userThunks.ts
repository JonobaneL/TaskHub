import { auth, firestoreStorage } from "@/firebase";
import {
  addNewUser,
  getAllUserProjects,
  getUserInfo,
  updateUserMethod,
} from "@/firebase/userAPI";
import { ProjectParams } from "@/models/projectTypes";
import {
  UserDetails,
  logInProps,
  signUpProps,
  userResponse,
} from "@/models/userTypes";
import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { RootStore } from "../store";
import { updateUserAction } from "../reducers/userSlice";

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

export const fetchUserInfo = createAsyncThunk<UserDetails, string | undefined>(
  "user/fetch-user-info",
  async (userID, { rejectWithValue }) => {
    try {
      const userRes = await getUserInfo(userID || null);
      const userDetails = userRes.data() as userResponse;
      const projectsRes = await getAllUserProjects(userDetails.projects);
      const projects: ProjectParams[] = [];
      projectsRes.forEach((item) => {
        const project = item.data() as ProjectParams;
        projects.push(project);
      });
      return { ...userDetails, id: userRes.id, projects };
    } catch (err) {
      return rejectWithValue("no such user");
    }
  }
);
export const signUpUser = createAsyncThunk<UserDetails, signUpProps>(
  "user/sign-up",
  async ({ firstName, lastName, email, password }, { rejectWithValue }) => {
    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);
      const defaultAvatarRef = ref(
        firestoreStorage,
        "/users_avatars/default_user_avatar.svg"
      );
      const linkRes = await getDownloadURL(defaultAvatarRef);
      const user = { firstName, lastName, email, password, avatar: linkRes };
      await addNewUser(user, res.user.uid);
      return { ...user, id: res.user.uid, projects: null };
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);
export const uploadUserAvatar = createAsyncThunk<
  void,
  File,
  { state: RootStore }
>(
  "user/upload-user-avatar",
  async (avatar, { rejectWithValue, getState, dispatch }) => {
    try {
      const user = getState().userReducer;
      if (user.user.id == null) return rejectWithValue("user not found");
      const avatarRef = ref(
        firestoreStorage,
        `/users_avatars/${user.user.id + Date.now().toString()}`
      );
      const res = await uploadBytes(avatarRef, avatar);
      const link = await getDownloadURL(res.ref);
      await updateUserMethod("avatar", link, user.user.id);
      dispatch(updateUserAction({ key: "avatar", value: link }));
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
