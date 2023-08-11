import { useRef } from "react";
import Navigation from "./Navigation";
import Notification from "./Notification";
import { useSelector, useDispatch } from "react-redux";
import { createBlog } from "../reducers/blogReducer";
import Togglable from "./Togglable";
import BlogForm from "./BlogForm";
import { Link } from "react-router-dom";

const Blogs = () => {
  const dispatch = useDispatch();
  const blogFormRef = useRef();
  const blogs = useSelector((state) => state.blogs);

  const handleCreateNewBlog = async (blogObject) => {
    blogFormRef.current.toggleVisibility();
    dispatch(createBlog(blogObject));
  };

  const blogWrapperDivStyle = {
    display: "block",
    borderColor: "black",
    borderWidth: 2,
    borderStyle: "solid",
    padding: 5,
    margin: 10,
  };

  return (
    <div>
      <Navigation />
      <h2>blogs</h2>
      <Notification />
      <h2>list of blogs</h2>
      {blogs.map((blog) => (
        <div key={blog.id} style={blogWrapperDivStyle}>
          <Link to={`/blogs/${blog.id}`}>
            {blog.title} {blog.author}
          </Link>
        </div>
      ))}
      <Togglable buttonLabel="new blog" ref={blogFormRef}>
        <BlogForm createBlog={handleCreateNewBlog} />
      </Togglable>
    </div>
  );
};

export default Blogs;
