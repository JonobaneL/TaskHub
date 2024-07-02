import { CommentParams } from "@/models/commentTypes";
import { createSlice } from "@reduxjs/toolkit";
import { fetchComments } from "../thunks/commentsThunks";

type InitialProps = {
  isLoading: boolean;
  commentsID: string | null;
  comments: CommentParams[] | null;
  error: string | null;
};
const initialState: InitialProps = {
  isLoading: false,
  commentsID: null,
  comments: null,
  error: null,
};

export const commentsSlice = createSlice({
  name: "comments",
  initialState,
  reducers: {
    addCommentAction(state, action) {
      if (!state.comments) state.comments = [action.payload];
      state.comments = [...state.comments, action.payload];
    },
    updateCommentsAction(state, action) {
      state.comments = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchComments.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchComments.fulfilled, (state, action) => {
        state.commentsID = action.payload.commentsID;
        state.comments = action.payload.comments;
        state.isLoading = false;
      });
  },
});
export const { addCommentAction, updateCommentsAction } = commentsSlice.actions;
export default commentsSlice.reducer;
