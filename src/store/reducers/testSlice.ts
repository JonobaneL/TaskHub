import { createSlice } from "@reduxjs/toolkit";
type Props = {
  test: boolean;
};
const initialState: Props = {
  test: false,
};

const testSlice = createSlice({
  name: "test",
  initialState,
  reducers: {
    toggle(state) {
      state.test = !state.test;
    },
  },
});

export const { toggle } = testSlice.actions;
export default testSlice.reducer;
