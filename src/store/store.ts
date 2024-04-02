import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userReducer from "./reducers/userSlice";

const rootReducer = combineReducers({
  userReducer,
});

const store = configureStore({ reducer: rootReducer });

export default store;
export type RootStore = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
