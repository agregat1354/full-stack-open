import { createSlice } from "@reduxjs/toolkit";
import blogService from "../services/blogs.js";
import { showNotification } from "./notificationReducer.js";

const blogSlice = createSlice({
  name: "blogs",
  initialState: [],
  reducers: {
    setBlogs: (state, { payload: blogs }) => {
      return blogs.toSorted((b1, b2) => b2.likes - b1.likes);
    },
    appendBlog: (state, { payload: newBlog }) => {
      state.push(newBlog);
    },
    deleteBlog: (state, { payload: id }) => {
      return state.filter((blog) => blog.id !== id);
    },
    updateBlog: (state, { payload: updatedBlog }) => {
      const blogs = state.map((blog) =>
        blog.id === updatedBlog.id ? updatedBlog : blog
      );
      return blogs.toSorted((b1, b2) => b2.likes - b1.likes);
    },
  },
});

export const { setBlogs } = blogSlice.actions;

export const initializeBlogs = () => {
  return async (dispatch) => {
    let blogs = await blogService.getAll();
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
      if (
        !window.confirm(
          `Remove blog ${blogToDelete.title} by ${blogToDelete.author}?`
        )
      )
        return;

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

export const updateBlog = (updatedBlog) => {
  return async (dispatch) => {
    try {
      const updatedBlogResponse = await blogService.update(updatedBlog);
      dispatch(blogSlice.actions.updateBlog(updatedBlogResponse));
    } catch (error) {
      console.log("error in updateBlog, error message: ", error.message);
    }
  };
};

export default blogSlice.reducer;
