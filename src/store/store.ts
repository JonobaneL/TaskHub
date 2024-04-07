import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userReducer from "./reducers/userSlice";
import projectReducer from "./reducers/projectsSlice";
import testReducer from "./reducers/testSlice";

const rootReducer = combineReducers({
  userReducer,
  projectReducer,
  testReducer,
});

const store = configureStore({ reducer: rootReducer });

export default store;
export type RootStore = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
