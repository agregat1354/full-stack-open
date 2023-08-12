import "./index.css";
import { useEffect } from "react";
import { useUserValue } from "./UserContext.js";
import { useNavigate, Routes, Route } from "react-router-dom";
import LoginForm from "./components/LoginForm";
import Blogs from "./components/Blogs";
import Users from "./components/Users";
import User from "./components/User";
import { useMatch } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "react-query";
import blogService from "./services/blogs";
import userService from "./services/users";
import { useShowNotification } from "./NotificationContext";
import Blog from "./components/Blog";

const App = () => {
  const navigate = useNavigate();
  const user = useUserValue();
  useEffect(() => {
    if (user) return;
    navigate("/login");
  }, [user]);
  const queryClient = useQueryClient();
  const showNotification = useShowNotification();

  const blogsQuery = useQuery("blogs", blogService.getAll);
  const usersQuery = useQuery("users", userService.getAll);

  const userIdMatch = useMatch("/users/:id");
  const currentUser =
    userIdMatch && usersQuery.data
      ? usersQuery.data.find((user) => user.id === userIdMatch.params.id)
      : null;

  const blogIdMatch = useMatch("/blogs/:id");
  const currentBlog =
    blogIdMatch && blogsQuery.data
      ? blogsQuery.data.find((blog) => blog.id === blogIdMatch.params.id)
      : null;

  const createBlog = useMutation(blogService.create, {
    onSuccess: (newBlog) => {
      newBlog.user = user;
      queryClient.setQueryData("blogs", [...blogsQuery.data, newBlog]);
      showNotification(
        `a new blog ${newBlog.title} by ${newBlog.author} has been added`,
        "info",
        5
      );
    },
    onError: (error) => {
      showNotification(error.response.data.error, "error", 5);
    },
  });

  const updateBlog = useMutation(blogService.update, {
    onSuccess: (updatedBlog) => {
      updatedBlog.user = user;
      queryClient.setQueryData(
        "blogs",
        blogsQuery.data.map((blog) =>
          blog.id === updatedBlog.id ? updatedBlog : blog
        )
      );
    },
    onError: (error) => {
      console.log("error while updating: ", error);
    },
  });

  const deleteBlog = useMutation(blogService.deleteBlog, {
    onSuccess: (id) => {
      queryClient.setQueryData(
        "blogs",
        blogsQuery.data.filter((blog) => blog.id !== id)
      );
      navigate("/");
    },
    onError: (error) => {
      throw new Error(error);
    },
  });

  const handleBlogUpdate = async (updatedBlogObject) => {
    updateBlog.mutate(updatedBlogObject);
  };

  const handleBlogDelete = async (blogToDelete) => {
    if (
      !window.confirm(
        `Remove blog ${blogToDelete.title} by ${blogToDelete.author}`
      )
    )
      return;

    try {
      deleteBlog.mutate(blogToDelete.id);
    } catch (error) {
      console.log("error while deleting blog");
    }
  };

  const handleBlogCreate = async (blogObject) => {
    createBlog.mutate(blogObject);
  };

  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <Blogs
              blogsQuery={blogsQuery}
              handleBlogCreate={handleBlogCreate}
            />
          }
        />
        <Route path="/users" element={<Users usersQuery={usersQuery} />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/users/:id" element={<User user={currentUser} />} />
        <Route
          path="/blogs/:id"
          element={
            <Blog
              blog={currentBlog}
              deleteBlog={handleBlogDelete}
              updateBlog={handleBlogUpdate}
            />
          }
        />
      </Routes>
    </>
  );
};

export default App;
