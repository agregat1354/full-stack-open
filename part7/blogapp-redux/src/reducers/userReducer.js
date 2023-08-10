import { createSlice } from "@reduxjs/toolkit";
import loginService from "../services/login.js";
import blogService from "../services/blogs.js";

const retrieveUserFromLocalStorage = () => {
  const userFromLocalStorage = window.localStorage.getItem("loggedBlogappUser");
  console.log("initializing user state with: ", userFromLocalStorage);
  return userFromLocalStorage
    ? JSON.parse(userFromLocalStorage)
    : { username: null, name: null, token: null };
};

const userSlice = createSlice({
  name: "user",
  initialState: retrieveUserFromLocalStorage,
  reducers: {
    setUser: (state, { payload }) => {
      return payload;
    },
    removeUser: () => {
      return null;
    },
  },
});

export const loginUser = ({ username, password }) => {
  return async (dispatch) => {
    const responseUser = await loginService.login({ username, password });
    blogService.setToken(responseUser.token);

    window.localStorage.setItem(
      "loggedBlogappUser",
      JSON.stringify(responseUser)
    );
    dispatch(userSlice.actions.setUser(responseUser));
  };
};

export const logoutUser = () => {
  return (dispatch) => {
    window.localStorage.removeItem("loggedBlogappUser");
    dispatch(userSlice.actions.removeUser());
  };
};

export default userSlice.reducer;
