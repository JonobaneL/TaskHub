import { CommentParams } from "@/models/commentTypes";
import { createSlice } from "@reduxjs/toolkit";
import { fetchComments } from "../thunks/commentsThunks";

type InitialProps = {
  isLoading: boolean;
  comments: CommentParams[] | null;
  error: string | null;
};
const initialState: InitialProps = {
  isLoading: false,
  comments: null,
  error: null,
};

export const commentsSlice = createSlice({
  name: "comments",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchComments.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchComments.fulfilled, (state, action) => {
        state.comments = action.payload;
        state.isLoading = false;
      });
  },
});

export default commentsSlice.reducer;
