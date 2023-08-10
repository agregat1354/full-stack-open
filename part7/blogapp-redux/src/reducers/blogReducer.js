import { createSlice } from "@reduxjs/toolkit";
import blogService from "../services/blogs.js";

const blogSlice = createSlice({
  name: "blogs",
  initialState: [],
  reducers: {
    setBlogs: (state, { payload }) => {
      return payload;
    },
    appendBlog: (state, { payload }) => {
      return state.push(payload);
    },
  },
});

export const initializeBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll();
    console.log("blogs returned", blogs);
    dispatch(blogSlice.actions.setBlogs(blogs));
  };
};

export const createBlog = (newBlogData) => {
  return async () => {
    const newBlogResponse = await blogService.create(newBlogData);
    console.log(newBlogResponse);
  };
};

export const { setBlogs } = blogSlice.actions;
export default blogSlice.reducer;
