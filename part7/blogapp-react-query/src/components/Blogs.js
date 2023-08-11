import { useRef, useState, useEffect } from "react";
import { useQueryClient, useQuery, useMutation } from "react-query";
import blogService from "../services/blogs.js";
import { useShowNotification } from "../NotificationContext";
import { useUserValue } from "../UserContext";
import Blog from "./Blog";
import Togglable from "./Togglable.js";
import BlogForm from "./BlogForm";
import Notification from "./Notification.js";
import Navigation from "./Navigation.js";

const Blogs = () => {
  const [sortedBlogs, setSortedBlogs] = useState(null);
  const user = useUserValue();
  const showNotification = useShowNotification();
  const blogFormRef = useRef();
  const queryClient = useQueryClient();
  const {
    isLoading,
    isError,
    data: blogs,
    error,
  } = useQuery("blogs", blogService.getAll);

  useEffect(() => {
    if (!blogs) return;
    setSortedBlogs(blogs.toSorted((b1, b2) => b2.likes - b1.likes));
  }, [blogs]);

  const createBlog = useMutation(blogService.create, {
    onSuccess: (newBlog) => {
      newBlog.user = user;
      queryClient.setQueryData("blogs", [...blogs, newBlog]);
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
        blogs.map((blog) => (blog.id === updatedBlog.id ? updatedBlog : blog))
      );
    },
    onError: (error) => {
      console.log("error while updating: ", error);
    },
  });

  const deleteBlog = useMutation(blogService.deleteBlog, {
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
      queryClient.setQueryData(
        "blogs",
        blogs.filter((blog) => blog.id !== blogToDelete.id)
      );
    } catch (error) {
      console.log("error while deleting blog");
    }
  };

  const handleCreateNewBlog = async (blogObject) => {
    blogFormRef.current.toggleVisibility();
    createBlog.mutate(blogObject);
  };

  if (isLoading) return <div>...loading</div>;
  if (isError) return <div>error: {error.message}</div>;
  if (!sortedBlogs) return <div>preparing data</div>;
  return (
    <div>
      <Navigation />
      <h2>blogs</h2>
      <Notification />
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

export default Blogs;
