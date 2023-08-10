import { createSlice } from "@reduxjs/toolkit";
import blogService from "../services/blogs.js";
import { showNotification } from "./notificationReducer.js";

const blogSlice = createSlice({
  name: "blogs",
  initialState: [],
  reducers: {
    setBlogs: (state, { payload }) => {
      return payload;
    },
    appendBlog: (state, { payload }) => {
      state.push(payload);
    },
    deleteBlog: (state, { payload }) => {
      return state.filter((blog) => blog.id !== payload);
    },
  },
});

export const { setBlogs } = blogSlice.actions;

export const initializeBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll();
    console.log("blogs returned", blogs);
    dispatch(setBlogs(blogs));
  };
};

export const createBlog = (newBlogData) => {
  return async (dispatch, getState) => {
    try {
      const responseBlog = await blogService.create(newBlogData);
      responseBlog.user = getState().user;

      dispatch(
        showNotification(
          `a new blog ${responseBlog.title} by ${responseBlog.author} has been added`,
          "info",
          5
        )
      );
      dispatch(blogSlice.actions.appendBlog(responseBlog));
    } catch (error) {
      console.log("exception thrown: ", error);
      dispatch(showNotification(error.response.data.error, "error", 5));
    }
  };
};

export const deleteBlog = (blogToDelete) => {
  return async (dispatch) => {
    try {
      await blogService.deleteBlog(blogToDelete.id);
      dispatch(blogSlice.actions.deleteBlog(blogToDelete.id));
    } catch (err) {
      dispatch(
        showNotification(
          `could not delete blog with id ${blogToDelete.id}`,
          "error",
          5
        )
      );
    }
  };
};

export default blogSlice.reducer;
