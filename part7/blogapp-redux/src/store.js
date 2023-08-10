import { configureStore } from "@reduxjs/toolkit";
import notificationReducer from "./reducers/notificationReducer.js";
import blogReducer from "./reducers/blogReducer.js";

export const store = configureStore({
  reducer: {
    notification: notificationReducer,
    blogs: blogReducer,
  },
});
