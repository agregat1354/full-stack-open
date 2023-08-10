import "./index.css";
import { useState, useEffect, useRef } from "react";
import Blog from "./components/Blog";
import Notification from "./components/Notification";
import Togglable from "./components/Togglable";
import BlogForm from "./components/BlogForm";
import { useDispatch, useSelector } from "react-redux";
import { showNotification } from "./reducers/notificationReducer";
import {
  initializeBlogs,
  createBlog,
  updateBlog,
} from "./reducers/blogReducer";
import { loginUser, logoutUser } from "./reducers/userReducer";

const App = () => {
  const dispatch = useDispatch();

  const blogs = useSelector((state) => state.blogs);
  const user = useSelector((state) => state.user);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const blogFormRef = useRef();

  useEffect(() => {
    dispatch(initializeBlogs());
  }, [user]);

  const logout = () => {
    dispatch(logoutUser());
    setUsername("");
    setPassword("");
    dispatch(showNotification("logged out", "info", 5));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      dispatch(loginUser({ username, password }));
      dispatch(showNotification("Succesfully logged in", "info", 5));
    } catch (err) {
      dispatch(showNotification(err.response.data.error, "error", 5));
    }
  };

  const handleBlogUpdate = async (updatedBlogObject) => {
    dispatch(updateBlog(updatedBlogObject));
  };

  const handleCreateNewBlog = async (blogObject) => {
    blogFormRef.current.toggleVisibility();
    dispatch(createBlog(blogObject));
  };

  const mainContent = () => {
    return (
      <div>
        <h2>blogs</h2>
        <Notification />
        {user.username} is logged in
        <button onClick={logout}>logout</button>
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

  const loginForm = () => {
    return (
      <>
        <h2>Log in to application</h2>
        <Notification />
        <form onSubmit={handleLogin}>
          username
          <input
            type="text"
            name="Username"
            value={username}
            onChange={({ target }) => setUsername(target.value)}
          />
          <br />
          password
          <input
            type="password"
            name="Password"
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
          <br />
          <button type="submit">login</button>
        </form>
      </>
    );
  };

  return (
    <>
      {!user && loginForm()}
      {user && mainContent()}
    </>
  );
};

export default App;
