import { useDispatch, useSelector } from "react-redux";
import { deleteBlog, updateBlog } from "../reducers/blogReducer";
import { useParams } from "react-router-dom";
import Navigation from "./Navigation";

const Blog = () => {
  const blogId = useParams().id;

  const dispatch = useDispatch();
  const username = useSelector((state) => state.user.username);
  const blog = useSelector((state) =>
    state.blogs.find((blog) => blog.id === blogId)
  );

  if (!blog) return null;
  const handleLike = () => {
    const updatedBlogObject = {
      ...blog,
      likes: blog.likes + 1,
      user: blog.user.id,
    };
    dispatch(updateBlog(updatedBlogObject));
  };

  const handleDelete = () => {
    dispatch(deleteBlog(blog));
  };

  const showWhenOwnedByCurrentUser = {
    display: blog.user.username === username ? "" : "none",
  };

  return (
    <div>
      <Navigation />
      <h2>{blog.title}</h2>
      <a href={blog.url}>{blog.url}</a>
      <br />
      <span>{blog.likes} likes</span>
      <button onClick={handleLike}>like</button>
      <br />
      <span>added by {blog.user.name}</span>
      <br />
      <button style={showWhenOwnedByCurrentUser} onClick={handleDelete}>
        remove
      </button>
    </div>
  );
};

export default Blog;
