import { createSlice } from "@reduxjs/toolkit";
import loginService from "../services/login.js";

const retrieveUserFromLocalStorage = () => {
  const userFromLocalStorage = window.localStorage.getItem("loggedBlogappUser");
  console.log("initializing user state with: ", userFromLocalStorage);
  return userFromLocalStorage ? JSON.parse(userFromLocalStorage) : null;
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

export const login = ({ username, password }) => {
  return async (dispatch) => {
    const responseUser = await loginService.login({ username, password });

    console.log("response user: ", responseUser);

    window.localStorage.setItem(
      "loggedBlogappUser",
      JSON.stringify(responseUser)
    );
    dispatch(userSlice.actions.setUser(responseUser));
  };
};

export default userSlice.reducer;
