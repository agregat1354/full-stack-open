import { useRef, useEffect } from "react";
import Navigation from "./Navigation";
import Notification from "./Notification";
import { useSelector, useDispatch } from "react-redux";
import {
  updateBlog,
  createBlog,
  initializeBlogs,
} from "../reducers/blogReducer";
import Blog from "./Blog";
import Togglable from "./Togglable";
import BlogForm from "./BlogForm";

const Blogs = () => {
  const dispatch = useDispatch();
  const blogFormRef = useRef();
  const blogs = useSelector((state) => state.blogs);
  const user = useSelector((state) => state.user);

  const handleBlogUpdate = async (updatedBlogObject) => {
    dispatch(updateBlog(updatedBlogObject));
  };

  const handleCreateNewBlog = async (blogObject) => {
    blogFormRef.current.toggleVisibility();
    dispatch(createBlog(blogObject));
  };

  useEffect(() => {
    dispatch(initializeBlogs());
  }, [user]);

  return (
    <div>
      <Navigation />
      <h2>blogs</h2>
      <Notification />
      <h2>list of blogs</h2>
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} updateBlog={handleBlogUpdate} />
      ))}
      <Togglable buttonLabel="new blog" ref={blogFormRef}>
        <BlogForm createBlog={handleCreateNewBlog} />
      </Togglable>
    </div>
  );
};

export default Blogs;
