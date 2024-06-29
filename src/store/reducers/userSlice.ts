import { UserDetails, initialUserStateProps } from "@/models/userTypes";
import { createSlice } from "@reduxjs/toolkit";
import { fetchUserInfo, signOutUser, signUpUser } from "../thunks/userThunks";

const initialState = {
  user: {
    id: null,
    firstName: null,
    lastName: null,
    email: null,
    projects: null,
    avatar: null,
  },
  isLoading: false,
  error: null,
} as initialUserStateProps;

type UpdateActionProps = {
  key: keyof UserDetails;
  value: any;
};
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    updateUserAction(state, action) {
      const { key, value }: UpdateActionProps = action.payload;
      console.log(action.payload);
      state.user[key] = value;
    },
    setUser(state, action) {
      state.user = action.payload;
    },
  },
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
      })
      .addCase(signUpUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(signUpUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isLoading = false;
      })
      .addCase(signOutUser.fulfilled, (state) => {
        state = initialState;
      });
  },
});
export const { updateUserAction, setUser } = userSlice.actions;
export default userSlice.reducer;
