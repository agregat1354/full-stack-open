import { createSlice } from "@reduxjs/toolkit";
import loginService from "../services/login.js";
import blogService from "../services/blogs.js";
import { showNotification } from "./notificationReducer.js";

const retrieveUserFromLocalStorage = () => {
  const userFromLocalStorage = window.localStorage.getItem("loggedBlogappUser");

  if (!userFromLocalStorage) return { username: null, name: null, token: null };

  const user = JSON.parse(userFromLocalStorage);
  blogService.setToken(user.token);
  return user;
};

const userSlice = createSlice({
  name: "user",
  initialState: retrieveUserFromLocalStorage,
  reducers: {
    setUser: (state, { payload }) => {
      return payload;
    },
    removeUser: () => {
      return { username: null, name: null, token: null };
    },
  },
});

export const loginUser = ({ username, password }, onSuccessCallback) => {
  return async (dispatch) => {
    try {
      const responseUser = await loginService.login({ username, password });
      blogService.setToken(responseUser.token);

      window.localStorage.setItem(
        "loggedBlogappUser",
        JSON.stringify(responseUser)
      );
      dispatch(userSlice.actions.setUser(responseUser));
      dispatch(showNotification("Succesfully logged in", "info", 5));
      onSuccessCallback();
    } catch (error) {
      dispatch(showNotification(error.response.data.error, "error", 5));
    }
  };
};

export const logoutUser = () => {
  return (dispatch) => {
    window.localStorage.removeItem("loggedBlogappUser");
    dispatch(userSlice.actions.removeUser());
  };
};

export default userSlice.reducer;
