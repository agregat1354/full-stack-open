import { useRef } from "react";
import Navigation from "./Navigation";
import Notification from "./Notification";
import { useSelector, useDispatch } from "react-redux";
import { createBlog } from "../reducers/blogReducer";
import Togglable from "./Togglable";
import BlogForm from "./BlogForm";

import BlogList from "./BlogList";

const Blogs = () => {
  const dispatch = useDispatch();
  const blogFormRef = useRef();
  const blogs = useSelector((state) => state.blogs);

  const handleCreateNewBlog = async (blogObject) => {
    blogFormRef.current.toggleVisibility();
    dispatch(createBlog(blogObject));
  };

  return (
    <div>
      <Navigation />
      <h2>blogs</h2>
      <Notification />
      <h2>list of blogs</h2>
      <BlogList blogs={blogs} />
      <Togglable buttonLabel="new blog" ref={blogFormRef}>
        <BlogForm createBlog={handleCreateNewBlog} />
      </Togglable>
    </div>
  );
};

export default Blogs;
