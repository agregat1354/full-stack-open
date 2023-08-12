import Navigation from "./Navigation";
import { useUserValue } from "../UserContext";

const Blog = ({ blog, updateBlog, deleteBlog }) => {
  const user = useUserValue();

  const handleLike = () => {
    const updatedBlogObj = {
      ...blog,
      likes: blog.likes + 1,
      user: blog.user.id,
    };
    updateBlog(updatedBlogObj);
  };

  const handleDelete = () => {
    deleteBlog(blog);
  };

  const showWhenOwnedByCurrentUser = {
    display: blog.user.username === user.username ? "" : "none",
  };

  return (
    <div>
      <Navigation />
      <h2>
        {blog.title} {blog.author}
      </h2>
      <a href={blog.url}>{blog.url}</a>
      <br />
      <span>{blog.likes} likes </span>
      <button onClick={handleLike}>like</button>
      <br />
      <span>added by {user.name}</span>
      <br />
      <button style={showWhenOwnedByCurrentUser} onClick={handleDelete}>
        remove
      </button>
    </div>
  );
};

export default Blog;
