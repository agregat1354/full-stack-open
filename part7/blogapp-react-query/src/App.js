import "./index.css";
import { useState, useEffect, useRef } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import loginService from "./services/login";
import Notification from "./components/Notification";
import Togglable from "./components/Togglable";
import BlogForm from "./components/BlogForm";
import { useNotificationDispatch } from "./NotificationContext.js";
import { useQuery } from "react-query";

const App = () => {
  console.log("how many times is this shit run");
  const dispatchNotification = useNotificationDispatch();
  const {
    isLoading,
    isError,
    data: blogs,
    error,
  } = useQuery("blogsButQuery", blogService.getAll);

  const [sortedBlogs, setSortedBlogs] = useState(null);
  const [user, setUser] = useState(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const blogFormRef = useRef();

  useEffect(() => {
    const userJson = window.localStorage.getItem("loggedBlogappUser");
    if (userJson) {
      const user = JSON.parse(userJson);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  useEffect(() => {
    console.log("this is run");
    console.log("blogs are: ", blogs);
    if (!blogs) return;
    setSortedBlogs(blogs.toSorted((b1, b2) => b2.likes - b1.likes));
  }, [blogs]);

  const showNotification = (text, type, durationInSeconds) => {
    dispatchNotification({
      type: "SET_NOTIFICATION",
      payload: { notification: text, type },
    });
    setTimeout(
      () => dispatchNotification({ type: "REMOVE_NOTIFICATION" }),
      durationInSeconds * 1000
    );
  };

  const logout = () => {
    window.localStorage.removeItem("loggedBlogappUser");
    setUser(null);
    setUsername("");
    setPassword("");
    showNotification("logged out", "info", 5);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const user = await loginService.login({ username, password });
      setUser(user);
      blogService.setToken(user.token);
      window.localStorage.setItem("loggedBlogappUser", JSON.stringify(user));
      showNotification("Succesfully logged in", "info", 5);
    } catch (err) {
      console.log(err);
      showNotification(err.response.data.error, "error", 5);
    }
  };

  const handleBlogUpdate = async (updatedBlogObject) => {
    try {
      const updatedBlog = await blogService.update(updatedBlogObject);
      updatedBlog.user = user;
      const updatedBlogs = blogs.map((blog) =>
        blog.id === updatedBlog.id ? updatedBlog : blog
      );
      const updatedBlogsSorted = updatedBlogs.toSorted(
        (b1, b2) => b2.likes - b1.likes
      );
      setBlogs(updatedBlogsSorted);
    } catch (err) {
      console.log(err);
    }
  };

  const handleBlogDelete = async (blogToDelete) => {
    try {
      if (
        window.confirm(
          `Remove blog ${blogToDelete.title} by ${blogToDelete.author}`
        )
      ) {
        await blogService.deleteBlog(blogToDelete.id);
        setBlogs(blogs.filter((blog) => blog.id !== blogToDelete.id));
      }
    } catch (err) {
      showNotification(err.response.data.error, "error", 5);
    }
  };

  const handleCreateNewBlog = async (blogObject) => {
    blogFormRef.current.toggleVisibility();
    try {
      const responseBlog = await blogService.create(blogObject);
      responseBlog.user = user;
      setBlogs([...blogs, responseBlog]);
      showNotification(
        `a new blog ${responseBlog.title} by ${responseBlog.author} has been added`,
        "info",
        5
      );
    } catch (err) {
      showNotification(err.response.data.error, "error", 5);
    }
  };

  const mainContent = () => {
    if (isLoading) return <div>...loading</div>;
    if (isError) return <div>error: {error.message}</div>;
    if (!sortedBlogs) return <div>preparing data</div>;
    return (
      <div>
        <h2>blogs</h2>
        <Notification />
        {user.username} is logged in
        <button onClick={logout}>logout</button>
        <h2>list of blogs</h2>
        {sortedBlogs.map((blog) => (
          <Blog
            key={blog.id}
            blog={blog}
            updateBlog={handleBlogUpdate}
            deleteBlog={handleBlogDelete}
            isOwnedByCurrentUser={blog.user.username === user.username}
          />
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
