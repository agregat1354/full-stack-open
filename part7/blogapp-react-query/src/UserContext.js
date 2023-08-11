/* eslint-disable indent */
import { createContext, useReducer, useContext } from "react";
import blogService from "./services/blogs.js";

const UserContext = createContext();

const initializeUser = () => {
  const userFromLocalStorage = window.localStorage.getItem("loggedBlogappUser");
  if (!userFromLocalStorage) return null;

  const user = JSON.parse(userFromLocalStorage);
  blogService.setToken(user.token);
  return user;
};

const userReducer = (state, action) => {
  switch (action.type) {
    case "LOG_IN":
      return action.payload;
    case "LOG_OUT":
      return null;
    default:
      return state;
  }
};

const UserContextProvider = (props) => {
  const [user, userDispatch] = useReducer(userReducer, null, initializeUser);

  return (
    <UserContext.Provider value={[user, userDispatch]}>
      {props.children}
    </UserContext.Provider>
  );
};

export const useUserValue = () => {
  const userHook = useContext(UserContext);
  return userHook[0];
};

export const useUserDispatch = () => {
  const userHook = useContext(UserContext);
  return userHook[1];
};

export default UserContextProvider;
